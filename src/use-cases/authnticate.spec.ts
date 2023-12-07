import { InvalidCredentialError } from '@/errors/invalidCredentialsError'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'


describe('Register use case', () => {

  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()

    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

   expect(() => sut.execute({
    email:'jhnodoe@email.com',
    password:'123456',
   })).rejects.toBeInstanceOf(InvalidCredentialError)

  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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

