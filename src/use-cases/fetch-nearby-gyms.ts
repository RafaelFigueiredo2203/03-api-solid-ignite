/* eslint-disable prettier/prettier */



import { GymRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface FetchNearByGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymsResponse{
  gyms:Gym[]
}

export class FetchNearByGyms{
  constructor(private gymsRepository: GymRepository){

  }

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearByGymsRequest):Promise<FetchNearByGymsResponse> {
    
  
    const gyms  = await this.gymsRepository.findManyNearBy({
      latitude:userLatitude,
      longitude:userLongitude
    })

    return{
      gyms,
    }
  }
  
}

