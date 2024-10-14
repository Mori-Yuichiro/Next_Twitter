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

        const userProfile = await db.user.findFirst({
            where: {
                id: Number(user.id)
            },
        });

        return NextResponse.json(userProfile, { status: 200 });
    } catch (err) {
        console.error("current user error: " + err);
        return NextResponse.json(null, { status: 500 });
    }

}