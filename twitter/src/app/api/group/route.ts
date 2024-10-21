import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const entrySchema = z.object({
    anotherUserId: z.number()
});

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const { user } = session;

        const json = await req.json();
        const body = entrySchema.parse(json);
        const { anotherUserId } = body;

        const group = await db.group.create({
            select: {
                id: true
            }
        });

        const currentUserEntry = await db.entry.create({
            data: {
                userId: Number(user.id),
                groupId: group.id
            },
            select: {
                id: true
            }
        });
        const anotherUserEntry = await db.entry.create({
            data: {
                userId: anotherUserId,
                groupId: group.id
            },
            select: {
                id: true
            }
        });

        return NextResponse.json({
            groupId: group.id,
            currentUserEntry,
            anotherUserEntry
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}