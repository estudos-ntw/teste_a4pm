import { User, Prisma, Recipe } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { RecipeRepository } from "../recipes-repository";

export class InMemoryRecipeRepository implements RecipeRepository {
    public items = [
        {
            id: 1,
            categoryId: 8,
            name: 'Receita 1',
            preparationTime: 30,
            portions: 1,
            ingredients: 'Arros',
            preparationMode: 'Modo Preparo',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            categoryId: 7,
            name: 'Receita 2',
            preparationTime: 30,
            portions: 1,
            ingredients: 'Arros',
            preparationMode: 'Modo Preparo',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            categoryId: 6,
            name: 'Receita 3',
            preparationTime: 30,
            portions: 1,
            ingredients: 'Arros',
            preparationMode: 'Modo Preparo',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 4,
            categoryId: 2,
            name: 'Receita 4',
            preparationTime: 30,
            portions: 1,
            ingredients: 'Arros',
            preparationMode: 'Modo Preparo',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ] as Recipe[]
    async get(id: number): Promise<Recipe | null> {
        const recipe = this.items.find(item => item.id === id)

        if (!recipe) {
            return null
        }

        return recipe
    }
    async list(): Promise<Recipe[] | null> {
        return this.items
    }

    async create(data: Prisma.RecipeCreateInput): Promise<Recipe> {
        const recipe = {
            id: 1,
            name: data.name,
            userId: 1,
            categoryId: 1,
            preparationTime: data.preparationTime,
            portions: data.portions,
            preparationMode: data.preparationMode,
            ingredients: data.ingredients,
            createdAt: new Date(),
            updatedAt: null
        }

        this.items.push(recipe)

        return recipe


    }

}