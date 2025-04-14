/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "src/lib/prisma"
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { UsersRepository } from "src/repositories/users-repository"
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error"
import { User } from "@prisma/client"


interface RegisterUserUseCaseRequest {
    name: string
    login: string
    password: string
}

interface RegisterUserUseCaseResponse {
    user: User
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UsersRepository) { }
    async execute({ name, login, password }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const password_hash = await hash(password, 8)

        const userWithSameEmail = await this.usersRepository.findByLogin(login)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError
        }


        const user = await this.usersRepository.create({ name, login, password: password_hash })

        return { user }
    }

}

