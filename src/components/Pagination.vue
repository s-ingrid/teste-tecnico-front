<template>
  <section class="mx-16 my-10">
    <div class="flex items-center justify-between mt-10 ">
      <p class="text-sm font-normal">
        Mostrando {{ itemsPerPage }} de {{ totalItems }}
      </p>
      <nav>
        <ul class="flex items-center space-x-2">
          <li>
            <button @click="changePage('previous')" :disabled="currentPage === 1"
              class="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <i class="ti ti-chevron-left mr-2"></i>
              Anterior
            </button>
          </li>
          <li>
            <button @click="changePage('next')" :disabled="lastPage === currentPage"
              class="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Próxima
              <i class="ti ti-chevron-right ml-2"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted, toRefs, reactive, watch } from 'vue'

export default defineComponent({
  props: {
    itemsPerPage: {
      type: Number,
      default: 0
    },
    totalItems: {
      type: Number,
      default: 1
    },
    lastPage: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      currentPage: 1,
      totalPages: 1
    })

    const changePage = (direction) => {
      if (direction === 'previous') {
        state.currentPage--
      } else if (direction === 'next') {
        state.currentPage++
      }
      emit('change-page', state.currentPage)
    }

    watch(
      () => state.totalPages,
      () => {
        state.totalPages = Math.ceil(props.totalItems / props.totalItems)
      }
    )
    onMounted(async () => {})

    return {
      ...toRefs(state),
      changePage
    }
  }
})
</script>