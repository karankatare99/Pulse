'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Heart, Radio } from 'lucide-react';

const SpaceRadio = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const track = {
    title: "Stardust Frequency",
    artist: "Lunar Echoes",
    coverColor: "from-indigo-500 via-purple-500 to-pink-500"
  };

  const vinylVariants: Variants = {
    playing: { rotate: 360, transition: { repeat: Infinity, duration: 8, ease: "linear" } },
    paused: { rotate: 0 }
  };

  const bubbleFloat: Variants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 1, -1, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    // REMOVED: min-h-screen, bg-slate-950, and background stars
    <motion.div
      variants={bubbleFloat}
      animate="animate"
      className="relative z-10 w-80 shrink-0" // Added shrink-0 to prevent squishing
    >
      {/* Glow effect behind the bubble */}
      <div className="absolute -inset-4 bg-linear-to-r from-cyan-500 to-purple-600 rounded-[3rem] blur-xl opacity-20 animate-pulse" />

      <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-6 shadow-2xl text-white">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 opacity-70">
          <Radio size={18} className="text-cyan-400" />
          <span className="text-xs tracking-widest uppercase font-medium">Cosmic FM</span>
          <Heart size={18} className="hover:text-pink-500 cursor-pointer transition-colors" />
        </div>

        {/* Vinyl Area */}
        <div className="relative w-full aspect-square mb-6 flex items-center justify-center">
            {isPlaying && (
              <>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.5, 0], scale: 1.5 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border border-cyan-500/30 rounded-full"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.3, 0], scale: 1.8 }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 border border-purple-500/20 rounded-full"
                />
              </>
            )}
          <motion.div
            variants={vinylVariants}
            animate={isPlaying ? "playing" : "paused"}
            className={`w-48 h-48 rounded-full bg-linear-to-br ${track.coverColor} p-1 shadow-lg shadow-purple-900/50 relative flex items-center justify-center`}
          >
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent rounded-full" />
              <div className={`w-16 h-16 rounded-full bg-linear-to-br ${track.coverColor} flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-black rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info & Controls */}
        <div className="text-center mb-8 space-y-1">
          <motion.h2 key={track.title} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
            {track.title}
          </motion.h2>
          <p className="text-sm text-slate-400 font-medium">{track.artist}</p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-2">
          <button className="text-slate-400 hover:text-white transition-colors"><SkipBack size={24} /></button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 flex items-center justify-center rounded-full bg-linear-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 text-white z-20">
            <AnimatePresence mode="wait">
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </AnimatePresence>
          </motion.button>
          <button className="text-slate-400 hover:text-white transition-colors"><SkipForward size={24} /></button>
        </div>

        <div className="mt-6 flex items-center gap-3 text-[10px] text-slate-500 font-mono">
          <span>01:24</span>
          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div className="h-full bg-cyan-500/70" initial={{ width: "30%" }} animate={isPlaying ? { width: "100%" } : {}} transition={{ duration: 180, ease: "linear" }} />
          </div>
          <span>03:45</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SpaceRadio;