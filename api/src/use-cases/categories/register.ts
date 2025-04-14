/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "src/lib/prisma"
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { UsersRepository } from "src/repositories/users-repository"
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error"
import { Category, User } from "@prisma/client"
import { CategoryRepository } from "@/repositories/categories-repository"
import { CategoryAlreadyExistsError } from "@/errors/category-already-exists-error"


interface RegisterCategoryUseCaseRequest {
    name: string
}

interface RegisterCategoryUseCaseResponse {
    category: Category
}

export class RegisterCategoryUseCase {
    constructor(private categoriesRepository: CategoryRepository) { }
    async execute({ name }: RegisterCategoryUseCaseRequest): Promise<RegisterCategoryUseCaseResponse> {

        const categoryExist = await this.categoriesRepository.findByName(name)

        if (categoryExist) {
            throw new CategoryAlreadyExistsError
        }

        const category = await this.categoriesRepository.create({ name })

        return { category }
    }

}

