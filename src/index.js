import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
dotenv.config()
import authRoutes from './route/auth.route.js' 
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(PORT, () => {
console.log('server is routing on port ' + PORT);
connectDB()
})