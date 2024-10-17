import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerPatchScheme = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

export async function POST(req: NextRequest) {
    try {
        const json = await req.json();
        const body = registerPatchScheme.parse(json);
        const { name, email, password } = body;

        const checkUser = await db.user.findUnique({
            where: {
                email
            }
        });

        if (checkUser) return NextResponse.json({ message: "ユーザーはすでに存在しています" }, { status: 409 });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
            select: {
                id: true
            }
        })
        return NextResponse.json(newUser, { status: 200 });
    } catch (err) {
        console.log(err);
        if (err instanceof z.ZodError) {
            return NextResponse.json(err.isEmpty, { status: 422 });
        }

        return NextResponse.json(err, { status: 500 })
    }
}