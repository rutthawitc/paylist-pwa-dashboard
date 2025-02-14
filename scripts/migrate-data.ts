import { PrismaClient } from '@prisma/client'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config()

// ES modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function migrateData() {
  try {
    // Connect to SQLite database
    console.log('Reading data from SQLite...')
    const db = await open({
      filename: path.join(__dirname, '../prisma/dev.db'),
      driver: sqlite3.Database
    })

    // Get data from SQLite
    const payLists = await db.all('SELECT * FROM PayList')
    console.log(`Found ${payLists.length} PayList records`)
    
    const users = await db.all('SELECT * FROM Users')
    console.log(`Found ${users.length} Users records`)
    
    const companies = await db.all('SELECT * FROM Companyname')
    console.log(`Found ${companies.length} Companyname records`)

    // Close SQLite connection
    await db.close()

    // PostgreSQL client
    const prisma = new PrismaClient()
    console.log('Migrating data to PostgreSQL...')

    // Migrate PayList
    for (const payList of payLists) {
      await prisma.payList.create({
        data: {
          ...payList,
          // Convert timestamp to DateTime
          upload_at: new Date(payList.upload_at)
        }
      })
    }
    console.log(`Migrated ${payLists.length} PayList records`)

    // Migrate Users
    for (const user of users) {
      await prisma.users.create({
        data: user
      })
    }
    console.log(`Migrated ${users.length} Users records`)

    // Migrate Companyname
    for (const company of companies) {
      const { created_at, updated_at, ...rest } = company
      await prisma.companyname.create({
        data: {
          ...rest,
          // Convert timestamps to DateTime
          created_at: new Date(created_at),
          updated_at: new Date(updated_at)
        }
      })
    }
    console.log(`Migrated ${companies.length} Companyname records`)

    // Disconnect from PostgreSQL
    await prisma.$disconnect()

  } catch (error) {
    console.error('Migration failed:', error)
  }
}

migrateData()
