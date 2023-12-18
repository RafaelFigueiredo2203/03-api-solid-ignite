import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIN } from "@prisma/client";

interface FetchUserCheckinsHistoryUseCaseCaseRequest{
  userId:string
  page:number
}

interface FetchUserCheckinsHistoryUseCaseCaseResponse{
  checkIns: CheckIN[]
 
}

export class FetchUserCheckinsHistoryUseCaseCase{
  constructor(
    private checkInsRepository: CheckInsRepository,
  ){}

  async execute({userId ,page}: FetchUserCheckinsHistoryUseCaseCaseRequest): Promise<FetchUserCheckinsHistoryUseCaseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId,page)
    
    return{
      checkIns,
    }
  }
}