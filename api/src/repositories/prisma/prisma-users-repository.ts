import { Prisma, User } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({ data })

        return user
    }

    async findByLogin(login: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                login
            }
        })

        return user
    }

    async getProfile(id: number): Promise<User | null> {

        const user = await prisma.user.findFirst({
            where: {
                id
            }
        })



        return user
    }
}