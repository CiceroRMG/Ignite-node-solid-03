import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

// sut -> system under test (é um pattern para dizer a variável principal dentro de um teste, evitando erros de nome)

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const newUser = await usersRepository.create({
      name: 'User Test',
      email: 'usertest@test.com',
      password_hash: await hash('123456', 4),
    })

    const { user } = await sut.execute({
      userId: newUser.id,
    })

    expect(user.name).toEqual('User Test')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(async () => {
      await sut.execute({
        userId: 'non-existing-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
