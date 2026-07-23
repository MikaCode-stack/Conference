import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './db.js'
import sessionsRouter from './routes/sessions.js'
import announcementsRouter from './routes/announcements.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/sessions', sessionsRouter)
app.use('/api/announcements', announcementsRouter)

// Serve the built Vue app
const frontDist = path.resolve(__dirname, '..', 'Front', 'dist')
app.use(express.static(frontDist))
app.get('*', (req, res) => {
  res.sendFile(path.join(frontDist, 'index.html'))
})

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message)
    process.exit(1)
  })   
