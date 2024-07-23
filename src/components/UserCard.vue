<template>
    <section class="mt-28">
        <div>
            <div class="flex justify-end mx-16 mt-10">
                <button @click="isModalOpen = true" class="px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-sm">Criar usuário</button>
            </div>
            <section class="mx-16 my-10">
                <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    <section v-for="(user, index) in users" :key="index">
                        <article class="max-w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-100 dark:border-gray-200 p-6">
                            <header class="flex justify-end px-4 pt-4">
                                <DropdownActionsMenu :options="dropdownOptions" @action="handleAction" :user="user" />
                            </header>
                            <div class="flex flex-col items-center pb-10">
                                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" :src="user.avatar ? user.avatar : '../assets/user-1.png'" :alt="`Avatar de ${user.first_name} ${user.last_name}`" />
                                <h2 class="mb-1 text-xl font-medium text-gray-900 dark:text-gray">{{ user.first_name }} {{ user.last_name }}</h2>
                                <p class="text-sm text-gray-500 dark:text-gray-600">{{ user.email }}</p>
                            </div>
                        </article>
                    </section>
                </div>
            </section>
        </div>
        <UserFormManager
            v-if="isModalOpen"
            :user="selectedUser"
            @close="handleClose"
            @save="saveUser"
        />
        <ConfirmationModal
            :isVisible="openDialogDelete"
            :dialog="dialog"
            @close="openDialogDelete = false"
            @confirm="deleteUser(selectedUser)"
        />
    </section>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import UserManagerService from '../services/UserManagerService'
import DropdownActionsMenu from './DropdownActionsMenu.vue'
import UserFormManager from './UserFormManager.vue'
import ConfirmationModal from './ConfirmationModal.vue'
import { toast } from 'vue3-toastify'

export default defineComponent({
    components: {
        DropdownActionsMenu,
        UserFormManager,
        ConfirmationModal
    },
    props: {
        users: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            dropdownOptions: [
                {
                    text: 'Editar',
                    action: 'edit',
                    class: 'text-gray-700',
                },
                {
                    text: 'Excluir',
                    action: 'delete',
                    class: 'text-red-600',
                },
            ],
            isModalOpen: false,
            selectedUser: {
                last_name: '',
                first_name: '',
                email: ''
            },
            openDialogDelete: false
        })
        const handleAction = ({ action, user }) => {
            if (action === 'edit') {
                dialogUser(user)
            } else if (action === 'delete') {
                dialogDelete(user)
            }
        }
        const dialogUser = (user) => {
            state.isModalOpen = true
            state.selectedUser = { ...user }
        }
        const dialogDelete = (user) => {
            state.openDialogDelete = true
            state.selectedUser = { ...user }
        }
        const saveUser = async (user) => {
            try {
                if (user.id) {
                    const response = await UserManagerService.updateUser(user.id, user)
                    emit('editUser', response)
                } else {
                    const response = await UserManagerService.createUser(user)
                    emit('createUser', response)
                }
                handleClose()
                toast("Usuário salvo com sucesso!", {
                    "type": "success",
                    autoClose: 3000,
                })
            } catch (error) {
                toast("Erro ao salvar usuário.", {
                    "type": "error",
                    autoClose: 3000,
                })
            }
        }
        const deleteUser = async (user) => {
            try {
                await UserManagerService.deleteUser(user.id)
                emit('deleteUser', user.id)
                state.openDialogDelete = false
                handleClose()
                toast("Usuário excluído com sucesso!", {
                    "type": "warning",
                    autoClose: 3000,
                })
            } catch (error) {
                toast("Erro ao excluir usuário.", {
                    "type": "error",
                    autoClose: 3000,
                })
            }
        }
        const handleClose = () => {
            state.selectedUser = {
                first_name: '',
                last_name: '',
                email: ''
            }
            state.isModalOpen = false
        }
        const dialog = computed(() => {
            return {
                titleMessage: 'Confirmar exclusão',
                message: 'Tem certeza de que deseja excluir este usuário?'
            }
        })
        return {
            ...toRefs(state),
            handleAction,
            dialogUser,
            deleteUser,
            saveUser,
            handleClose,
            dialog
        }
    }
})
</script>
