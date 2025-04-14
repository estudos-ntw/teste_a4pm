import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";

import { z } from "zod";
import { PrismaRecipesRepository } from "@/repositories/prisma/prisma-recipes-repository";
import { RegisterUseCase } from "@/use-cases/recipes/register";


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(3),

        categoryId: z.number(),
        preparationTime: z.number().default(1),
        portions: z.number().default(1),
        preparationMode: z.string(),
        ingredients: z.string()
    })

    const userId = request.user.sub

    const { name, categoryId, preparationMode, portions, preparationTime, ingredients } = registerBodySchema.parse(request.body)

    try {
        const prismaRecipeRepository = new PrismaRecipesRepository()
        const registerUseCase = new RegisterUseCase(prismaRecipeRepository)
        await registerUseCase.execute({
            name, userId, categoryId, preparationMode, portions, preparationTime, ingredients
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }
        return reply.status(500).send()
    }


    return reply.status(201).send()
}