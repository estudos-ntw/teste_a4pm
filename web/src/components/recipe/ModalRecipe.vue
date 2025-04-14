<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import type { RecipeInterface } from '@/types/recipes';
import InputForm from '../InputForm.vue';
import { onMounted, ref } from 'vue';
import api from '@/services/api';
import { useAuthStore } from '@/stores/useAuthStore';
defineEmits(['close'])

const props = defineProps<{
  title: string
  body: RecipeInterface
}>()
const auth = useAuthStore()
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

function save() {
  props.body.categoryId = parseInt(category.value)
}
</script>

<template>
  <div class="modal-content rounded-lg p-4">
    <div class="modal-header">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>{{ title }}</h2>
    </div>

    <hr>

    <div class="modal-body">
      <form @submit.prevent="save">
        <InputForm label="Nome da Receita:" type="text" required :v-model="props.body.name"
          :value="body.name ?? null" />
        <div class="flex flex-col w-full">
          <label class="text-sm font-bold">Categoria:</label>
          <select class="select w-full" v-model="category">
            <option v-for="cat in categories" v-bind:key="cat.id" :value="cat.id">{{ cat.name }}</option>

          </select>
        </div>
        <div class="flex w-full justify-between gap-2">
          <InputForm label="Quantidade de Porções:" type="number" required :v-model="props.body.portions"
            :value="body.portions ?? null" />
          <InputForm label="Tempo de Preparo(minutos):" type="number" required :v-model="body.preparationTime"
            :value="body.preparationTime ?? null" />
        </div>
        <InputForm label="Ingredientes:" type="text" required :v-model="body.ingredients"
          :value="body.ingredients ?? null" />
        <InputForm label="Modo de preparo:" type="text" required :v-model="body.preparationMode"
          :value="body.preparationMode ?? null" />


        <div class="flex justify-center">
          <button class="btn btn-primary w-1/3 align" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.modal-header {
  padding: 2px 16px;
  background-color: white;
  color: black;
}

.modal-body {
  padding: 2px 16px;
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 8px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
