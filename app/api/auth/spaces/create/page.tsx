import { Navbar } from "@/app/components/Navbar";
import { SpaceBodyCreate } from "@/app/components/SpaceBodyCreate";
import SpaceRadio from "@/app/components/SpaceRadio";
import { BgGradient } from '@/app/components/BgGradient';
import { getSession } from "@/lib/getSession";

export default async function CreateSpacePage() {
  const { user } = await getSession()

  if (!user?.id) return
  const userId = user?.id
  
  return (
    <div className="min-h-screen w-full relative bg-slate-950 overflow-hidden flex flex-col">
    
    <BgGradient />

      <div className="relative z-10 w-full h-full flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center gap-16 md:gap-24 px-8">
            <SpaceRadio />
            <div className="w-full max-w-md">
                <SpaceBodyCreate userId={userId} />
            </div>

        </div>
      </div>

    </div>
  );
}