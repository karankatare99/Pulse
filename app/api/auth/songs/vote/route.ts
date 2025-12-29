import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const BodySchema = z.object({
    songId: z.string()
})

export async function POST(request : NextRequest) {
    const body = await request.json()
    const { success } = BodySchema.safeParse(body)

    if (!success) {
        return NextResponse.json({
            msg: "Invalid Body"
        })
    }

    try {
        await prisma.song.update({
            where: {
                id: body.id
            },
            data: {
                votes: { increment: 1 }
            }
        })

        return NextResponse.json({
            msg: "Voted Up"
        })
    } catch(e) {
        console.error(e)
        return NextResponse.json({
            msg: "Failed to Vote Up"
        })
    }

}