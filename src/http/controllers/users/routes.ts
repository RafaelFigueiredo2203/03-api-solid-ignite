/* eslint-disable prettier/prettier */
import { VeryJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions',authenticate)

  app.get('/me', {onRequest: [VeryJWT]},profile)

  app.patch('/token/refresh',refresh)
}
