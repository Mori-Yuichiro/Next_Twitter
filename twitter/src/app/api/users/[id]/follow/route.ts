import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const { user } = session;
        const { id } = params;

        const follow = await db.relationship.create({
            data: {
                followerId: Number(user.id),
                followedId: Number(id)
            },
            select: {
                id: true
            }
        });

        return NextResponse.json(follow, { status: 200 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const { user } = session;
        const { id } = params;

        const unfollow = await db.relationship.delete({
            where: {
                followerId_followedId: {
                    followerId: Number(user.id),
                    followedId: Number(id)
                }
            }
        });

        return NextResponse.json(unfollow, { status: 200 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}