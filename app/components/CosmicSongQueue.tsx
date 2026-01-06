"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Plus, X, Link as LinkIcon, Youtube } from 'lucide-react';
import { Song } from '../spaces/[id]/page';
import axios from 'axios';

interface QueueProps {
    initialQueue: Song[];
}

const CosmicSongQueue = () => {
    const [queue, setQueue] = useState<Song[]>([]);
    const [justVotedId, setJustVotedId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const [audioUrl, setAudioUrl] = useState("");

    const params = useParams()
    const spaceId = params.id as string
    
    useEffect(() => {
        axios.post("/api/auth/songs/queue", {
            spaceId
        }).then(res => setQueue(res.data.queue))
    }, [queue])

    const handleVote = async (id: string) => {
        await axios.post("/api/auth/songs/vote", {
            id: id
        })
    };

    const handleAddSong = async () => {
        const url = urlInput.trim()

        if (!url.includes("https://www.youtube.com/watch?v=")) return

        const res = await axios.post("/api/auth/songs/create", {
            spaceId: spaceId,
            url: url
        })
        if (!res) {
            console.error("No data in response")
        }

        const songData = res.data.song

        if (!songData) {
            console.error("No data in response.data")
            return
        }

        const newSong: Song = {
            id: url.split("?v=")[1],
            spaceId: spaceId,
            title: songData.title ?? "New Song",
            channel: songData.channel ?? "User",
            thumbnail: songData.thumbnail ?? "bg-linear-to-r from-gray-300 to-gray-600",
            url: url,
            votes: 0
        };

        setQueue([...queue, newSong]);
        setUrlInput("");
        setIsModalOpen(false);
    };

  return (
    <>
        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden h-full min-h-150 flex flex-col"
        >
            <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                    <h3 className="text-sm uppercase tracking-widest text-cyan-400 font-medium mb-1">Up Next</h3>
                    <h2 className="text-2xl font-bold text-white">Queue</h2>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <Plus size={18} />
                    <span>Add Song</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 relative z-10 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
                <AnimatePresence>
                {queue.map((song, index) => (
                    <motion.div 
                        key={song.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0,
                            backgroundColor: justVotedId === song.id ? "rgba(34, 211, 238, 0.2)" : "rgba(255, 255, 255, 0)",
                            borderColor: justVotedId === song.id ? "rgba(34, 211, 238, 0.5)" : "rgba(255, 255, 255, 0.1)"
                        }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-between p-3 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${song.thumbnail} flex items-center justify-center text-white/70 font-bold shadow-sm shrink-0`}>
                                {index + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-white truncate group-hover:text-cyan-200 transition-colors">{song.title}</h4>
                                <p className="text-sm text-slate-400 truncate">{song.channel}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pl-4">
                            <span className="font-mono text-sm text-slate-300 min-w-6 text-center">{song.votes}</span>
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
            
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-slate-950/80 to-transparent pointer-events-none z-20 rounded-b-[2.5rem]" />
        </motion.div>

        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-cyan-500/10 overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500" />
                        
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Youtube size={24} className="text-red-500" />
                                Add from YouTube
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400 ml-1">Video URL</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                        <LinkIcon size={18} />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        placeholder="Paste link here..."
                                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-800 transition-all placeholder:text-slate-600"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleAddSong}
                                className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-cyan-500/20 transform active:scale-95 transition-all"
                            >
                                Add to Queue
                            </button>
                            {audioUrl && <audio src={audioUrl} controls preload="metadata" />}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </>
  );
};

export default CosmicSongQueue;