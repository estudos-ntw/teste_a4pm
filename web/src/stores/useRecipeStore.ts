
import type { RecipeInterface } from "@/types/recipes";
import { defineStore } from "pinia";
import { useAuthStore } from "./useAuthStore";
import api from "@/services/api";

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    recipes: [] as RecipeInterface[],
    search: ''
  }),
  actions: {
    async getRecipes() {
      const auth = useAuthStore()
      const tokenAuth = 'Bearer ' + auth.token;
      const { data } = await api.get('/recipes', {
        headers: {
          Authorization: tokenAuth
        }
      })
      console.log('RECIPES LIST STORE', data)
      this.recipes = data

    },
    async addRecipe(recipe: RecipeInterface) {
      console.log('STORES', recipe)
      const auth = useAuthStore()
      const tokenAuth = 'Bearer ' + auth.token;
      await api.post('/recipes', recipe, {
        headers: {
          Authorization: tokenAuth
        }
      })

    }

  },

})
