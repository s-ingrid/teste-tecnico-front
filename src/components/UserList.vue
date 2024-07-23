<template>
  <main>
      <SearchInput @update:search="handleSearch" />
      <UserCard
        @editUser="editUser"
        @createUser="createUser"
        @deleteUser="deleteUser"
        :users="paginatedUsers"
      />
      <Pagination
        :currentPage="currentPage"
        :totalItems="totalItems"
        :lastPage="lastPage"
        :itemsPerPage="itemsPerPage"
        @change-page="changePage"
      />
    </main>
  </template>
  
  <script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import UserManagerService from '../services/UserManagerService'
import Pagination from './Pagination.vue'
import SearchInput from './SearchInput.vue'
import UserCard from './UserCard.vue'

export default defineComponent({
  components: {
    Pagination,
    UserCard,
    SearchInput
  },
  setup() {
    const state = reactive({
      users: [],
      filteredUsers: [],
      paginatedUsers: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 6,
      lastPage: 0,
      searchTerm: ''
    })

    const fetchUsers = async (page) => {
      try {
        const response = await UserManagerService.getAllUsers(page)
        return response
      } catch (error) {
        console.error('Erro ao buscar usuários.', error)
        return null
      }
    }

    const getAllUsers = async () => {
      let allUsers = []
      let currentPage = 1
      let lastPage = 1

      do {
        const response = await fetchUsers(currentPage)
        if (response) {
          allUsers = [...allUsers, ...response.data]
          lastPage = response.total_pages
          currentPage++
        }
      } while (currentPage <= lastPage)

      state.users = allUsers
      state.totalItems = allUsers.length
      state.lastPage = lastPage
      applyFilters()
    }

    const applyFilters = () => {
      if (state.searchTerm === '') {
        state.filteredUsers = state.users
      } else {
        state.filteredUsers = state.users.filter(user =>
          user.first_name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      }
      paginateUsers()
    }

    const paginateUsers = () => {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      state.paginatedUsers = state.filteredUsers.slice(start, end)
    }

    const changePage = (page) => {
      state.currentPage = page
      paginateUsers()
    }

    const handleSearch = (searchTerm) => {
      state.searchTerm = searchTerm
      state.currentPage = 1
      applyFilters()
    }

    const editUser = (updatedUser) => {
      const index = state.paginatedUsers.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        state.paginatedUsers[index] = updatedUser
        state.users = state.users.map(user =>
          user.id === updatedUser.id ? updatedUser : user
        )
        state.filteredUsers = state.filteredUsers.map(user =>
          user.id === updatedUser.id ? updatedUser : user
        )
        paginateUsers()
      }
    }

    const createUser = (newUser) => {
      state.paginatedUsers.unshift(newUser)
      state.filteredUsers.unshift(newUser)
      state.totalItems += 1
      if (state.paginatedUsers.length > state.itemsPerPage) {
        state.paginatedUsers.pop()
      }
      paginateUsers()
    }
    const deleteUser = (userId) => {
      state.users = state.users.filter(user => user.id !== userId)
      state.filteredUsers = state.filteredUsers.filter(user => user.id !== userId)
      const index = state.paginatedUsers.findIndex(user => user.id === userId)
      if (index !== -1) {
        state.paginatedUsers.splice(index, 1)
      }
    
      state.totalItems -= 1
      if (state.paginatedUsers.length === 0 && state.currentPage > 1) {
        state.currentPage -= 1
      }
      
      paginateUsers()
    }

    onMounted(async () => {
      await getAllUsers()
    })

    return {
      ...toRefs(state),
      changePage,
      handleSearch,
      editUser,
      createUser,
      deleteUser
    }
  }
})
</script>
