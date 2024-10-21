import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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