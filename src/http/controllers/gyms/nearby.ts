import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearbyGym(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude  } = nearbyGymQuerySchema.parse(request.body)

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

   const {gyms} = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    })
  
  
  return reply.status(201).send({
    gyms
  })
}
