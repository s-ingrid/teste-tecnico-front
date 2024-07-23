<template>
    <main>
        <NavBar
            :navigation="items"
            @toggle-menu="toggleMenu()"
            :isMenuOpen="isMenuOpen"
        />
        <div class="mt-20">
            <router-view></router-view>
        </div>
    </main>
</template>

<script>
import { defineComponent, onMounted, toRefs, reactive } from "vue";
import NavBar from "../components/NavBar.vue";
import UserList from "../components/UserList.vue";

export default defineComponent({
  components: { NavBar, UserList },
    setup() {
        const state = reactive({
            users: {},
            isMenuOpen: false,
            items: [
                { name: 'Home', path: '/' },
                { name: 'Usuários', path: '/usuarios' }
            ]
        })
        const toggleMenu = () => {
            state.isMenuOpen = !state.isMenuOpen
        }
        onMounted(async () => {})
        return {
            ...toRefs(state),
            toggleMenu,
        }
    },
});
</script>