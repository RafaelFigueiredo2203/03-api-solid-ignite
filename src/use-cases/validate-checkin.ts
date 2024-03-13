import { LateCheckInValidationError } from "@/errors/late-checkin-validation-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIN } from "@prisma/client";
import dayjs from "dayjs";

interface ValidateCheckInUseCaseRequest{
  checkInId: string
}

interface ValidateCheckInUseCaseResponse{
  checkIn: CheckIN
 
}

export class ValidateCheckInUseCase{
  constructor(
    private checkInsRepository: CheckInsRepository,
  ){}

  async execute({checkInId}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findbyId(checkInId)

    if(!checkIn){
      throw new ResourceNotFoundError()
    }
    const distanceMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    )

    if(distanceMinutesFromCheckInCreation > 20){
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return{
      checkIn,
    }
  }
}