import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const BodySchemaGET = z.object({
    spaceId: z.string(),
    currentTrack: z.boolean()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const parseResult = BodySchemaGET.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json({
                msg: "Invalid Inputs"
            })
        }

        const { currentTrack, spaceId } = parseResult.data;

        const track = await prisma.song.findFirst({
            where: {
                spaceId: spaceId,
                currentTrack: currentTrack
            }
        })

        return NextResponse.json({ track })
    } catch(e) {
        console.error('Song API error:', e);
        return NextResponse.json({ msg: "Failed to get song" }, { status: 500 });
    }
}