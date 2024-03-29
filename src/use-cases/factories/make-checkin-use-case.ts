import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../checkin"

export function makeCheckinUseCase(){
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository,gymsRepository)

  return useCase
}