"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Users, Dumbbell, Calendar, MessageSquare, HeadphonesIcon } from 'lucide-react'

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart2 },
  { name: "User Management", href: "/users", icon: Users },
  { name: "Trainers", href: "/trainers", icon: Dumbbell },
  { name: "Sessions", href: "/sessions", icon: Calendar },
  { name: "Community", href: "/community", icon: MessageSquare },
  { name: "Chat Support", href: "/support", icon: HeadphonesIcon },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-700 bg-black pt-16">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg p-2 text-base hover:text-white ${
                    isActive ? "text-white" : "text-gray-600"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}