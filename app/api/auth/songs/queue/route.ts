import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const BodySchemaGET = z.object({
    spaceId: z.string()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parseResult = BodySchemaGET.safeParse(body);

        if (!parseResult.success) {
            return (
                NextResponse.json({
                    msg: "Invalid Inputs"
                })
            )
        }

        const { spaceId } = parseResult.data;

        const queue = await prisma.song.findMany({
            where: {
                spaceId
            }
        })

        if (queue) {
            return NextResponse.json({ queue })
        } else {
            return NextResponse.json({ 
                title: "New Song",
                channel: "User",
                thumbnail: "bg-linear-to-r from-gray-300 to-gray-600",
                votes: 0
            })
        }
    } catch(e) {
        console.error('Song API error:', e);
        return NextResponse.json({ msg: "Failed to get song" }, { status: 500 });
    }
}