import { expect, test, describe, it, beforeEach } from "vitest"
import { compare, hash } from "bcryptjs"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "@/errors/invalid-credencials-error"

let usersRepository: InMemoryUserRepository
let authenticateUseCase: AuthenticateUseCase
describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository()
        authenticateUseCase = new AuthenticateUseCase(usersRepository)
    })
    it('should be able authenticate', async () => {


        await usersRepository.create({
            name: 'John Doe',
            login: 'jonhdoe@example.com',
            password: await hash('123456', 8)
        })

        const { user } = await authenticateUseCase.execute({
            login: 'jonhdoe@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(Number))
    })

    it('should not be able to authenticate with wrong login', async () => {

        await expect(() => authenticateUseCase.execute({
            login: 'jonhdoe@example.com',
            password: '123456'
        }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {


        await usersRepository.create({
            name: 'John Doe',
            login: 'jonhdoe@example.com',
            password: await hash('123456', 8)
        })

        await expect(() => authenticateUseCase.execute({
            login: 'jonhdoe@example.com',
            password: '1234563'
        }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
