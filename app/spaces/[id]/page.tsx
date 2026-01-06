"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import CosmicAudioPlayer from "@/app/components/CosmicAudioPlayer";
import CosmicSongQueue from "@/app/components/CosmicSongQueue";


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

type StarData = { id: number; top: string; left: string; size: string; duration: number; moveY: number; initialOpacity: number; };

export default function StreamPage() {
  const [stars, setStars] = useState<StarData[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: Math.random() * 5 + 5,
      moveY: Math.random() * -100,
      initialOpacity: Math.random()
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-slate-950 overflow-hidden text-white flex flex-col">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-cyan-900/20 rounded-full blur-[120px]" />
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            initial={{ opacity: star.initialOpacity, scale: 0.5 }}
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, star.moveY] }}
            transition={{ duration: star.duration, repeat: Infinity, ease: "linear" }}
            style={{ width: star.size, height: star.size, top: star.top, left: star.left }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <Navbar />
        
        <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 p-6 lg:p-12 max-w-7xl mx-auto w-full">
            
            <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
                 <CosmicAudioPlayer />
            </div>

            <div className="w-full lg:w-7/12">
                 <CosmicSongQueue />
            </div>

        </div>
      </div>
    </div>
  );
}