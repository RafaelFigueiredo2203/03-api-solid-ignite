import { PrismaUsersRepostory } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileUseCase } from "../get-user-profile"

export function makeGetUserProfileUseCase(){
  const usersRepository = new PrismaUsersRepostory()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}