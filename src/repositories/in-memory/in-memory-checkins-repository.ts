import { CheckIN, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { CheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository{
 
 
  public items: CheckIN[] = []

  async findByUserIdOnDate(userId: string, date: Date){
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDate = this.items.find((checkIn) => {
      const chekinDate = dayjs(checkIn.created_at)
      const isOnSameDate = chekinDate.isAfter(startOfTheDay) && chekinDate.isBefore(endOfTheDay)

      return  checkIn.userId === userId && isOnSameDate
    })

    if(!checkOnSameDate){
      return null
    }

    return checkOnSameDate
  }

  async findManyByUserId(userId: String, page:number){
    return this.items.filter(item => item.userId === userId)
    .slice((page - 1) * 20, page * 20)
    
  }

  async countByUserId(userId: String){
    return this.items.filter((item) => item.userId === userId).length
    
  }

  async create(data: Prisma.CheckINUncheckedCreateInput) {
    const checkIn ={
      id:randomUUID(),
      userId: data.userId,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at:new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}