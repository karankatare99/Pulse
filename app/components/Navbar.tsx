"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Navbar = () => {
  const navItems = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const { data: session, status } = useSession();

  return (
    <nav className="w-full bg-slate-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo with Glow */}
          <Link href="/" className="text-3xl uppercase font-righteous tracking-widest relative group">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-500 drop-shadow-lg group-hover:from-cyan-300 group-hover:to-purple-400 transition-all duration-300">
              Melodies
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-wider"
              >
                {item.name}
              </Link>
            ))}

            {status === "loading" ? (
              <div className="w-24 h-10 bg-slate-800 rounded-lg animate-pulse" />
            ) : session ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-200 px-6 py-2 rounded-full font-medium transition-all"
              >
                Sign Out
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signIn()}
                className="bg-linear-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 font-bold rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
              >
                Sign In
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};