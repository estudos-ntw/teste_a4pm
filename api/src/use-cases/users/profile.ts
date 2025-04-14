/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "src/lib/prisma"
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { UsersRepository } from "src/repositories/users-repository"
import { UserAlreadyExistsError } from "src/errors/user-already-exists-error"
import { User } from "@prisma/client"
import { ProfileIsNotExistsError } from "@/errors/profile-is-not-exists-error"


interface ProfileUserUseCaseRequest {
    id: number

}

interface ProfileUserUseCaseResponse {
    id: number
    name: string
    login: string
}

export class ProfileUserUseCase {
    constructor(private usersRepository: UsersRepository) { }
    async execute({ id }: ProfileUserUseCaseRequest): Promise<ProfileUserUseCaseResponse> {

        const user = await this.usersRepository.getProfile(id)



        if (!user) {
            throw ProfileIsNotExistsError
        }

        const { name, login } = user

        return { id, name, login }
    }

}

