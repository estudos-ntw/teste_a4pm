import { Prisma, Recipe, User } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import { RecipeRepository } from "../recipes-repository";

export class PrismaRecipesRepository implements RecipeRepository {
    async get(id: number): Promise<Recipe | null> {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: id
            }
        })

        if (!recipe) {
            return null
        }
        return recipe
    }
    async list(userId: number): Promise<Recipe[] | null> {
        const recipes = await prisma.recipe.findMany({
            include: {
                category: true,
            },
            where: {
                userId
            }
        })

        return recipes
    }
    async create(data: Prisma.RecipeCreateInput) {
        const recipe = await prisma.recipe.create({ data })

        return recipe
    }

}