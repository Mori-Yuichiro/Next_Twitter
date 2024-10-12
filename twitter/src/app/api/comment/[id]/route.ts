import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

        const result = await db.comment.delete({
            where: {
                id: Number(id)
            },
            select: {
                id: true
            }
        });

        return NextResponse.json(result);
    } catch (err) {
        console.error("API Error:" + err);
        return NextResponse.json(null, { status: 500 });
    }
}