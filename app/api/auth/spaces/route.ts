import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const BodySchema = z.object({
    userId: z.string(),
    spaceName: z.string()
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parseResult = BodySchema.safeParse(body);

        if (!parseResult.success) {
            return (
                NextResponse.json({
                    msg: "Invalid Inputs"
                })
            )
        }

        const { userId, spaceName } = parseResult.data;

        const space = await prisma.space.create({
            data: {
                userId,
                name: spaceName,
            }
        })

        return NextResponse.json({ spaceId: space.id })
    } catch(e) {
        console.error('Space API error:', e);
        return NextResponse.json({ msg: "Failed to create Space" }, { status: 500 });
    }
}