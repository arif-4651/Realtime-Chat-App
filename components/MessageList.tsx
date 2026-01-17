'use client'

import { useEffect, useRef } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import { Check, CheckCheck } from 'lucide-react'

interface Message {
  id: string
  user: string
  text: string
  timestamp: Date
  avatar: string
}

interface MessageListProps {
  messages: Message[]
  currentUser: string
}

export default function MessageList({ messages, currentUser }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="h-full overflow-y-auto p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium">No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => {
          const isOwnMessage = message.user === currentUser
          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src={message.avatar}
                    alt={message.user}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[70%]`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-semibold ${isOwnMessage ? 'text-primary-600' : 'text-gray-700'}`}>
                    {message.user}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(message.timestamp), 'HH:mm')}
                  </span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                    isOwnMessage
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </div>
                {isOwnMessage && (
                  <div className="mt-1 flex items-center gap-1">
                    <CheckCheck className="w-4 h-4 text-primary-500" />
                  </div>
                )}
              </div>
            </div>
          )
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
