import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearByGyms } from "../fetch-nearby-gyms"

export function makeFetchNearbyGymsUseCase(){
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGyms(gymsRepository)

  return useCase
}