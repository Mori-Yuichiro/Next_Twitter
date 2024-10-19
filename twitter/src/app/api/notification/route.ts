import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const { user } = session;

        await db.notification.updateMany({
            data: {
                read: true
            },
            where: {
                visitedId: Number(user.id),
                read: false
            }
        });

        const notifications = await db.notification.findMany({
            where: {
                visitedId: Number(user.id)
            },
            include: {
                visitor: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(notifications, { status: 200 });
    } catch (err) {
        return NextResponse.json(null, { status: 500 });
    }
}