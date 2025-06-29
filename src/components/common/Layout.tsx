import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'

export function Layout() {
  return (
    <div className="min-h-screen bg-baby-pink-50">
      <main className="pb-16 safe-area-bottom">
        <Outlet />
      </main>
      <Navigation />
    </div>
  )
}