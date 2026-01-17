'use client'

import Image from 'next/image'
import { Circle } from 'lucide-react'

interface User {
  id: string
  name: string
  avatar: string
}

interface UserListProps {
  users: User[]
  currentUserId: string
}

export default function UserList({ users, currentUserId }: UserListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {users.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <p className="text-sm">No other users online</p>
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                user.id === currentUserId
                  ? 'bg-primary-50 border border-primary-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${
                  user.id === currentUserId ? 'text-primary-700' : 'text-gray-800'
                }`}>
                  {user.name}
                  {user.id === currentUserId && (
                    <span className="ml-2 text-xs text-primary-600">(You)</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
