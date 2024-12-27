"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/opentag.png" alt="OpenTag" width={40} height={40} className="mr-2" />
              <span className="font-bold text-xl hidden sm:inline">OpenTag</span>
            </Link>
            <div className="sm:hidden">
              <Button variant="ghost" asChild>
                <Link href="/register">Get Tag</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <Button variant="primary" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/register">Get Tag</Link>
              </Button>
              <div className="hidden sm:inline">
                <ModeToggle />
              </div>
            </div>

            <div className="sm:hidden flex items-center gap-4">
              <ModeToggle />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:bg-stone-700 hover:text-white">
              Login
            </Link>
            <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:bg-stone-700 hover:text-white">
              Get Tag
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
