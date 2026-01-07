"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";


type StarData = { id: number; top: string; left: string; size: string; duration: number; moveY: number; initialOpacity: number; };

export const BgGradient = () => {
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
    )
}