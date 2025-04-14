/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "src/lib/prisma"
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { UsersRepository } from "src/repositories/users-repository"
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error"
import { Category, User } from "@prisma/client"
import { CategoryRepository } from "@/repositories/categories-repository"
import { CategoryAlreadyExistsError } from "@/errors/category-already-exists-error"

export class ListCategoryUseCase {
    constructor(private categoriesRepository: CategoryRepository) { }
    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list()

        return { categories }
    }

}

