'use client'

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

interface SpaceCreateProps {
    userId: string
}

export const SpaceBodyCreate:React.FC<SpaceCreateProps> = ({ userId }) => {
    const [spaceName, setSpaceName] = useState("");
    const router = useRouter()
    const handleSubmit = async () => {
        const res = await axios.post("/api/auth/spaces", {
            userId,
            spaceName
        })

        const spaceId = res.data.spaceId;
        router.push(`/api/spaces/${spaceId}`)
    }
    return (
        <div className="w-full flex flex-col gap-6 items-center">
            <h1 className="text-3xl font-bold text-white mb-4 tracking-wider">Join the Frequency</h1>
            
            <div className="w-full">
                <input
                    onChange={(e) => setSpaceName(e.target.value)}
                    type="text" 
                    className="w-full px-6 py-4 text-xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all placeholder:text-white/40 placeholder:font-righteous" 
                    placeholder="Name your Space" 
                    required
                />
                
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white text-lg px-6 py-4 font-righteous rounded-2xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    Create Space
                </button>
            </div>
        </div>
    )
}
