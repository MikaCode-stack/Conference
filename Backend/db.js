import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'

const client = new MongoClient(process.env.DB_PATH, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

let db

export async function connectDB() {
  if (db) return db

  await client.connect()
  await client.db('admin').command({ ping: 1 })
  console.log('Connected to MongoDB')

  db = client.db(process.env.DB_NAME || 'conference')
  return db
}

export { ObjectId }
