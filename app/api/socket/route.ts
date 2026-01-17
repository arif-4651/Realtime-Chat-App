// This file is kept for reference but Socket.io server runs via server.js
// For Vercel deployment, consider using a separate Socket.io server or a service like Pusher

export async function GET() {
  return new Response('Socket.IO server is running via custom server', { status: 200 })
}
