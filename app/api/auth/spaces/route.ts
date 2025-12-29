import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const BodySchema = z.object({
    userId: z.string(),
    name: z.string()
})

export async function POST(request : NextRequest) {
    const body = await request.json() ?? ""
    const { success } = BodySchema.safeParse(body)

    if (!success) {
        return NextResponse.json({
            msg: "Invalid Body"
        })
    }

    try {
        const new_space = await prisma.space.create({
            data: {
                userId: body.id,
                name: body.name
            }
        })

        return NextResponse.json(
            new_space
        )
    } catch(e) {
        console.log(e)
        return NextResponse.json({
            msg: "Failed to Create Space"
        })
    }

}