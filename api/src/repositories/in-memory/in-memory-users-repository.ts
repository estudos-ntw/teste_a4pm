import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUserRepository implements UsersRepository {
    public items: User[] = []
    async findByLogin(login: string) {
        const user = this.items.find(item => item.login === login)

        if (!user) {
            return null
        }

        return user

    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 1,
            name: data.name,
            login: data.login,
            password: data.password,
            createdAt: new Date(),
            updatedAt: null
        }

        this.items.push(user)

        return user


    }

    async getProfile(id: number) {
        const user = this.items.find(item => item.id === id)
        if (!user) {
            return null
        }

        return user
    }

}