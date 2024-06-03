/* eslint-disable prettier/prettier */
import { VeryJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserOnly } from '@/http/middlewares/verify-user-only'
import { FastifyInstance } from 'fastify'
import { createGym } from './create'
import { nearbyGym } from './nearby'
import { searchGym } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VeryJWT)

  app.get('/gyms/search',searchGym )
  
  app.get('/gyms/nearby',nearbyGym )

  app.post('/gyms',{onRequest: [verifyUserOnly('ADMIN')]} ,createGym)
}
