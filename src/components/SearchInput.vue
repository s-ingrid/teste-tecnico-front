<template>
    <div class="margin-top-mobile absolute mx-16 w-96">
      <input
        v-model="searchTerm"
        @input="onInput"
        type="text"
        placeholder="Pesquisar usuário..."
        class="px-4 py-2 border rounded"
      />
      <button
        v-if="searchTerm"
        @click="clearSearch"
        class="absolute mx-2 right-2 top-2"
      >
        x
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

<style scoped>
@media (max-width:767.98px) {
  .margin-top-mobile {
    position: relative;
    margin-bottom: -70px;
  }
}
</style>