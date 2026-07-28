import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import sessionsRouter from './routes/sessions.js'
import announcementsRouter from './routes/announcements.js'
import authRouter from './routes/auth.js'

const app = express()
const PORT = process.env.PORT || 3000

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').filter(Boolean)
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/announcements', announcementsRouter)

connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message)
})

// Vercel imports this file as a serverless function and calls the exported
// app directly, so only bind a port when running locally.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

export default app
