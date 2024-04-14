import { makeFetchUserCheckinHisoryUseCase } from '@/use-cases/factories/make-fetch-user-checkin-hisory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page:z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

    const fetchUserCheckinHisoryUseCase = makeFetchUserCheckinHisoryUseCase()

   const {checkIns} = await fetchUserCheckinHisoryUseCase.execute({
      userId: request.user.sub,
      page,
    })
  
  
  return reply.status(201).send({
    checkIns
  })
}
