import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Sasuke Uchira',
      email: 'sasuke@example.com',
      password_hash: await hash('123456', 4),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'sasuke@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
