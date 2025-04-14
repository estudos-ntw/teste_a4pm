import { CategoryAlreadyExistsError } from "@/errors/category-already-exists-error";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { ListCategoryUseCase } from "@/use-cases/categories/list";
import { FastifyReply, FastifyRequest } from "fastify";

export async function list(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaCategoryRepository = new PrismaCategoriesRepository()
        const registerUseCase = new ListCategoryUseCase(prismaCategoryRepository)
        const { categories } = await registerUseCase.execute()
        return reply.status(200).send(categories)
    } catch (err) {
        if (err instanceof CategoryAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }
        return reply.status(500).send()
    }



}