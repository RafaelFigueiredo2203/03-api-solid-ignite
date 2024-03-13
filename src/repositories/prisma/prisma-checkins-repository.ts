import { prisma } from "@/lib/prisma";
import { CheckIN, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { CheckInsRepository } from "../check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository{
  async create(data: Prisma.CheckINUncheckedCreateInput) {
    const checkIn =await prisma.checkIN.create({
      data,
    })

    return checkIn
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIN.findFirst({
      where:{
        userId:userId,
        created_at:{
          gte:startOfTheDay.toDate(),
          lte:endOfTheDay.toDate()
        }
      }
    }
    )

    return checkIn
  }
  async findManyByUserId(userId: string, page: number){
    const checkIns = await prisma.checkIN.findMany({
      where:{
        userId:userId,
      },
      take:20,
      skip:(page -1) * 20,
    })

    return checkIns
  }
  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIN.count({
      where: {
        userId: userId,
      }
    })

    return count
  }
  async findbyId(id: string) {
    const chekIn = await prisma.checkIN.findUnique({
      where:{
        id,
      }
    })
    return chekIn
  }
  async save(checkInId: CheckIN) {
    const checkIn = await prisma.checkIN.update({
      where:{
        id: checkInId.id,
      },
      data: checkInId
    })

    return checkIn
  }

}