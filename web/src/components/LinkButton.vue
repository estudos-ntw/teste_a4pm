<template>
  <div>
    <router-link :to="{ name: link }" class="btn">{{ name ??
      'Button' }}</router-link>
  </div>
</template>

<script setup lang="ts">
defineProps({
  link: String,
  name: String
})


</script>

<style scoped></style>
