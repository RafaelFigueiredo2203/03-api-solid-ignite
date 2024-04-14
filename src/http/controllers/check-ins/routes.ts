/* eslint-disable prettier/prettier */
import { VeryJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createGym } from '../gyms/create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VeryJWT)

  app.get('/check-ins/history',history)

  app.get('/check-ins/metrics',metrics)

  app.post('/gyms/:gymId/check-ins',createGym)

  app.patch('/check-ins/:checkInId/validate', validate)
}
