"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Plus } from 'lucide-react';
import { Song } from '../spaces/[id]/page';

interface QueueProps {
    initialQueue: Song[];
}

const CosmicSongQueue: React.FC<QueueProps> = ({ initialQueue }) => {
    const [queue, setQueue] = useState<Song[]>(initialQueue);
    // State to track which item ID was just voted on to trigger animation
    const [justVotedId, setJustVotedId] = useState<string | null>(null);

    const handleVote = (id: string) => {
        // 1. Trigger animation feedback
        setJustVotedId(id);
        // Reset animation trigger after short delay
        setTimeout(() => setJustVotedId(null), 600);

        // 2. Update vote count in state
        setQueue(prevQueue => 
            prevQueue.map(song => 
                song.id === id ? { ...song, votes: song.votes + 1 } : song
            ).sort((a, b) => b.votes - a.votes) // Re-sort based on new votes
        );
    };

  return (
    <motion.div 
      // Requirement: fade_in and slide_in animation (from right)
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden h-full min-h-[600px] flex flex-col"
    >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
                <h3 className="text-sm uppercase tracking-widest text-cyan-400 font-medium mb-1">Up Next</h3>
                <h2 className="text-2xl font-bold text-white">Queue</h2>
            </div>
            
            {/* Requirement: Add Song Button */}
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer">
                <Plus size={18} />
                <span>Add Song</span>
            </button>
        </div>

        {/* Queue List */}
        <div className="flex-1 overflow-y-auto pr-2 relative z-10 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
            <AnimatePresence>
            {queue.map((song, index) => (
                <motion.div 
                    key={song.id}
                    layout // Animate reordering when votes change positions
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0,
                        // Requirement: Vote Feedback Animation ("highlight")
                        backgroundColor: justVotedId === song.id ? "rgba(34, 211, 238, 0.2)" : "rgba(255, 255, 255, 0)",
                        borderColor: justVotedId === song.id ? "rgba(34, 211, 238, 0.5)" : "rgba(255, 255, 255, 0.1)"
                    }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between p-3 rounded-[1.5rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
                >
                    <div className="flex items-center gap-4 flex-1">
                        {/* Song Index / Small Cover */}
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${song.thumbnail} flex items-center justify-center text-white/70 font-bold shadow-sm`}>
                            {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-white truncate group-hover:text-cyan-200 transition-colors">{song.title}</h4>
                            <p className="text-sm text-slate-400 truncate">{song.channel}</p>
                        </div>
                    </div>

                    {/* Voting System */}
                    <div className="flex items-center gap-3 pl-4">
                         {/* Requirement: Vote Count Display */}
                        <span className="font-mono text-sm text-slate-300 min-w-[24px] text-center">{song.votes}</span>
                        
                         {/* Requirement: Vote Button */}
                        <button 
                            onClick={() => handleVote(song.id)}
                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all active:scale-90 cursor-pointer"
                        >
                            <ArrowUp size={20} />
                        </button>
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
        
        {/* Bottom fade overlay for scrolling list */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none z-20 rounded-b-[2.5rem]" />

    </motion.div>
  );
};

export default CosmicSongQueue;