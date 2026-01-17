# Deployment Guide

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Vercel Deployment Options

### Option 1: Deploy with Separate Socket.io Server (Recommended)

Since Vercel serverless functions have limitations with WebSocket connections, you have two options:

#### A. Use a Socket.io Hosting Service
- **Pusher**: https://pusher.com (Free tier available)
- **Ably**: https://ably.com (Free tier available)
- **Socket.io Cloud**: https://www.socket.io/cloud

#### B. Deploy Socket.io Server Separately
1. Create a separate Node.js server for Socket.io
2. Deploy it on:
   - **Railway**: https://railway.app (Free tier)
   - **Render**: https://render.com (Free tier)
   - **Heroku**: https://heroku.com
   - **DigitalOcean App Platform**

3. Update `NEXT_PUBLIC_SOCKET_URL` in Vercel environment variables

### Option 2: Use Vercel with API Routes (Limited)

For a simple demo, you can modify the app to work without persistent WebSocket connections, but real-time features will be limited.

## Step-by-Step Vercel Deployment

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Environment Variables** (if using separate Socket.io server):
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_SOCKET_URL` = `https://your-socket-server.com`

4. **Redeploy** after adding environment variables

## Alternative: Full-Stack Deployment on Railway

Railway supports both Next.js and Socket.io in one project:

1. Create account at https://railway.app
2. New Project → Deploy from GitHub
3. Select your repository
4. Railway will detect and deploy both Next.js and Socket.io server
5. Your app will be live!

## Quick Socket.io Server for Separate Deployment

Create a file `socket-server.js`:

```javascript
const { Server } = require('socket.io')
const http = require('http')

const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const users = new Map()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join', (user) => {
    socket.data.user = user
    users.set(socket.id, user)
    socket.broadcast.emit('userJoined', user)
    const userList = Array.from(users.values())
    socket.emit('users', userList)
    socket.broadcast.emit('users', userList)
  })

  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    const user = users.get(socket.id)
    if (user) {
      users.delete(socket.id)
      socket.broadcast.emit('userLeft', user.id)
      const userList = Array.from(users.values())
      io.emit('users', userList)
    }
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`)
})
```

Deploy this separately and update the client URL.
