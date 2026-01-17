'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { MessageCircle, User, ArrowRight } from 'lucide-react'

interface LoginModalProps {
  onLogin: (user: { id: string; name: string; avatar: string }) => void
}

export default function LoginModal({ onLogin }: LoginModalProps) {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')

  const generateAvatar = () => {
    const randomId = Math.floor(Math.random() * 1000)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomId}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      const userAvatar = avatar || generateAvatar()
      onLogin({
        id: uuidv4(),
        name: name.trim(),
        avatar: userAvatar,
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <MessageCircle className="w-12 h-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">ChatApp</h1>
          <p className="text-primary-200">Real-time messaging made simple</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL (Optional)
              </label>
              <input
                type="url"
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
              <p className="mt-2 text-xs text-gray-500">
                Leave empty to generate a random avatar
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Join Chat
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white font-semibold">Real-time</p>
            <p className="text-primary-200 text-sm">Instant messaging</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white font-semibold">Secure</p>
            <p className="text-primary-200 text-sm">Private chats</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white font-semibold">Modern</p>
            <p className="text-primary-200 text-sm">Beautiful UI</p>
          </div>
        </div>
      </div>
    </div>
  )
}
