"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Play, SkipForward, SkipBack, Heart, ListMusic } from 'lucide-react';
import { Song } from '../spaces/[id]/page';

interface PlayerProps {
    track: Song;
}

const CosmicAudioPlayer: React.FC<PlayerProps> = ({ track }) => {
  return (
    <motion.div 
      // Requirement: fade_in and slide_in animation
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl shadow-purple-500/10 relative overflow-hidden group"
    >
      {/* subtle glow effect inside card */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Album Art / Visualizer Placeholder */}
      <div className={`w-full aspect-square rounded-4xl bg-linear-to-br ${track.thumbnail} mb-8 shadow-lg shadow-black/50 relative flex items-center justify-center overflow-hidden`}>
          {/* Animated pulse simulating sound */}
          <motion.div 
             animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
             transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
             className="absolute inset-0 bg-white/10 rounded-4xl blur-xl"
          />
          <div className="relative z-10 p-4 bg-black/20 backdrop-blur-sm rounded-full">
            <ListMusic size={32} className="text-white/80" />
          </div>
      </div>

      {/* Track Info */}
      <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-200 truncate">{track.title}</h2>
              <p className="text-slate-400 text-lg">{track.channel}</p>
          </div>
          <button className="text-slate-400 hover:text-pink-500 transition-colors p-2">
              <Heart size={24} />
          </button>
      </div>

      {/* Progress Bar (Visual Mock) */}
      <div className="mb-8 relative z-10 group/progress cursor-pointer">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-linear-to-r from-cyan-400 to-purple-500 relative">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
              </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
              <span>1:24</span>
              <span>3:45</span>
          </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 relative z-10">
          <button className="text-slate-400 hover:text-white transition-all hover:scale-110"><SkipBack size={28} /></button>
          
          {/* Requirement: Pause button disabled initially, showing Play */}
          <button className="w-20 h-20 flex items-center justify-center bg-linear-to-tr from-cyan-500 to-purple-600 text-white rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all cursor-pointer active:scale-95">
              <Play size={36} fill="currentColor" className="ml-1" />
          </button>
          
          <button className="text-slate-400 hover:text-white transition-all hover:scale-110"><SkipForward size={28} /></button>
      </div>
    </motion.div>
  );
};

export default CosmicAudioPlayer;