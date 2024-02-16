/* eslint-disable prettier/prettier */



import { GymRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface SearchGymsUseCaseRequest {
  query:string;
  page:number
}

interface SearchGymsUseCaseResponse{
  gyms:Gym[]
}

export class SearchGymsUseCase{
  constructor(private gymsRepository: GymRepository){

  }

  async execute({
    query,
    page
  }: SearchGymsUseCaseRequest):Promise<SearchGymsUseCaseResponse> {
    
  
    const gyms  = await this.gymsRepository.searchManyByTitle(query,page)

    return{
      gyms,
    }
  }
  
}

