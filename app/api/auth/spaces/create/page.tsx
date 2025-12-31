'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "@/app/components/Navbar";
import { SpaceBodyCreate } from "@/app/components/SpaceBodyCreate"; // Ensure this path is correct
import SpaceRadio from "@/app/components/SpaceRadio";

// Types for the stars
type StarData = {
  id: number;
  top: string;
  left: string;
  size: string;
  duration: number;
  moveY: number;
  initialOpacity: number;
};

export default function CreateSpacePage() {
  const [stars, setStars] = useState<StarData[]>([]);

  // Generate stars on mount (Client Side Only)
  useEffect(() => {
    const generatedStars = Array.from({ length: 25 }).map((_, i) => ({
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
    <div className="min-h-screen w-full relative bg-slate-950 overflow-hidden flex flex-col">
      
      {/* --- BACKGROUND LAYER (Applied globally here) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Nebulas */}
        <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-purple-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-125 h-125 bg-indigo-900/30 rounded-full blur-[120px]" />
        
        {/* Stars */}
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

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <Navbar />
        
        {/* Main Content Area: Centered and Side-by-Side */}
        <div className="flex-1 flex items-center justify-center gap-16 md:gap-24 px-8">
            
            {/* Left: The Radio */}
            <SpaceRadio />

            {/* Right: The Form */}
            <div className="w-full max-w-md">
                <SpaceBodyCreate />
            </div>

        </div>
      </div>

    </div>
  );
}