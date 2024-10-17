import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import bcrypt from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

// SOLID

// D - Dependency Inversion Principle
// Basicamente inverte a dependecia que existia na função UseCase para o arquivo que esta utilizando a useCase;
// Ao invés da função ser dependente de chamar o prisma, vamos fazer o inverso, criar uma forma de receber uma dependecia externa.
// Resumindo: o arquivo que precisar desse caso de uso que vai passar as dependecias, e não mais o caso de uso que vai ter essa dependecia.
// Perceba que o código não possui nenhuma referencia ao Prisma

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 4)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
