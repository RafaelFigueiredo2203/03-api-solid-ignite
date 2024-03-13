import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository"
import { ValidateCheckInUseCase } from "../validate-checkin"

export function makeValidateCheckinUseCase(){
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}