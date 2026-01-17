const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  const io = new Server(httpServer, {
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

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
