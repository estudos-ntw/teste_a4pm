import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "@/use-cases/users/register";
import { z } from "zod";


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        login: z.string().email(),
        password: z.string().min(6)
    })

    const { name, login, password } = registerBodySchema.parse(request.body)
    console.log('REGISTER', name, login, password)

    try {
        const prismaUserRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUserUseCase(prismaUserRepository)
        await registerUseCase.execute({
            name, login, password
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }
        return reply.status(500).send()
    }


    return reply.status(201).send()
}