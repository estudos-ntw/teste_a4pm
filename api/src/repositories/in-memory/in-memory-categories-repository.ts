import { Prisma, Category } from "@prisma/client";
import { CategoryRepository } from "../categories-repository";

export class InMemoryCategoryRepository implements CategoryRepository {
    async list(): Promise<Category[] | null> {
        const categories = [
            {
                id: 1,
                name: 'Bolo e tortas doces'
            },
            {
                id: 2,
                name: 'Carnes'
            },
            {
                id: 3,
                name: 'Aves'
            },
            {
                id: 4,
                name: 'Peixes e frutos do mar'
            },
            {
                id: 5,
                name: 'Saladas, molhos e acompanhamentos'
            },
            {
                id: 6,
                name: 'Sopas'
            },
            {
                id: 7,
                name: 'Massas'
            },
            {
                id: 8,
                name: 'Bebidas'
            },
            {
                id: 9,
                name: 'Doces e sobremesas'
            },
            {
                id: 10,
                name: 'Lanches'
            },
            {
                id: 11,
                name: 'Prato Único'
            },
            {
                id: 12,
                name: 'Light'
            },
            {
                id: 13,
                name: 'Alimentação Saudável'
            },

        ]

        return categories
    }
    public items: Category[] = []
    async findByName(name: string) {
        const category = this.items.find(item => item.name === name)

        if (!category) {
            return null
        }

        return category

    }
    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        const category = {
            id: 1,
            name: data.name,
        }

        this.items.push(category)

        return category


    }

}