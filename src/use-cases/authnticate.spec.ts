import { InvalidCredentialError } from '@/errors/invalidCredentialsError'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'


let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Register use case', () => {

  beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()
  sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    
    await usersRepository.create({
      name:'Jhon Doe',
      email: 'jhnodoe@email.com',
      password_hash: await hash('123456',6)
    })

    const {user} = await sut.execute({
      email:'jhnodoe@email.com',
      password:'123456',
    })

   expect(user.id).toEqual(expect.any(String))

  })

  it('should not be able to authenticate with wrong email', async () => {
  

   expect(() => sut.execute({
    email:'jhnodoe@email.com',
    password:'123456',
   })).rejects.toBeInstanceOf(InvalidCredentialError)

  })

  it('should not be able to authenticate with wrong password', async () => {
    

    await usersRepository.create({
      name:'Jhon Doe',
      email: 'jhnodoe@email.com',
      password_hash: await hash('123456',6)
    })

   expect(() => sut.execute({
    email:'jhnodoe@email.com',
    password:'123123',
   })).rejects.toBeInstanceOf(InvalidCredentialError)

  })
})

