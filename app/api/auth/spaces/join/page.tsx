import { Navbar } from "@/app/components/Navbar";
import { SpaceBodyJoin } from "@/app/components/SpaceBodyJoin";

export default function () {
    return (
        <div className="min-h-screen w-full relative bg-black overflow-hidden">
            <div className="absolute inset-0 z-0"
                style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
            }}>
                <div className="w-full h-screen">
                    <Navbar />
                    <SpaceBodyJoin />
                </div>
            </div>
        </div>
    )
}