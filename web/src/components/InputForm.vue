<template>
  <div class="flex flex-col my-4 gap-2 w-full">
    <label class="text-sm font-bold">
      {{ label }}
    </label>
    <input
      class="p-2 w-full rounded text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6 "
      :type="type" :name="name" :v-model="model" :value="value" />

  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  type: String,
  name: String,
  model: String,
  value: String,
})

</script>

<style scoped></style>
