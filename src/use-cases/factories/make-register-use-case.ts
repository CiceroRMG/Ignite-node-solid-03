import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

// o factory pattern é para separar num arquivo a parte repetitiva que era usada no controller para chamar o caso de uso
// assim também caso o useCase seja usado em outros controllers seria mais facil de dar manutenção caso mudasse alguma coisa

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
