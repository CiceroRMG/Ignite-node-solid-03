import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

// o motivo para essa pasta existir é que qualquer comunicação com o banco vai ficar aqui
// isso facilita a troca de um ORM, ou tecnologia por outra.
// se caso eu não quiser mais usar o prisma eu só preciso mudar esse arquivos

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
