import { Category, Prisma } from "@prisma/client";
import { prisma } from "src/lib/prisma";

import { CategoryRepository } from "../categories-repository";

export class PrismaCategoriesRepository implements CategoryRepository {
    async list(): Promise<Category[] | null> {
        const categories = await prisma.category.findMany()
        return categories
    }
    async create(data: Prisma.CategoryCreateInput) {
        const category = await prisma.category.create({ data })

        return category
    }

    async findByName(name: string): Promise<Category | null> {
        const category = await prisma.category.findFirst({
            where: { name }
        })
        return category
    }
}