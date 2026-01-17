'use client'

import Image from 'next/image'
import { LogOut, Wifi, WifiOff, MessageCircle } from 'lucide-react'

interface HeaderProps {
  user: { id: string; name: string; avatar: string }
  onLogout: () => void
  isConnected: boolean
}

export default function Header({ user, onLogout, isConnected }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-md">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">ChatApp</h1>
            <p className="text-sm text-gray-500">Real-time messaging</p>
          </div>
        </div>

        {/* Connection Status and User Info */}
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">Disconnected</span>
              </>
            )}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
