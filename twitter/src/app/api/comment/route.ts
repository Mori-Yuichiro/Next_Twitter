import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const commentPatchSchema = z.object({
    comment: z.string(),
    tweetId: z.string()
})

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const comments = await db.comment.findMany({
            include: {
                user: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(comments);

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
        const body = commentPatchSchema.parse(json);
        const { comment, tweetId } = body;
        const now = new Date();

        const result = await db.comment.create({
            data: {
                comment,
                userId: Number(user.id),
                tweetId: Number(tweetId),
                createdAt: now
            },
            select: {
                id: true
            }
        });

        return NextResponse.json(result);
    } catch (err) {
        console.error("Error:" + err);
        return NextResponse.json(null, { status: 500 });
    }
}