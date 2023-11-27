/* eslint-disable prettier/prettier */



import { UserAlreadyExistsError } from '@/errors/userAlreadyExists'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse{
  user:User
}

export class RegisterUseCase{
  constructor(private usersRepository: UsersRepository){

  }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseProps):Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
 
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
  

  
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return{
      user,
    }
  }
  
}

