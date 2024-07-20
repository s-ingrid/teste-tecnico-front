<template>
    <UserCard
        :users="users"
    />
    <Pagination
        :currentPage="currentPage"
        :totalItems="totalItems"
        :lastPage="lastPage"
        :itemsPerPage="itemsPerPage"
        @change-page="getAllUsers"
    />
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import UserManagerService from "../services/UserManagerService"
import Pagination from './Pagination.vue'
import UserCard from './UserCard.vue'

export default defineComponent({
    components: {
        Pagination,
        UserCard
    },
    setup() {
        const state = reactive({
            users: {},
            tableQtd: 10,
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: 0,
            lastPage: 0
        })
        const getAllUsers = async (page = 1) => {
            state.currentPage = page
            try {
                const response = await UserManagerService.getAllUsers(state.currentPage)
                console.log(response)
                if (Array.isArray(response.data) && response.data.length > 0 ) {
                    state.users = response.data
                    state.itemsPerPage = response.per_page
                    state.lastPage = response.total_pages
                    state.totalItems = response.total
                }
            } catch (error) {
                console.error("Erro ao tentar fazer o login.", error)
            }
        }
        onMounted(async () => {
            await getAllUsers()
        })
        return {
            ...toRefs(state),
            getAllUsers
        }
    }
})
</script>
