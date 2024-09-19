import {NextResponse, NextRequest} from "next/server";
import {auth} from "@clerk/nextjs/server";

import {v2 as cloudinary} from 'cloudinary';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
});

interface CloudinaryUploadResult {
    public_id: string,
    bytes: number;
    duration?: number;

    [key: string]: any;
}

export async function POST(request: NextRequest) {

    try {

        const {userId} = auth();
        if (!userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        if (!process.env.NEXT_PUBLIC_CLOUDINARY_NAME || !process.env.CLOUDINARY_API || !process.env.CLOUDINARY_SECRET) {
            return NextResponse.json({error: "cloudinary credentials not found!"}, {status: 500})
        }
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string | null;
        const description = formData.get("description") as string | null;
        const originalSize = formData.get("originalSize") as string | null;

        if (!file) {
            return NextResponse.json({error: "File not found"}, {status: 400})
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(new Uint8Array(bytes));

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "saas-next-cloudinary-video-uploads",
                    resource_type: "video",
                    transformation: [
                        {
                            quality: "auto",
                            fetch_format: "mp4",
                        },
                    ]
                }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result as CloudinaryUploadResult)
                }
            )
            uploadStream.end(buffer);
        });

        const video = await prisma.video.create({
            data: {
                title: title || "Untitled",
                description: description || "",
                publicId: result.public_id,
                originalSize: originalSize || "0",
                compressedSize: String(result.bytes) || "0",
                duration: result.duration || 0,
            }
        });

        return NextResponse.json({video}, {status: 201})

    } catch (e) {
        console.log("Upload video failed")
        return NextResponse.json({error: "upload video failed"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }

}