import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym use case', () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
    })

  it('should be able to create gym', async () => {

    const {gym} = await sut.execute({
      title:'JavaScript Gym',
      description:null,
      phone:null,
      latitude:0,
      longitude:0,
      
    })

   expect(gym.id).toEqual(expect.any(String))

  })


})