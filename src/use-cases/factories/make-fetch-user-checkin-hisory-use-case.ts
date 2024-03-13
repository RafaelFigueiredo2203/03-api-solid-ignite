import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository"
import { FetchUserCheckinsHistoryUseCaseCase } from "../fetch-user-check-ins-history"

export function makeFetchUserCheckinHisoryUseCase(){
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckinsHistoryUseCaseCase(checkInsRepository)

  return useCase
}