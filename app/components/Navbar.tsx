"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
export const Navbar = () => {

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl uppercase font-righteous text-gray-300">
            Melodies
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium hover:text-gray-300 transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}
            <button onClick={() => signIn()} className="border-2 border-white px-4 py-2 font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 hover:cursor-pointer">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
