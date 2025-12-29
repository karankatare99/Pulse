"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Heart, ListMusic } from "lucide-react";

export default function CompactMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    // Container: Locked to screen height, no scrollbars allowed
    <div className="flex items-center justify-center w-full h-screen overflow-hidden">
      
      {/* Card: Reduced width to max-w-[320px] for a compact fit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[320px] bg-slate-800/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-5 mx-4 overflow-hidden"
      >
        {/* Background Gradients (Clipped inside the card or handled by outer container) */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative z-10 text-slate-400">
          <motion.button whileTap={{ scale: 0.9 }}>
            <ListMusic size={18} />
          </motion.button>
          <span className="text-[10px] font-bold tracking-widest uppercase">Now Playing</span>
          <motion.button whileTap={{ scale: 0.9 }}>
            <Heart size={18} className="hover:text-red-500 transition-colors" />
          </motion.button>
        </div>

        {/* Album Art: Reduced to w-48 (12rem) to save vertical space */}
        <div className="relative flex justify-center mb-6 z-10">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            //   playState: isPlaying ? "running" : "paused",
            }}
            className="relative w-48 h-48 rounded-full shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] border-[3px] border-slate-700/50 flex items-center justify-center bg-slate-900 overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"
              alt="Album Cover"
              className="absolute w-full h-full object-cover opacity-80"
            />
            {/* Center Hole */}
            <div className="absolute w-14 h-14 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center z-20">
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            {/* Shine */}
            <div className="absolute w-full h-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10" />
          </motion.div>
        </div>

        {/* Track Info */}
        <div className="flex justify-between items-end mb-4 relative z-10">
          <div className="overflow-hidden">
            <h2 className="text-lg font-bold text-white truncate">Neon Nights</h2>
            <p className="text-slate-400 text-xs truncate">Synthwave Collective</p>
          </div>
          
          {/* Mini Visualizer */}
          <div className="flex items-end gap-[3px] h-6 mb-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlaying ? [6, 20, 6] : 4,
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
                className="w-1 bg-purple-400 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 mb-6 group cursor-pointer">
          <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              layout
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-slate-500 font-medium font-mono">
            <span>1:24</span>
            <span>3:45</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4 relative z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-slate-300 hover:text-white"
          >
            <SkipBack size={24} />
          </motion.button>

          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20 text-slate-900"
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Pause size={24} fill="currentColor" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="pl-1"
                >
                  <Play size={24} fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-slate-300 hover:text-white"
          >
            <SkipForward size={24} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}