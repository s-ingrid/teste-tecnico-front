<template>
    
</template>


<script>
import { computed, defineComponent, onMounted, toRefs, reactive } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    setup(props, { emit }) {
        const store = useStore()
        const state = reactive({ })

        onMounted(() => {
            store.dispatch('CHECK_TOKEN')
        })

        const isLoggedIn = computed(() => {
            return store.getters.isLoggedIn
        })

        return {
            ...toRefs(state),
            isLoggedIn
        }
    }
})
</script>
