const { MongoClient } = require('mongodb')
const express = require('express')
const process = require('process')

const mongoDbUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017'

const dbName = 'docker-network-app'

const collectionName = 'count'

const port = process.env.port || 8085

const app = express()


const start = async () => {
  const client = await MongoClient.connect(mongoDbUrl)
  const db = client.db(dbName)
  const collection = db.collection(collectionName)

  app.get('/', async (req, res) => {
    const count = await collection.count()
    res.json({
      success: true,
      count,
    })
  })

  app.get('/add', async (req, res) => {
    const insertRes = await collection.insertOne({})
    res.json({
      success: true,
      inserted: insertRes.insertedCount
    })
  })

  app.listen(port, '0.0.0.0', () => {
    console.log(`server start in ${port}`)
  })
}

start().catch(err => {
  console.error(err)
  process.exit(1)
})
