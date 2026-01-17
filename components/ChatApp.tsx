'use client'

import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import ChatBox from './ChatBox'
import MessageList from './MessageList'
import UserList from './UserList'
import Header from './Header'
import { LogOut, Users, MessageSquare } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: string
  user: string
  text: string
  timestamp: Date
  avatar: string
}

interface User {
  id: string
  name: string
  avatar: string
}

interface ChatAppProps {
  user: { id: string; name: string; avatar: string }
  onLogout: () => void
}

export default function ChatApp({ user, onLogout }: ChatAppProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Initialize socket connection
    // For Vercel: Set NEXT_PUBLIC_SOCKET_URL environment variable to your Socket.io server URL
    // Example: https://your-socket-server.railway.app
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'
    
    console.log('Connecting to Socket.io server:', socketUrl)
    
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
      newSocket.emit('join', user)
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    newSocket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    newSocket.on('users', (userList: User[]) => {
      setUsers(userList)
    })

    newSocket.on('userJoined', (newUser: User) => {
      setUsers((prev) => [...prev, newUser])
    })

    newSocket.on('userLeft', (userId: string) => {
      setUsers((prev) => prev.filter((u) => u.id !== userId))
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [user])

  const sendMessage = (text: string) => {
    if (socket && text.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: user.name,
        text: text.trim(),
        timestamp: new Date(),
        avatar: user.avatar,
      }
      socket.emit('message', message)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header user={user} onLogout={onLogout} isConnected={isConnected} />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - User List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              <h2 className="font-semibold text-gray-800">Online Users</h2>
              <span className="ml-auto bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                {users.length}
              </span>
            </div>
          </div>
          <UserList users={users} currentUserId={user.id} />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <Image
              src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2029&q=80"
              alt="Pattern"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col relative z-10">
            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <MessageList messages={messages} currentUser={user.name} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 bg-white">
              <ChatBox onSendMessage={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
