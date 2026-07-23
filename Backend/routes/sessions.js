import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { connectDB } from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  const db = await connectDB()
  const sessions = await db.collection('sessions').find().sort({ time: 1 }).toArray()
  res.json(sessions)
})

router.post('/', async (req, res) => {
  const { time, title, speaker, location, tag } = req.body
  if (!time || !title) {
    return res.status(400).json({ error: 'time and title are required' })
  }

  const db = await connectDB()
  const doc = { time, title, speaker, location, tag }
  const result = await db.collection('sessions').insertOne(doc)
  res.status(201).json({ _id: result.insertedId, ...doc })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'invalid id' })
  }

  const updates = {}
  for (const field of ['time', 'title', 'speaker', 'location', 'tag']) {
    if (req.body[field] !== undefined) updates[field] = req.body[field]
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'no fields to update' })
  }

  const db = await connectDB()
  const session = await db.collection('sessions').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updates },
    { returnDocument: 'after' },
  )
  if (!session) {
    return res.status(404).json({ error: 'session not found' })
  }
  res.json(session)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'invalid id' })
  }

  const db = await connectDB()
  const result = await db.collection('sessions').deleteOne({ _id: new ObjectId(id) })
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'session not found' })
  }
  res.status(204).end()
})

export default router
