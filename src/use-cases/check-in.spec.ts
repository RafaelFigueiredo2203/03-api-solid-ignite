import { MaxDistanceError } from '@/errors/max-distance-error'
import { MaxOfNumberCheckinsError } from '@/errors/max-number-of-checkins-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './checkin'


let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In use case', () => {

  beforeEach(async () => {
  checkInsRepository = new InMemoryCheckInsRepository()
  gymsRepository =  new InMemoryGymsRepository()
  sut = new CheckInUseCase(checkInsRepository, gymsRepository)

  await gymsRepository.create({
    id:'gym-01',
    title: 'JavaScript Gym',
    description:'',
    latitude:0,
    longitude:0,
    phone:''
  })

  vi.useFakeTimers()
  })

 


  afterEach(() =>{
    vi.useRealTimers()
  })

  it('should not be able to check in', async () => {

     gymsRepository.items.push({
      id:'gym-01',
      title: 'JavaScript Gym',
      description:'',
      latitude:new Decimal(0),
      longitude:new Decimal(0),
      phone:''
    })

    const {checkIn} = await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLongitude:0,
      userLatitude:0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  

  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022,0,20,8,0,0))

    await  sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLongitude:0,
      userLatitude:0
    })

    await expect(() => sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLongitude:0,
      userLatitude:0
    })).rejects.toBeInstanceOf(MaxOfNumberCheckinsError)
  

  })

  it('should not be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022,0,20,8,0,0))

    await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLongitude:0,
      userLatitude:0
    })
   
    vi.setSystemTime(new Date(2022,0,21,8,0,0))

    const {checkIn} = await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLongitude:0,
      userLatitude:0
    })
   
  expect(checkIn.id).toEqual(expect.any(String))

  })

  it('should not be able to check in on distant gym', async () => {
 
    gymsRepository.items.push({
      id:'gym-01',
      title: 'JavaScript Gym',
      description:'',
      latitude:new Decimal(0),
      longitude:new Decimal(0),
      phone:''
    })

    await expect(() => sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLongitude:1,
      userLatitude:1
    })
    ,).rejects.toBeInstanceOf(MaxDistanceError)
})

})