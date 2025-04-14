<script setup lang="ts">
import { useModalStore } from '@/stores/useModalStore'

// Initialize modal store
const modal = useModalStore()
</script>

<template>
  <div v-if="modal.state.component" id="modal-layout" @click.self="modal.close"
    class="flex flex-col justify-center items-center">
    <!-- Assign component state && component props -->
    <Component :is="modal.state.component" v-bind="modal.state.componentProps" @close="modal.close" />
  </div>
</template>

<style scoped>
#modal-layout {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
