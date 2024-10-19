import { authOptions } from "@/lib/auth";
import { checkNotification } from "@/lib/create_notification";
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

        if (follow) {
            const existingNotification = await checkNotification(Number(user.id), Number(id), "follow");

            if (existingNotification) {
                return NextResponse.json(null, { status: 200 });
            } else {
                if (Number(id) === Number(user.id)) return NextResponse.json(null, { status: 200 });

                const notification = await db.notification.create({
                    data: {
                        visitedId: Number(id),
                        visitorId: Number(user.id),
                        action: "follow"
                    },
                    select: {
                        id: true
                    }
                });

                return NextResponse.json(notification, { status: 200 });
            }
        } else {
            return NextResponse.json(null, { status: 400 });
        }
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