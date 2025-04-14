import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { expect, test, describe, it, beforeEach } from "vitest"
import { RegisterUserUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error"
import { number } from "zod"

let usersRepository: InMemoryUserRepository
let registerUseCase: RegisterUserUseCase

describe('Register User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository()
        registerUseCase = new RegisterUserUseCase(usersRepository)
    })
    it('should be able registration', async () => {

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            login: 'jonhdoe@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(Number))
    })
    it('should hash user password upon registration', async () => {
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            login: 'jonhdoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
    it('should not be able to register with same email twice', async () => {
        const login = 'jonhdoe@example.com'

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            login,
            password: '123456'
        })

        await expect(() =>
            registerUseCase.execute({
                name: 'John Doe',
                login,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})