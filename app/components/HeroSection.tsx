"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Body } from "./Body";
import { Navbar } from "./Navbar";

// Star Data Type
type StarData = {
  id: number;
  top: string;
  left: string;
  size: string;
  duration: number;
  moveY: number;
  initialOpacity: number;
};

export const HeroSection = () => {
  const [stars, setStars] = useState<StarData[]>([]);

  // Generate stars on client side to prevent hydration mismatches
  useEffect(() => {
    const generatedStars = Array.from({ length: 30 }).map((_, i) => ({
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
    <div className="min-h-screen w-full relative bg-slate-950 overflow-hidden text-white">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Nebulas */}
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-indigo-900/20 rounded-full blur-[120px]" />
        
        {/* Floating Stars */}
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
      <div className="relative z-10 w-full h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center">
            <Body />
        </div>
      </div>
    </div>
  );
};