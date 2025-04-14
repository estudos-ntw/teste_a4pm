<template>
  <div class="w-full">
    <PageTitle title="Lista de Receitas" />

    <div class="w-full flex justify-between mb-4">
      <div class="w-full flex gap-2">
        <input type="text" v-model="search"
          class="border  rounded w-full p-2 focus:outline-2 focus:outline-offset-2 focus:outline-primary w-full "
          placeholder="Digite uma palavra para efetuar a busca" />
        <button class="btn bg-blue-400">
          Buscar
        </button>
      </div>
      <div class="flex justify-end w-2/5">
        <a href="/receita" class="btn bg-green-600 p-2 rounded hover:bg-secondary hover:text-white">
          Adicionar Receita
        </a>
      </div>
    </div>
    <RecipeList :search="search" />





  </div>
</template>

<script setup lang="ts">
import PageTitle from '../../components/PageTitle.vue';
import { useModalStore } from '@/stores/useModalStore';
import ModalRecipe from '@/components/recipe/ModalRecipe.vue';
import RecipeList from '@/components/recipe/RecipeList.vue';
import { useRecipeStore } from '@/stores/useRecipeStore';
import type { RecipeInterface } from '@/types/recipes';
import { reactive, ref } from 'vue';
const modal = useModalStore()
const recipe = useRecipeStore()

const data: RecipeInterface = {}
const search = ref('')

function openModal() {
  modal.open({
    component: ModalRecipe,
    componentProps: {
      title: 'Receitas',
      body: data
    }
  })
}



</script>
