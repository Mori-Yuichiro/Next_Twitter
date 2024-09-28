import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json("Unauthorized", { status: 403 });
        }

        const body = await request.json();
        const { imageData } = body;
        const result = await cloudinary.uploader.upload(imageData);
        return NextResponse.json(result.secure_url);
    } catch (err) {
        return NextResponse.json(null, { status: 500 });
    }
}