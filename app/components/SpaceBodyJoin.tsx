import { Search, ArrowRight } from "lucide-react";

// --- The Wrapper ---
export const SpaceBodyJoin = () => {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-8">
                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                    Find Your <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">Frequency</span>
                 </h1>
                 <p className="text-slate-400">Join a live jam session or discover new rooms.</p>
            </div>
            <SearchSpace />
        </div>
    )
}

// --- The Styled Search Component (Inline for convenience) ---
export const SearchSpace = () => {
    return (
        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl flex items-center gap-2 group focus-within:border-cyan-500/50 focus-within:shadow-cyan-500/20 transition-all duration-300">
            
            <div className="pl-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                <Search size={24} />
            </div>

            <input 
                type="text" 
                placeholder="Search for a space ID or name..."
                className="flex-1 bg-transparent border-none text-white text-lg px-2 py-3 focus:outline-none placeholder:text-slate-500"
            />

            <button className="bg-slate-800 hover:bg-cyan-600 text-white p-3 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95">
                <ArrowRight size={24} />
            </button>
        </div>
    );
}