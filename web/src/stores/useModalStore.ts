/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref, type Component } from 'vue'


interface ModalState {
  component: Component | null,
  componentProps?: Record<string, any>
}

export const useModalStore = defineStore('modal', () => {
  const initialState = {
    component: null,
    componentProps: {}
  }

  const state = ref<ModalState>({ ...initialState })

  function open(newState: ModalState) {
    Object.assign(state.value, newState)
  }

  function close() {
    Object.assign(state.value, initialState)
  }

  return { state, open, close }
})

