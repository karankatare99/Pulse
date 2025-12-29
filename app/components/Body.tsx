import Link from "next/link"
import MusicPlayer from "./MusicPlayer"

export const Body = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center gap-12 pl-16">
            <div className="flex justify-between max-w-6xl w-full">
                <div className="flex flex-col justify-center gap-10 max-w-md">
                    <h1 className="text-5xl font-saira">
                        Pure Vibes for the Soul Reset
                    </h1>
                    <p className="text-lg">
                        Defying language, it pierces ego to touch the soul's shared essence, dissolving stranger and self into harmony. Music rebels against entropy, forging order from disorder, urging us to listen deeper and live louder in being's grand composition.
                    </p>
                    <div className="flex gap-8">
                        <Link href={"/api/auth/spaces/create"}>
                            <button className="flex-1 bg-white text-black px-4 py-2 font-righteous rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 hover:cursor-pointer">
                                Create Space
                            </button>
                        </Link>
                        <Link href={"/api/auth/spaces/join"}>
                            <button className="flex-1 border-2 border-white px-4 py-2 font-righteous rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 hover:cursor-pointer">
                                Join Space
                            </button>                        
                        </Link>
                    </div>

                </div>
                <div className="w-full max-w-md">
                    <MusicPlayer />
                </div>
            </div>
        </div>
    )
}
