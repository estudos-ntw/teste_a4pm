import { InvalidCredentialsError } from "@/errors/invalid-credencials-error";
import { AuthenticateUseCase } from "@/use-cases/auth/authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/users/register";
import { z } from "zod";


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        login: z.string().email(),
        password: z.string().min(6)
    })

    const { login, password } = authenticateBodySchema.parse(request.body)

    try {
        const prismaUserRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)
        const { user } = await authenticateUseCase.execute({
            login, password
        })
        const token = await reply.jwtSign({ sub: user.id }, {
            sign: {
                expiresIn: '1d',
            }
        })

        return reply.status(200).send({ token })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(409).send({ message: err.message })
        }
        return reply.status(500).send()
    }


}