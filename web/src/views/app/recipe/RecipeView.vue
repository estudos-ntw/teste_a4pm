<template>
  <div>
    <div class="p-4">
      <div class="modal-header">
        <h2>{{ 'Nova Receita' }}</h2>
      </div>
      <hr class="mb-4">
      <form @submit.prevent="save">
        <div class="form-group flex flex-col gap-1 mb-2">
          <label class="text-sm font-bold">Nome da Receita:</label>
          <input class="rounded p-1" name="name" type="text" v-model="recipe.name" />
        </div>
        <div class="flex flex-col w-full gap-1">
          <label class="text-sm font-bold">Categoria:</label>
          <select class="select w-full" v-model="category">
            <option v-for="cat in categories" v-bind:key="cat.id" :value="cat.id">{{ cat.name }}</option>

          </select>
        </div>
        <div class="flex w-full justify-between gap-2">
          <div class="form-group flex flex-col gap-1 mb-2 w-full">
            <label class="text-sm font-bold">Quantidade de Porções:</label>
            <input class="rounded p-1" name="name" type="number" v-model="recipe.portions" />
          </div>
          <div class="form-group flex flex-col gap-1 mb-2 w-full">
            <label class="text-sm font-bold">Tempo de Preparo:</label>
            <input class="rounded p-1" name="name" type="number" v-model="recipe.preparationTime" />
          </div>
        </div>
        <div class="form-group flex flex-col gap-1 mb-2">
          <label class="text-sm font-bold">Ingredientes:</label>
          <textarea class="rounded p-1" name="name" v-model="recipe.ingredients" />
        </div>
        <div class="form-group flex flex-col gap-1 mb-2">
          <label class="text-sm font-bold">Modo de Preparo:</label>
          <textarea class="rounded p-1" name="name" v-model="recipe.preparationMode" />
        </div>


        <div class="flex justify-center">
          <button class="btn btn-primary w-1/3 align" type="submit">Salvar</button>
        </div>
      </form>


      <div class="modal-body">

      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import InputForm from '@/components/InputForm.vue';
import RecipeList from '@/components/recipe/RecipeList.vue';
import api from '@/services/api';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRecipeStore } from '@/stores/useRecipeStore';
import type { RecipeInterface } from '@/types/recipes';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const recipe = reactive({
  categoryId: '' as string | number,
  name: '',
  ingredients: '',
  portions: '' as string | number,
  preparationMode: '',
  preparationTime: '' as string | number,

}) as RecipeInterface

const auth = useAuthStore()
const recipeStore = useRecipeStore()
const category = ref('')

const categories = ref([])

onMounted(async () => {
  const tokenAuth = 'Bearer ' + auth.token;
  const { data } = await api.get('/categories', {
    headers: {
      Authorization: tokenAuth
    }
  })
  categories.value = data
})

//console.log('ROUTE PARAM', route.params.id)

async function save() {
  recipe.categoryId = category.value
  recipeStore.addRecipe(recipe)
  router.push({ name: 'home' })
}

</script>

<style scoped></style>
