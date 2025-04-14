/* eslint-disable @typescript-eslint/no-explicit-any */

import { Recipe } from "@prisma/client"
import { RecipeRepository } from "@/repositories/recipes-repository"


interface GetRecipeUseCaseRequest {
    id: number
}

interface GetRecipeUseCaseResponse {
    recipe: Recipe
}

export class GetRecipeUseCase {
    constructor(private recipeRepository: RecipeRepository) { }
    async execute({ id }: GetRecipeUseCaseRequest): Promise<GetRecipeUseCaseResponse> {

        //@ts-ignore
        const recipe = await this.recipeRepository.get(id)



        return recipe
    }

}

