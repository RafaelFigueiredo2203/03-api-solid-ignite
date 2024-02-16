import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'


let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics use case', () => {

  beforeEach(async () => {
  checkInsRepository = new InMemoryCheckInsRepository()
  sut = new GetUserMetricsUseCase(checkInsRepository)
 })
 
  it('should  be able to get checkins count from metrics', async () => {

  await checkInsRepository.create(
      {
        gym_id:'gym-01',
        userId:'user-01'
      }
    )

    await checkInsRepository.create(
      {
        gym_id:'gym-02',
        userId:'user-01'
      }
    )

    const {checkInsCount} = await sut.execute({
      userId:'user-01',
    })

    
    expect(checkInsCount).toEqual(2)
  

  })
})