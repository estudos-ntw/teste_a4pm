import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register";
import { register as registerCategory } from "@/controllers/categories/register";
import { authenticate } from "./controllers/auth/authenticate";
import { auth } from "./middlewares/auth";
import { profile } from "./controllers/users/profile";
import { z } from "zod";
import { list as listCategories } from "./controllers/categories/list";
import { show as showRecipes } from "./controllers/recipes/show";
import { list as listRecipes } from './controllers/recipes/list'
import { register as registerRecipe } from './controllers/recipes/register'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', {
        schema: {
            tags: ['Users'],
            summary: 'Create a new account with login & password',
            body: z.object({
                name: z.string().min(3),
                login: z.string().email(),
                password: z.string().min(6)
            })
        }
    }, register)
    app.post('/auth', {
        schema: {
            tags: ['Authentication'],
            summary: 'Authentication user with login & password',
            response: {
                200: z.object({
                    token: z.string()
                }),
                409: z.object({
                    message: z.string()
                }),
                500: z.object({
                    mesage: z.string()
                })
            },
            body: z.object({
                login: z.string().email(),
                password: z.string().min(6)
            })
        }
    }, authenticate)
    app.get('/users/me', {
        onRequest: [auth],
        schema: {
            tags: ['Users'],
            summary: 'Get information User with token',
            response: {
                200: z.object({
                    id: z.number(),
                    name: z.string(),
                    login: z.string().email()
                }),
                409: z.object({
                    message: z.string()
                }),
                500: z.object({
                    mesage: z.string()
                })
            },

        }
    }, profile)

    app.get('/categories', {
        onRequest: [auth],
        schema: {
            tags: ['Categories'],
            summary: 'Get a category',
            response: {
                200: z.object({
                    id: z.number(),
                    name: z.string()
                }).array(),
                409: z.object({
                    message: z.string()
                }),
                500: z.object({
                    mesage: z.string()
                })
            },
        }
    }, listCategories)
    app.get('/recipes', {
        onRequest: [auth],
        schema: {
            tags: ['Recipes'],
            summary: 'list Recipe',

        },

    }, listRecipes)
    app.post('/recipes', {
        onRequest: [auth],
        schema: {
            tags: ['Recipes'],
            summary: 'Create Recipe',

        }
    }, registerRecipe)
    app.get('/recipes/:id', {
        onRequest: [auth],
        schema: {
            tags: ['Recipes'],
            summary: 'Get Recipe',

        }
    }, showRecipes)

}