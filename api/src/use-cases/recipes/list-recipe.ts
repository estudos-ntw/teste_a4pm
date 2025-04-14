/* eslint-disable @typescript-eslint/no-explicit-any */

import { Recipe } from "@prisma/client"
import { RecipeRepository } from "@/repositories/recipes-repository"


interface ListRecipeUseCaseRequest {
    userId: number
}

interface ListRecipeUseCaseResponse {
    recipe: Recipe
}

export class ListRecipeUseCase {
    constructor(private recipeRepository: RecipeRepository) { }
    async execute({ userId }: ListRecipeUseCaseRequest): Promise<ListRecipeUseCaseResponse[]> {

        //@ts-ignore
        const recipe = await this.recipeRepository.list(userId)

        return recipe
    }

}

