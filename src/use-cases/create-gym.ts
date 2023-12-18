/* eslint-disable prettier/prettier */



import { GymRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title:string
  description?:string | null
  phone?: string | null
  longitude: number
  latitude: number
}

interface CreateGymUseCaseResponse{
  gym:Gym
}

export class CreateGymUseCase{
  constructor(private gymsRepository: GymRepository){

  }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude
  }: CreateGymUseCaseRequest):Promise<CreateGymUseCaseResponse> {
    
  
    const gym  = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return{
      gym,
    }
  }
  
}

