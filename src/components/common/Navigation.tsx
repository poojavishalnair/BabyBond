import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Calendar, TrendingUp, Settings, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/settings', icon: Settings, label: 'Settings' }
]

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-baby-pink-200 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
                isActive
                  ? "text-baby-pink-600 bg-baby-pink-50"
                  : "text-gray-500 hover:text-baby-pink-500 hover:bg-baby-pink-25"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("w-6 h-6 mb-1", isActive && "animate-bounce-gentle")} />
                <span className="text-xs font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}