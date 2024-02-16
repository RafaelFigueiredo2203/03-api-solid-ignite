import { CheckIN, Prisma } from "@prisma/client";

export interface CheckInsRepository{
  create(data: Prisma.CheckINUncheckedCreateInput):Promise<CheckIN>
  findByUserIdOnDate(userId:string, date:Date):Promise<CheckIN | null>
  findManyByUserId(userId:String,page:number): Promise <CheckIN[]>
  countByUserId(userId : string):Promise<number>
}