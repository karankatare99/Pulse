import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const BodySchemaPOST = z.object({
    songId: z.string(),
    spaceId: z.string()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const parseResult = BodySchemaPOST.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json({
                msg: "Invalid Inputs"
            })
        }

        const { songId, spaceId } = parseResult.data;

        await prisma.song.update({
            where: {
                id: songId,
                spaceId: spaceId
            },
            data: {
                currentTrack: true
            }
        })
    } catch(e) {
        console.error('Song API error:', e);
        return NextResponse.json({ msg: "Failed to put song" }, { status: 500 });
    }
}