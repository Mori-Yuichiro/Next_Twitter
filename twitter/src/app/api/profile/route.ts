import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const profileSchema = z.object({
    displayName: z.string().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    image: z.string().optional(),
    profileImageUrl: z.string().optional()
});

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const { user } = session;

        const json = await req.json();
        const body = profileSchema.parse(json);

        const now = new Date();

        const profile = await db.user.update({
            data: {
                ...body,
                updatedAt: now
            },
            where: {
                id: Number(user.id)
            }
        })

        return NextResponse.json(profile);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json(err.errors, { status: 422 });
        }
        return NextResponse.json(null, { status: 500 });
    }
}