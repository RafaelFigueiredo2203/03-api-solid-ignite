import { UserAlreadyExistsError } from '@/errors/userAlreadyExists'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'


let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
    })

  it('should be able to register user', async () => {

    const {user} = await sut.execute({
      name:'Jhon Doe',
      email:'jhnodoe@email.com',
      password:'123456',
    })

   expect(user.id).toEqual(expect.any(String))

  })


  it('should hash user password upon registration', async () => {


    const {user} = await sut.execute({
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

   

    const email = 'jhondoe@email.com'

    const {user} = await sut.execute({
      name:'Jhon Doe',
      email,
      password:'123456',
    })

   await expect(() => 
      sut.execute({
        name:'Jhon Doe',
        email,
        password:'123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})