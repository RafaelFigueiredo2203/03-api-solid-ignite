import { UserAlreadyExistsError } from '@/errors/userAlreadyExists'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'


describe('Register use case', () => {

  it('should be able to register user', async () => {
    const usersRepository = new InMemoryUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

    const {user} = await registerUseCase.execute({
      name:'Jhon Doe',
      email:'jhnodoe@email.com',
      password:'123456',
    })

   expect(user.id).toEqual(expect.any(String))

  })


  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

    const {user} = await registerUseCase.execute({
      name:'Jhon Doe',
      email:'jhnodoe@email.com',
      password:'123456',
    })

    const isPasswordCorectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorectlyHashed).toBe(true)

  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'jhondoe@email.com'

    const {user} = await registerUseCase.execute({
      name:'Jhon Doe',
      email,
      password:'123456',
    })

   await expect(() => 
      registerUseCase.execute({
        name:'Jhon Doe',
        email,
        password:'123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})