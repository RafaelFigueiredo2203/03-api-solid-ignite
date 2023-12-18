import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'


let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {

  beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()
  sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    
    const createdUser = await usersRepository.create({
      name:'Jhon Doe',
      email: 'jhnodoe@email.com',
      password_hash: await hash('123456',6)
    })

    const {user} = await sut.execute({
      userId: createdUser.id
    })

   expect(user.name).toEqual('Jhon Doe')

  })

  it('should not be able to get use rprofile with wrong id', async () => {
  

  await expect(() => sut.execute({
    userId:'non-existing-id'
   })).rejects.toBeInstanceOf(ResourceNotFoundError)

  })

})

