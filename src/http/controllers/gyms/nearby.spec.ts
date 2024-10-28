import { app } from '@/app'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description.',
        phone: '4898806453',
        latitude: -27.5920963,
        longitude: -48.5163816,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Some description.',
        phone: '4898806453',
        latitude: -27.4389366,
        longitude: -48.4624162,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.5920963,
        longitude: -48.5163816,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym',
      }),
    ])
  })
})
