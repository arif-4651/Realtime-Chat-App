# Quick Start Guide 🚀

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Run Development Server

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

## Step 3: Test the Application

1. Open http://localhost:3000 in your browser
2. Enter your name (avatar will be auto-generated)
3. Open another browser tab/window
4. Enter a different name
5. Start chatting in real-time! 💬

## Step 4: Deploy to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Real-time chat app"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"New Project"**
4. Import your repository
5. Click **"Deploy"**
6. Wait for deployment (2-3 minutes)
7. Your app is live! 🎉

## Important Notes

### For Local Development
- The Socket.io server runs on the same port (3000) via `server.js`
- No additional configuration needed

### For Vercel Deployment
- Vercel serverless functions have WebSocket limitations
- **Option A**: Use a separate Socket.io server (Railway, Render, etc.)
- **Option B**: Use a service like Pusher or Ably
- See `DEPLOYMENT.md` for detailed instructions

## Project Features

✅ Real-time messaging  
✅ Online users list  
✅ Beautiful modern UI  
✅ Responsive design  
✅ Auto-generated avatars  
✅ Connection status  
✅ Message timestamps  

## Tech Stack

- Next.js 14
- TypeScript
- Socket.io
- Tailwind CSS
- Lucide Icons

## Need Help?

Check these files:
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guide
- `ASSETS.md` - Image sources

Happy coding! 🎨
