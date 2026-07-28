import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from '../db.js'

const [, , email, password] = process.argv

if (!email || !password) {
  console.error('Usage: node scripts/seed-admin.js <email> <password>')
  process.exit(1)
}

const db = await connectDB()
const passwordHash = await bcrypt.hash(password, 12)

await db.collection('admins').updateOne({ email }, { $set: { email, passwordHash } }, { upsert: true })

console.log(`Admin account ready for ${email}`)
process.exit(0)
