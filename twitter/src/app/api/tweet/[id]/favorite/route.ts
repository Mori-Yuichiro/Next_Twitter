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

        const favorite = await db.favorite.create({
            data: {
                userId: Number(user.id),
                tweetId: Number(id)
            },
            select: {
                tweet: true
            }
        });

        if (favorite) {
            const existingNotification = await checkNotification(Number(user.id), Number(favorite.tweet.userId), "favorite");

            if (existingNotification) {
                return NextResponse.json(null, { status: 200 });
            } else {
                if (Number(favorite.tweet.userId) === Number(user.id)) return NextResponse.json(null, { status: 200 });

                const notification = await db.notification.create({
                    data: {
                        visitedId: Number(favorite.tweet.userId),
                        visitorId: Number(user.id),
                        tweetId: Number(id),
                        action: "favorite"
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
        console.error("favorite post error: " + err);
        return NextResponse.json(null, { status: 500 });
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

        const favorite = await db.favorite.deleteMany({
            where: {
                userId: Number(user.id),
                tweetId: Number(id)
            }
        });

        return NextResponse.json(favorite, { status: 200 });
    } catch (err) {
        console.error("favorite delte error: " + err);
        return NextResponse.json(null, { status: 500 });
    }
}