import { Prisma, Recipe } from "@prisma/client";

export interface RecipeRepository {
    create(data: Prisma.RecipeCreateInput): Promise<Recipe>
    get(id: number): Promise<Recipe | null>
    list(userId: number): Promise<Recipe[] | null>
}