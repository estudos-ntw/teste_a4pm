import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";

import { z } from "zod";
import { PrismaRecipesRepository } from "@/repositories/prisma/prisma-recipes-repository";
import { RegisterUseCase } from "@/use-cases/recipes/register";
import { GetRecipeUseCase } from "@/use-cases/recipes/get-recipe";


export async function show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params
    const recipeId = parseInt(id)
    console.log('TYPE', typeof (recipeId))

    const prismaRecipeRepository = new PrismaRecipesRepository()
    const registerUseCase = new GetRecipeUseCase(prismaRecipeRepository)
    const recipe = await registerUseCase.execute({ id: recipeId })

    if (!recipe) {
        return reply.status(200).send()
    }
    return reply.status(200).send(recipe)
}