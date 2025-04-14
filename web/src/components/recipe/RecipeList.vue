<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class=" table">
      <thead class="bg-secondary text-white">
        <tr class="">
          <th class="border border-gray-300">Receita</th>
          <th class="border border-gray-300">Categoria</th>
          <th class="border border-gray-300">Tempo de Preparo</th>
          <th class="border border-gray-300">Data de Cadastro</th>
          <th></th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="recipe in recipes" :key="recipe.id">
          <td class="border border-gray-300">{{ recipe.name }}</td>
          <td class="border border-gray-300">{{ recipe.category.name }}</td>
          <td class="border border-gray-300">{{ recipe.preparationTime }}</td>
          <td class="border border-gray-300">{{ useDateFormat(recipe.createdAt, "DD/MM/YYYY") }}</td>
          <td class="border border-gray-300 p-2 flex justify-between">
            <button @click="editModal(recipe)" class="btn bg-blue-400 hover:bg-blue-400/80 p-2 rounded">Editar</button>
            <a href="#" class="btn bg-red-400 hover:bg-red-400/80 p-2 rounded">Excluir</a>
          </td>
        </tr>

      </tbody>
    </table>

  </div>
  <span class="text-3xl font-bold">{{ search }}</span>
</template>

<script setup lang="ts">
import type { RecipeInterface } from '@/types/recipes';
import { useModalStore } from '@/stores/useModalStore';
import ModalRecipe from './ModalRecipe.vue';
import { computed, onMounted } from 'vue';


import { useRecipeStore } from '@/stores/useRecipeStore';
import { useDateFormat } from '@vueuse/core';

const modal = useModalStore()
const useStore = useRecipeStore()

defineProps({
  search: String
})
onMounted(async () => {
  await useStore.getRecipes()
})
const recipes = computed(() => {
  return useStore.recipes.filter((item) => item.name)
})

function editModal(data: RecipeInterface) {
  modal.open({
    component: ModalRecipe,
    componentProps: {
      title: data.name,
      body: data
    }
  })
}

</script>

<style scoped></style>
