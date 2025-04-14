<template>
  <header class="w-full flex justify-between bg-gray-800 p-4 rounded-lg shadow-lg">
    <div>
      <h1 class="text-orange-500 font-black">A4PM</h1>
    </div>

    <div class="flex gap-4">
      <div class="avatar avatar-online">
        <div class="w-12 rounded-full">
          <img
            src="https://img.myloview.com.br/posters/avatar-cabeca-perfil-silhueta-chamada-centro-masculino-foto-700-151766550.jpg" />
        </div>

      </div>
      <div class="flex flex-col justify-center">
        <sapn class="text-white">{{ user?.name }}</sapn>
        <button @click="logoff" class="btn btn-xs btn-error">Logoff</button>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import LinkButton from './LinkButton.vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const router = useRouter()

const user = auth.user

async function logoff() {
  await auth.clean()
  router.push({ name: 'login' })
}


</script>

<style scoped></style>
