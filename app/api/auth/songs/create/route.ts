import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import YouTube from "youtube-sr"
import { z } from "zod"

const BodySchema = z.object({
    spaceId: z.string(),
    url: z.string()
})

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { success } = BodySchema.safeParse(body)
    const urlId = body.url.split("?v=")[1]

    if (!success) {
        return NextResponse.json({
            msg: "Invalid Body"
        })
    }

    try {

        const video = await YouTube.getVideo(body.url)

        const new_song = await prisma.song.create({
            data: {
                id: urlId,
                spaceId: body.spaceId,
                title: video.title ?? "Title not Found",
                channel: video.channel?.name ?? "Channel not Found",
                thumbnail: video.thumbnail?.url ?? "Thumbnail not Found",
                url: body.thumbnail,
                votes: 0
            }
        })

        return NextResponse.json(
            new_song
        )
    } catch(e) {
        console.error(e)
        return NextResponse.json({
            msg: "Failed to Add Song"
        })
    }

}