import { MaxDistanceError } from "@/errors/max-distance-error";
import { MaxOfNumberCheckinsError } from "@/errors/max-number-of-checkins-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinate";
import { CheckIN } from "@prisma/client";

interface CheckInUseCaseRequest{
  userId:string
  gymId:string
  userLatitude:number
  userLongitude:number
}

interface CheckInUseCaseResponse{
  checkIn: CheckIN
 
}

export class CheckInUseCase{
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository : GymRepository
  ){}

  async execute({userId, gymId,userLatitude,userLongitude}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym){
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude, longitude: userLongitude
      },
      {
        latitude:gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber()
      }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if(distance > MAX_DISTANCE_IN_KILOMETERS){
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if(checkInOnSameDay){
      throw new MaxOfNumberCheckinsError()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id:gymId,
      userId:userId
    })

    return{
      checkIn,
    }
  }
}