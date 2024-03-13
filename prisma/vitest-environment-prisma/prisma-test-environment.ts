import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
//postgresql://docker:docker@localhost:5432/ignitenode03?schema=public

function generateDatabaseURL(schema:string){
  if (!process.env.DATABASE_URL){
    throw new Error('Please provide a DATABASE_URL environment variable ')
    
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name:'prisma',
  transformMode: 'ssr',
  async setup() {
      const schema = randomUUID()
      const databaseURL = generateDatabaseURL(schema)

      execSync('npx prisma migrate deploy')
      return{
      async  teardown() {
          console.log('teradown')
        },
      }
  },
}