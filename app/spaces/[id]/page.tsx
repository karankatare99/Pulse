import { Navbar } from "@/app/components/Navbar";
import CosmicAudioPlayer from "@/app/components/CosmicAudioPlayer";
import CosmicSongQueue from "@/app/components/CosmicSongQueue";
import { BgGradient } from "@/app/components/BgGradient";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/getSession";

export interface Song {
  id: string;
  spaceId: string;
  title: string;
  channel: string;
  thumbnail: string;  
  url: string;        
  votes: number;
}

const currentTrack: Song = {
  id: "curr-1",
  spaceId: "space01",
  title: "Nebula Dreams",
  channel: "Stellar Echo",
  thumbnail: "from-cyan-500 via-blue-500 to-purple-600",
  url: "space01yt",
  votes: 0,
};

const initialQueueData: Song[] = [];

export default async function StreamPage() {
  const { space } = await getSession()
  
  if (!space?.id) return
  const spaceId = space.id

  const resTrack = await axios.post('http://localhost:3000/api/auth/songs/current', {
    spaceId,
    currentTrack: true
  })
  const currentTrack = resTrack.data.track

  const resQueue = await axios.post('http://localhost:3000/api/auth/songs/queue', {
    spaceId
  })
  const initialQueue = await resQueue.data.queue
  return (
    <div className="min-h-screen w-full relative bg-slate-950 overflow-hidden text-white flex flex-col">
      <BgGradient />
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />
        
        <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 p-6 lg:p-12 max-w-7xl mx-auto w-full">
            
            <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
                <CosmicAudioPlayer currentTrack={currentTrack} />
            </div>

            <div className="w-full lg:w-7/12">
                <CosmicSongQueue initialQueue={initialQueue} />
            </div>

        </div>
      </div>
    </div>
  );
}