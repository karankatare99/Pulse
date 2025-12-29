import { Body } from "./Body"
import { Navbar } from "./Navbar"

export const HeroSection = () => {
    return (
        <div className="min-h-screen w-full relative bg-black">
            <div className="absolute inset-0 z-0"
                style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
            }}>
                <div className="w-full h-screen">
                    <Navbar />
                    <Body />
                </div>
            </div>
        </div>
    )
}