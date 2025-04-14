<script setup lang="ts">
import api from '@/services/api';
import logo from '../assets/logo.png'
import { onMounted, reactive } from 'vue';
import type { AuthInterface } from '@/types/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'vue-router';

const user = reactive<AuthInterface>({
  login: '',
  password: '',
})

const router = useRouter()

const authStore = useAuthStore()


async function login() {
  try {
    const { data } = await api.post('/auth', user)

    authStore.setToken(data.token)
    authStore.setIsAuth(true)
    router.push({ name: 'home' })

  } catch (error) {
    console.log(error)
  }
}


</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-screen">

    <div class="w-2/4 p-2   shadow-xl border-2 rounded-lg border-primary shadow-lg bg-white flex flex-col items-center">
      <img :src="logo" />
      <div class="w-2/3">
        <form @submit.prevent="login">
          <div class="border-b border-gray-900/10 w-full">
            <div class="flex flex-col w-full">
              <div class="w-full">
                <label for="first-name" class="block text-sm/6 font-medium text-gray-900 w-full">Login</label>
                <div class="mt-2 w-full">
                  <input v-model="user.login" type="text" name="first-name" id="first-name" autocomplete="given-name"
                    class="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6">
                </div>
              </div>
              <div>
                <label for="password" class="block text-sm/6 font-medium text-gray-900">Senha</label>
                <div class="mt-2">
                  <input v-model="user.password" type="password" name="password" id="password"
                    autocomplete="family-name"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6">
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex flex-col items-center justify-end gap-4 ">
            <button type="submit"
              class="rounded-md bg-primary text-sm font-semibold p-2 text-white shadow-xs w-full hover:bg-secondary">Entrar</button>
            <a href="/register" class="text-sm/6 italic text-gray-500 underline hover:text-primary">Efetuar Cadastro</a>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<style></style>
