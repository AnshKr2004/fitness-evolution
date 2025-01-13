"use client"

import { Search } from 'lucide-react'
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-700 bg-black px-4 py-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-semibold text-white">Fitness Evolution</span>
        </div>
        
        <div className="flex flex-1 items-center justify-center px-4 lg:px-12">
          <div className="relative w-full max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 pl-10 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
            <button className="rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cqIIGE4CIWZqR8SKaqO6gVxhNe5IgO.png"
              alt="Profile picture"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden text-sm font-medium text-white md:block">Vikram Khatkar</span>
          </div>
        </div>
      </div>
    </nav>
  )
}