import { Category, Prisma } from "@prisma/client";

export interface CategoryRepository {
    findByName(name: string): Promise<Category | null>
    create(data: Prisma.CategoryCreateInput): Promise<Category>
    list(): Promise<Category[] | null>
}