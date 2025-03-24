import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
dotenv.config()
import authRoutes from './route/auth.route.js'
import messageRoutes from './route/message.route.js'
import bodyParser from 'body-parser'
import { app, server } from './lib/socket.js'


const PORT = process.env.PORT
app.use(express.json({ limit: '50mb' })); // For JSON payloads
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For form data payloads

// Increase the request body size limit to 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
server.listen(PORT, () => {
console.log('server is routing on port ' + PORT);
connectDB()
})