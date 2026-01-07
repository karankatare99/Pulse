import { authOptions } from "@/app/lib/auth";
import prisma from "./prisma";
import { getServerSession } from "next-auth/next"; 

export interface User {
  id?: string;
  name?: string;
  email?: string;
  spaces?: Space[];
}

export interface Space {
  id?: string;
  userId?: string;
  name?: string;
  songs?: Song[];
}

export interface Song {
  id: string;
  spaceId: string;
  title: string;
  channel: string;
  thumbnail: string;
  url: string;
  votes: number;
}

interface SessionResponse {
  user: User | null;
  space: Space | null;
}

export async function getSession(): Promise<SessionResponse> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return { user: null, space: null };
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return { user: null, space: null };
  }

  const space = await prisma.space.findFirst({
    where: { userId: user.id }
  });

  return {
    user,
    space
  };
}
