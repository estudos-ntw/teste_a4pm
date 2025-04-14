<script setup lang="ts">
import ModalLayout from './ModalLayout.vue';
import Navbar from './Navbar.vue';

</script>
<template>
  <div class="flex flex-col h-screen p-2 gap-4">
    <Navbar />
    <main class="w-full">
      <router-view />
    </main>
    <ModalLayout />
  </div>

</template>
