<template>
    <div class="relative">
      <input
        v-model="searchTerm"
        @input="onInput"
        type="text"
        placeholder="Pesquisar usuário..."
        class="w-full px-4 py-2 border rounded"
      />
      <button
        v-if="searchTerm"
        @click="clearSearch"
        class="absolute right-2 top-2"
      >
        Limpar
      </button>
    </div>
  </template>
  
  <script>
  import { defineComponent, reactive, toRefs } from 'vue'
  
  export default defineComponent({
    setup(props, { emit }) {
        const state = reactive({
            searchTerm: ''
        })

        const onInput = () => {
            emit('update:search', state.searchTerm)
        }

        const clearSearch = () => {
            state.searchTerm = ''
            emit('update:search', state.searchTerm)
        }

        return {
            ...toRefs(state),
            onInput,
            clearSearch
        }
      }
  })
  </script>