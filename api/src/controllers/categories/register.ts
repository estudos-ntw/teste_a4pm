import { CategoryAlreadyExistsError } from "@/errors/category-already-exists-error";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { RegisterCategoryUseCase } from "@/use-cases/categories/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
    })

    const { name } = registerBodySchema.parse(request.body)

    try {
        const prismaCategoryRepository = new PrismaCategoriesRepository()
        const registerUseCase = new RegisterCategoryUseCase(prismaCategoryRepository)
        await registerUseCase.execute({
            name
        })
    } catch (err) {
        if (err instanceof CategoryAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }
        return reply.status(500).send()
    }


    return reply.status(201).send()
}