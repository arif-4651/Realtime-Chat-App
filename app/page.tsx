'use client'

import { useState, useEffect } from 'react'
import ChatApp from '@/components/ChatApp'
import LoginModal from '@/components/LoginModal'
import Image from 'next/image'

export default function Home() {
  const [user, setUser] = useState<{ id: string; name: string; avatar: string } | null>(null)
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setShowLogin(false)
    }
  }, [])

  const handleLogin = (userData: { id: string; name: string; avatar: string }) => {
    setUser(userData)
    setShowLogin(false)
    localStorage.setItem('chatUser', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setShowLogin(true)
    localStorage.removeItem('chatUser')
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1526374965328-7f61d4a18d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-700/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {showLogin ? (
          <LoginModal onLogin={handleLogin} />
        ) : (
          <ChatApp user={user!} onLogout={handleLogout} />
        )}
      </div>
    </main>
  )
}
