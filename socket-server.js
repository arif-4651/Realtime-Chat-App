// Standalone Socket.io server for separate deployment
// Deploy this on Railway, Render, or any Node.js hosting service

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
    
    // Broadcast user joined
    socket.broadcast.emit('userJoined', user)
    
    // Send current users list
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
      
      // Update users list
      const userList = Array.from(users.values())
      io.emit('users', userList)
    }
    console.log('User disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`)
})
