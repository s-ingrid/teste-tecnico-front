<template>
   <div id="app">
        <Layout v-if="isLoggedIn"></Layout>
        <router-view v-else />
   </div>
</template>

<script>
import { computed, defineComponent, onMounted, toRefs, reactive } from 'vue'
import { useStore } from 'vuex'
import Layout from './views/Layout.vue'

export default defineComponent({
    components: {
        Layout
    },
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