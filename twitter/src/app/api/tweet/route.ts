import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
    content: z.string(),
    imageUrls: z.array(z.string()).optional()
});

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const tweets = await db.tweet.findMany({
            include: {
                user: true
            },
            orderBy: {
                updatedAt: "desc"
            }
        });

        return NextResponse.json(tweets);

    } catch {
        return NextResponse.json(null, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }


        const { user } = session;

        const json = await req.json();
        const body = postSchema.parse(json);
        const { content, imageUrls } = body;

        const now = new Date();

        const tweet = await db.tweet.create({
            data: {
                content,
                createdAt: now,
                updatedAt: now,
                userId: Number(user.id),
                imageUrls
            },
            select: {
                id: true
            }
        });

        return NextResponse.json(tweet);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json(err.isEmpty, { status: 422 });
        }

        return NextResponse.json(null, { status: 500 })
    }
}