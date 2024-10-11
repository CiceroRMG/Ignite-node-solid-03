import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// SOLID

// D - Dependency Inversion Principle
// Basicamente inverte a dependecia que existia na função UseCase para o arquivo que esta utilizando a useCase;
// Ao invés da função ser dependente de chamar o prisma, vamos fazer o inverso, criar uma forma de receber uma dependecia externa.
// Resumindo: o arquivo que precisar desse caso de uso que vai passar as dependecias, e não mais o caso de uso que vai ter essa dependecia.
// Perceba que o código não possui nenhuma referencia ao Prisma

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 4)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already existis.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
