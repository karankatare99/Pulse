'use client'
import { useSession } from "next-auth/react"
import { useTransition } from "react"
import { useState } from "react"
import { createSpace } from "../api/auth/spaces/route"
import { useRouter } from "next/navigation"

export const SpaceBodyCreate = () => {
    const { data: session } = useSession()
    const [isPending, startTransition] = useTransition()
    const [result, setResult] = useState<{ success?: boolean, error?: string }>({})
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        formData.append('userEmail', session?.user?.email || '')
        
        const outcome = await createSpace(null, formData)
        setResult(outcome)

        if (outcome.success && outcome.space?.id) {
            router.push(`/spaces/${outcome.space.id}`)
        }
    }

    return (
        <div className="w-full flex flex-col gap-6 items-center">
            <h1 className="text-3xl font-bold text-white mb-4 tracking-wider">Join the Frequency</h1>
            
            <form action={handleSubmit} className="w-full">
                <input
                    name="spaceName"
                    type="text" 
                    className="w-full px-6 py-4 text-xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all placeholder:text-white/40 placeholder:font-righteous" 
                    placeholder="Name your Space" 
                    required
                />
                
                {result.error && (
                    <p className="text-red-400 text-sm mt-2 animate-pulse">{result.error}</p>
                )}
                
                <button 
                    type="submit"
                    disabled={isPending || !session}
                    className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white text-lg px-6 py-4 font-righteous rounded-2xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {isPending ? "Creating..." : "Create Space"}
                </button>
            </form>
        </div>
    )
}
