import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const checkInValidateParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = checkInValidateParamsSchema.parse(request.params)

  const createCheckInUseCase = makeValidateCheckInUseCase()

  await createCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
