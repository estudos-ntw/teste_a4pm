import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { z } from "zod";
import { ProfileUserUseCase } from "@/use-cases/users/profile";


export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user

    console.log('SUB', sub)
    try {
        const prismaUserRepository = new PrismaUsersRepository()
        const registerUseCase = new ProfileUserUseCase(prismaUserRepository)
        const { id, name, login } = await registerUseCase.execute({ id: sub })

        return reply.status(200).send({ id, name, login })

    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }
        return reply.status(500).send()
    }



}