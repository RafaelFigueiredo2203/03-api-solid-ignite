import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckinsHistoryUseCaseCase } from './fetch-user-check-ins-history'


let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: FetchUserCheckinsHistoryUseCaseCase

describe('Fetch Check In History use case', () => {

  beforeEach(async () => {
  checkInsRepository = new InMemoryCheckInsRepository()
  sut = new FetchUserCheckinsHistoryUseCaseCase(checkInsRepository)
 })
 
  it('should  be able to fetch check in history', async () => {

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

    const {checkIns} = await sut.execute({
      userId:'user-01',
      page:1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id:'gym-01'}),
      expect.objectContaining({gym_id:'gym-02'})
    ])
  

  })

  it('should  be able to fetch paginated check in history', async () => {

    for(let i = 1; i<=22 ; i++){
      await checkInsRepository.create(
        {
          gym_id:`gym-${i}`,
          userId:'user-01'
        }
      )
    }
  
      const {checkIns} = await sut.execute({
        userId:'user-01',
        page:2,
      })
  
      expect(checkIns).toHaveLength(2)
      expect(checkIns).toEqual([
        expect.objectContaining({gym_id:'gym-21'}),
        expect.objectContaining({gym_id:'gym-22'})
      ])
    
  
    })
})