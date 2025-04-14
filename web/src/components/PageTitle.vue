<script setup lang="ts">
defineProps({
  title: String
})

</script>

<template>
  <header class="w-full border-b-2 text-primary  mb-4">
    <span class="text-3xl text-primary font-bold">{{ title }}</span>

  </header>
</template>

<style></style>
