<template>
  <Dashboard />
</template>

<script>
import { defineComponent, onMounted, toRefs, reactive } from 'vue'
import Dashboard from '../components/Dashboard.vue'

export default defineComponent({
  components: {
      Dashboard
  },
  setup() {
      const state = reactive({})
      
      onMounted(async () => {
      })

      return {
          ...toRefs(state)
      }
  }
})
</script>