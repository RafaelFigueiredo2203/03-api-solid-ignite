import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'


describe('Register use case', () => {
  it('should hash user password upon registration', async () => {

    const registerUseCase = new RegisterUseCase({
        async findByEmail(email) {
            return null
        },

        async create(data) {
            return{
              id:'user-1',
              name:data.name,
              email:data.email,
              password_hash:data.password_hash,
              created_at:new Date(),
            }
        },
    })

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
})