# Real-Time Chat Application 💬

A modern, professional real-time chat application built with Next.js, TypeScript, Socket.io, and Tailwind CSS. Perfect for showcasing frontend development skills on your CV.

## ✨ Features

- **Real-time Messaging**: Instant message delivery using WebSocket (Socket.io)
- **User Authentication**: Simple name-based login with avatar support
- **Online Users List**: See who's currently online
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Connection Status**: Visual indicator for connection state
- **Message Timestamps**: See when messages were sent
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Auto-scroll**: Messages automatically scroll to the latest
- **Avatar Support**: Custom avatars or auto-generated ones

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.io
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Deployment**: Vercel-ready

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/arif-4651/realtime-chat-app.git
cd realtime-chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional):
```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Images & Assets

All images and assets are loaded from online sources:
- **Background Images**: Unsplash
- **Avatars**: DiceBear API (auto-generated)
- **Icons**: Lucide React

## 🌐 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Import your repository
4. Vercel will automatically detect Next.js and deploy

### Socket.io Server (Required)
Vercel doesn't support persistent WebSocket connections. You need to deploy the Socket.io server separately.

See [SOCKET_SERVER_DEPLOY.md](./SOCKET_SERVER_DEPLOY.md) for detailed deployment instructions.

**Quick Steps:**
1. Deploy `socket-server.js` on Railway/Render/Fly.io
2. Set `NEXT_PUBLIC_SOCKET_URL` environment variable in Vercel
3. Redeploy your Vercel app

## 📝 Project Structure

```
realtime-chat-app/
├── app/
│   ├── api/
│   │   └── socket/
│   │       └── route.ts      # Socket.io server (placeholder)
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── ChatApp.tsx           # Main chat component
│   ├── ChatBox.tsx           # Message input
│   ├── Header.tsx            # App header
│   ├── LoginModal.tsx        # Login screen
│   ├── MessageList.tsx       # Messages display
│   └── UserList.tsx          # Online users
├── lib/
│   └── socket.ts             # Socket utilities
├── socket-server.js          # Standalone Socket.io server (deploy separately)
└── public/                   # Static assets
```

## 🎯 Features for CV

This project demonstrates:
- ✅ Modern React/Next.js development
- ✅ TypeScript proficiency
- ✅ Real-time WebSocket implementation
- ✅ Responsive UI/UX design
- ✅ State management
- ✅ API integration
- ✅ Deployment on Vercel
- ✅ Clean code architecture

## 📄 License

MIT License - feel free to use this project for your portfolio!
