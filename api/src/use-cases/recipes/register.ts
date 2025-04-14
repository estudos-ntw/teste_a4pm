/* eslint-disable @typescript-eslint/no-explicit-any */

import { Recipe } from "@prisma/client"
import { RecipeRepository } from "@/repositories/recipes-repository"


interface RegisterRecipeUseCaseRequest {
    name: string,
    categoryId: number,
    userId: number,
    preparationTime: number,
    portions: number,
    preparationMode: string,
    ingredients: string
}

interface RegisterRecipeUseCaseResponse {
    recipe: Recipe
}

export class RegisterUseCase {
    constructor(private recipeRepository: RecipeRepository) { }
    async execute({ name, categoryId, userId, preparationMode, portions, preparationTime, ingredients }: RegisterRecipeUseCaseRequest): Promise<RegisterRecipeUseCaseResponse> {

        //@ts-ignore
        const recipe = await this.recipeRepository.create({ name, categoryId, userId, preparationMode, portions, preparationTime, ingredients })

        return { recipe }
    }

}

