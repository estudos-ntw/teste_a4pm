import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient({
    log: ['query']
})

async function seed() {
    await prisma.category.deleteMany()
    await prisma.category.createMany({
        data: [
            {
                name: 'Bolo e tortas doces'
            },
            {
                name: 'Carnes'
            },
            {
                name: 'Aves'
            },
            {
                name: 'Peixes e frutos do mar'
            },
            {
                name: 'Saladas, molhos e acompanhamentos'
            },
            {
                name: 'Sopas'
            },
            {
                name: 'Massas'
            },
            {
                name: 'Bebidas'
            },
            {
                name: 'Doces e sobremesas'
            },
            {
                name: 'Lanches'
            },
            {
                name: 'Prato Único'
            },
            {
                name: 'Light'
            },
            {
                name: 'Alimentação Saudável'
            },

        ]
    })
}

seed().then(() => {
    console.log('Database seeded')
})