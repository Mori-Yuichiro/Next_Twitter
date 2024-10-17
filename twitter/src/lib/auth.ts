import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@test.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                if (!credentials.email || !credentials.password) {
                    throw new Error('Email and password required');
                }

                const { email, password } = credentials;


                // データベースからユーザーを取得
                const user = await db.user.findUnique({
                    where: { email }
                });

                if (user) {
                    if (!user.password) throw new Error("パスワードが必要です");

                    const isCorrectPassword = await bcrypt.compare(password, user.password);

                    if (isCorrectPassword)
                        return {
                            ...user,
                            id: user.id.toString()
                        }

                    return null;
                } else {
                    throw new Error("ユーザーが存在しません");
                }
            },
        }),
    ],
    adapter: PrismaAdapter(db),
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, id: user.id }
            }
            return token;
        },
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            return session;
        },
    },
    session: {
        strategy: 'jwt'
    }
};