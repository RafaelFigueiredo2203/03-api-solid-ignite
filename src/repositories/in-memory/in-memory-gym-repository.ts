import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymRepository{
  public items: Gym[] = []

  async findById(id: string){
    const gym = this.items.find(item => item.id === id )
    
    if(!gym){
      return null
    }
  
    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym ={
      id:data.id ?? randomUUID(),
      title:data.title,
      phone:data.phone ?? null,
      description:data.description ?? null,
      latitude:new Prisma.Decimal(data.latitude.toString()),
      longitude:new Prisma.Decimal(data.longitude.toString()),
      created_at:new Date(),
    }

    this.items.push(gym)

    return gym
  }

}