import fastify from "fastify";
import { appRoutes } from "./routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import cors from '@fastify/cors'
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'API Receitas - A4PM',
            description: 'Documentação da API de Cadastro de Receitas',
            version: '1.0.0',
        },
    },
    // Importante adicionar para fazer o parse do schema
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(cors)

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
})