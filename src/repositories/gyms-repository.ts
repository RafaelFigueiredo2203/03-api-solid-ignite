import { Gym, Prisma } from "@prisma/client";


export interface GymRepository{
  findById(id:string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput):Promise<Gym>
  searchManyByTitle(query:string, page:number):Promise<Gym[]>
}