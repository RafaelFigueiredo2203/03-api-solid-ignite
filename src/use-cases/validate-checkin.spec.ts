import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInUseCase } from './validate-checkin'


let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check In use case', () => {

  beforeEach(async () => {
  checkInsRepository = new InMemoryCheckInsRepository()
  sut = new ValidateCheckInUseCase(checkInsRepository)


  vi.useFakeTimers()
  })


  afterEach(() =>{
    vi.useRealTimers()
  })

  it('it should be able to validate the checkin', async () => {

    const createCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      userId: 'user-01',
    })

    const {checkIn} = await sut.execute({
      checkInId: createCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  

  })

  it('it should not be able to validate an inexistent checkin', async () => {

    expect(() => 
    sut.execute({
      checkInId: 'inexistend-checkinId'
    }),).rejects.toBeInstanceOf(ResourceNotFoundError)
   
  

  })

  it('should not be able to validate the checkin after 20 minutes of its creation', async () => {

  vi.setSystemTime(new Date(2023,0 , 1,13,40))

  const createCheckIn = await checkInsRepository.create({
    gym_id: 'gym-01',
    userId: 'user-01',
  })

  const twentyOneMinutesInSeconds = 1000 * 60 * 21

  vi.advanceTimersByTime(twentyOneMinutesInSeconds)

  await expect(()=> 
    sut.execute({
      checkInId: createCheckIn.id,
    }),
  ).rejects.toBeInstanceOf(Error)

  })


})