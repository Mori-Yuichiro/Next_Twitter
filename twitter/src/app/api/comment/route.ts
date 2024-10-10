import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const commentPatchSchema = z.object({
    comment: z.string(),
    tweetId: z.number()
})

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
                tweetId: tweetId,
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