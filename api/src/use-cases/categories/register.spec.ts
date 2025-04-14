import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { expect, test, describe, it, beforeEach } from "vitest"
import { RegisterCategoryUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error"
import { number } from "zod"
import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-categories-repository"
import { CategoryAlreadyExistsError } from "@/errors/category-already-exists-error"

let categoriesRepository: InMemoryCategoryRepository
let registerUseCase: RegisterCategoryUseCase

describe('Register Category Use Case', () => {
    beforeEach(() => {
        categoriesRepository = new InMemoryCategoryRepository()
        registerUseCase = new RegisterCategoryUseCase(categoriesRepository)
    })
    it('should be able registration', async () => {

        const { category } = await registerUseCase.execute({
            name: 'Lanche Rápido'
        })
        expect(category.id).toEqual(expect.any(Number))
    })
    it('should not be able to register with same category twice', async () => {
        const name = 'Lanche Rápido'

        const { category } = await registerUseCase.execute({
            name,
        })

        await expect(() =>
            registerUseCase.execute({
                name: 'Lanche Rápido'
            }),
        ).rejects.toBeInstanceOf(CategoryAlreadyExistsError)

    })
})