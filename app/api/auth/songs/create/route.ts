import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import YouTube from "youtube-sr";
import z from "zod";

const BodySchema = z.object({
    spaceId: z.string(),
    url: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const parseResult = BodySchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ 
        msg: "Invalid inputs"
      });
    }

    const { spaceId, url } = parseResult.data;
    const urlId = new URL(url).searchParams.get('v') || url.split('?v=')[1];

    const video = await YouTube.getVideo(url);

    const songExists = await prisma.song.findFirst({
      where: {
        id: urlId,
        spaceId: spaceId
      }
    })

    if (songExists) {
      await prisma.song.update({
        where: {
          id: urlId,
          spaceId: spaceId
        },
        data: {
          votes: {
            increment: 1
          }
        }
      })

      const song = await prisma.song.findFirst({
        where: {
          id: urlId,
          spaceId: spaceId
        }
      })

      return NextResponse.json({ song })
    }

    const song = await prisma.song.create({
      data: {
        id: urlId!,
        spaceId,
        title: video.title ?? "Title not Found",
        channel: video.channel?.name ?? "Channel not Found",
        thumbnail: video.thumbnail?.url ?? "Thumbnail not Found",
        url,
        votes: 0
      }
    });

    return NextResponse.json({ song });
  } catch (e) {
    console.error('Song API error:', e);
    return NextResponse.json({ msg: "Failed to put song" }, { status: 500 });
  }
}
