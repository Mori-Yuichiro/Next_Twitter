import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const tweet = await db.tweet.findFirst({
            where: {
                id: Number(params.id)
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });

        return NextResponse.json(tweet);
    } catch (err) {
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

        const { id } = params;

        const result = await db.tweet.delete({
            where: {
                id: Number(id)
            }
        });

        return NextResponse.json(result);
    } catch (err) {
        console.error(`Error: ${err}`);
        return NextResponse.json(null, { status: 500 })
    }
}