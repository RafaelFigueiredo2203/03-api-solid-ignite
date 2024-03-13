/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { register } from './controllers/register'
import { VeryJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions',authenticate)

  app.get('/me', {onRequest: [VeryJWT]},profile)
}
