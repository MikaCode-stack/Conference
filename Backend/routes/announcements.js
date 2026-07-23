import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { connectDB } from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  const db = await connectDB()
  const announcements = await db.collection('announcements').find().toArray()
  res.json(announcements)
})

router.post('/', async (req, res) => {
  const { variant, message, visible } = req.body
  if (!variant || !message) {
    return res.status(400).json({ error: 'variant and message are required' })
  }

  const db = await connectDB()
  const doc = { variant, message, visible: Boolean(visible) }
  const result = await db.collection('announcements').insertOne(doc)
  res.status(201).json({ _id: result.insertedId, ...doc })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'invalid id' })
  }

  const updates = {}
  for (const field of ['variant', 'message', 'visible']) {
    if (req.body[field] !== undefined) updates[field] = req.body[field]
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'no fields to update' })
  }

  const db = await connectDB()
  const announcement = await db.collection('announcements').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updates },
    { returnDocument: 'after' },
  )
  if (!announcement) {
    return res.status(404).json({ error: 'announcement not found' })
  }
  res.json(announcement)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'invalid id' })
  }

  const db = await connectDB()
  const result = await db.collection('announcements').deleteOne({ _id: new ObjectId(id) })
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'announcement not found' })
  }
  res.status(204).end()
})

export default router
