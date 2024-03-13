import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearByGyms } from './fetch-nearby-gyms'




let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGyms

describe('Fetch NearBy Gyms Use case', () => {

  beforeEach(async () => {
  gymsRepository = new InMemoryGymsRepository()
  sut = new FetchNearByGyms(gymsRepository)
 })
 
  it('should  be able to fetch nearby gyms', async () => {

  await gymsRepository.create(
      {
        title:'Near Gym',
        description:null,
        phone:null,
        latitude:-23.546682,
        longitude: -47.187589,

      }
    )

    await gymsRepository.create(
      {
        title:'Far Gym',
        description:null,
        phone:null,
        latitude:-23.5505311,
        longitude:  -47.0888565,
      }
    )

    const {gyms} = await sut.execute({
      userLongitude: -47.187589, 
      userLatitude:-23.546682
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title:'Near Gym'}),
    ])
  

  })})