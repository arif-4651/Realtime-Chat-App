# Socket.io Server Deployment Guide

Vercel doesn't support persistent WebSocket connections, so you need to deploy the Socket.io server separately.

## Option 1: Deploy on Railway (Recommended - Free Tier Available)

### Steps:

1. **Create a new repository for Socket.io server:**
   - Go to https://github.com/new
   - Repository name: `realtime-chat-socket-server`
   - Make it public or private
   - Click "Create repository"

2. **Upload socket server files:**
   ```bash
   # Create a new folder
   mkdir socket-server
   cd socket-server
   
   # Copy these files from your main project:
   # - socket-server.js
   # - socket-server-package.json (rename to package.json)
   ```

3. **Initialize git and push:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Socket.io server"
   git branch -M main
   git remote add origin https://github.com/arif-4651/realtime-chat-socket-server.git
   git push -u origin main
   ```

4. **Deploy on Railway:**
   - Go to https://railway.app
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `realtime-chat-socket-server`
   - Railway will auto-detect and deploy
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

5. **Update Vercel Environment Variable:**
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add: `NEXT_PUBLIC_SOCKET_URL` = `https://your-app.railway.app`
   - Redeploy your Vercel app

## Option 2: Deploy on Render (Free Tier Available)

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Settings:
   - Build Command: (leave empty)
   - Start Command: `node socket-server.js`
   - Environment: Node
6. Add environment variable: `PORT` = `10000` (or leave default)
7. Deploy and copy the URL
8. Update Vercel environment variable as above

## Option 3: Deploy on Fly.io (Free Tier Available)

1. Install Fly CLI: https://fly.io/docs/getting-started/installing-flyctl/
2. Run: `fly launch`
3. Follow the prompts
4. Deploy: `fly deploy`
5. Get URL and update Vercel

## Quick Test

After deployment, test the Socket.io server:
- Visit: `https://your-socket-server-url.com`
- You should see a connection or Socket.io handshake

## Troubleshooting

- **CORS errors**: Make sure `origin: '*'` is set in socket-server.js
- **Connection refused**: Check if the server is running and URL is correct
- **Environment variable not working**: Make sure to redeploy Vercel after adding the variable
