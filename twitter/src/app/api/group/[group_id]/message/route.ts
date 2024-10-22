import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const messageSchema = z.object({
    message: z.string()
});

export async function GET(
    req: NextRequest,
    { params }: { params: { group_id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const { user } = session;
        const { group_id } = params;

        const entry = await db.entry.findFirst({
            where: {
                groupId: Number(group_id),
                NOT: {
                    userId: Number(user.id)
                }
            },
            include: {
                user: true
            }
        })

        const messages = await db.message.findMany({
            where: {
                groupId: Number(group_id)
            },
            include: {
                user: true
            }
        });

        return NextResponse.json({
            messages,
            entry
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { group_id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const { user } = session;

        const json = await req.json();
        const body = messageSchema.parse(json);
        const { message } = body;

        const { group_id } = params;

        const messagePost = await db.message.create({
            data: {
                userId: Number(user.id),
                groupId: Number(group_id),
                message
            },
            select: {
                id: true
            }
        });

        return NextResponse.json(messagePost, { status: 200 });
    } catch (err) {
        if (err instanceof z.ZodError) return NextResponse.json(err.isEmpty, { status: 422 });
        return NextResponse.json(err, { status: 500 });
    }
}