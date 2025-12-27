import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const BodySchema = z.object({
    spaceId: z.string(),
    title: z.string(),
    channel: z.string(),
    thumbnail: z.string(),
    votes: z.number(),
    url: z.string()
})

export const AddSong = async (request: NextRequest) => {
    const body = await request.json()
    const { success } = BodySchema.safeParse(body)
    const urlId = body.url.split("?v=")[1]

    if (!success) {
        return NextResponse.json({
            msg: "Invalid Body"
        })
    }

    try {
        const new_song = await prisma.song.create({
            data: {
                id: urlId,
                spaceId: body.spaceId,
                title: body.title,
                channel: body.channel,
                thumbnail: body.thumbnail,
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