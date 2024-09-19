import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
    try {
        const videos = await prisma.video.findMany(
            {
                orderBy: {
                    createdAt: "desc"
                }
            }
        )
        return NextResponse.json({videos}, {status: 200})
    } catch (e) {
        return NextResponse.json({error: "Error fetching videos"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}