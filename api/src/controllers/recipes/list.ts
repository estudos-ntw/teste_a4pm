import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";

import { z } from "zod";
import { PrismaRecipesRepository } from "@/repositories/prisma/prisma-recipes-repository";
import { RegisterUseCase } from "@/use-cases/recipes/register";
import { GetRecipeUseCase } from "@/use-cases/recipes/get-recipe";
import { ListRecipeUseCase } from "@/use-cases/recipes/list-recipe";


export async function list(request: FastifyRequest, reply: FastifyReply) {

    const userId = request.user.sub

    const prismaRecipeRepository = new PrismaRecipesRepository()
    const registerUseCase = new ListRecipeUseCase(prismaRecipeRepository)
    const recipe = await registerUseCase.execute({ userId })

    if (!recipe) {
        return reply.status(200).send()
    }
    return reply.status(200).send(recipe)
}