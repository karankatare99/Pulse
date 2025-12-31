import Link from "next/link";
import MusicPlayer from "./MusicPlayer";

export const Body = () => {
  return (
    <div className="w-full flex items-center justify-center pl-4 pr-4 md:pl-16">
      <div className="flex flex-col lg:flex-row justify-between items-center max-w-7xl w-full gap-16 lg:gap-8">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col justify-center gap-8 max-w-xl">
          <h1 className="text-5xl md:text-6xl font-saira font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-100 to-slate-400">
              Pure Vibes for the
            </span>
            <br />
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Soul Reset
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-cyan-500/30 pl-6">
            Defying language, it pierces ego to touch the soul's shared essence,
            dissolving stranger and self into harmony. Music rebels against
            entropy, forging order from disorder, urging us to listen deeper and
            live louder in being's grand composition.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <Link href={"/api/auth/spaces/create"} className="flex-1">
              <button className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 font-righteous rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 transition-all duration-200 cursor-pointer text-lg tracking-wide">
                Create Space
              </button>
            </Link>
            
            <Link href={"/api/auth/spaces/join"} className="flex-1">
              <button className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 font-righteous rounded-xl hover:bg-white/10 hover:border-white/40 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 cursor-pointer text-lg tracking-wide">
                Join Space
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Music Player Container */}
        <div className="w-full max-w-md relative">
            {/* Subtle glow behind the player */}
            <div className="absolute inset-0 bg-linear-to-tr from-purple-500/20 to-cyan-500/20 blur-3xl rounded-full opacity-40 -z-10" />
            <MusicPlayer />
        </div>

      </div>
    </div>
  );
};