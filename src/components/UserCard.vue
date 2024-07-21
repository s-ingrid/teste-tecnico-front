<template>
    <section>
        <div class="flex justify-end mx-16 mt-10">
            <button @click="isModalOpen = true" class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed">Criar usuário</button>
        </div>
        <div class="grid gap-4 mx-16 my-10 lg:grid-cols-3">
            <section class="d-flex" v-for="(user, index) in users" :key="index">
                <div
                    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-200">
                    <div class="flex justify-end px-4 pt-4">
                        <DropdownActionsMenu :options="dropdownOptions" @action="handleAction" :user="user" />
                    </div>
                    <div class="flex flex-col items-center pb-10">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" :src="user.avatar" alt="Bonnie image" />
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-gray">{{ user.first_name }} {{ user.last_name }}</h5>
                        <span class="text-sm text-gray-500 dark:text-gray-600">{{ user.email }}</span>
                    </div>
                </div>
            </section>
        </div>
    </section>
    <UserFormManager
        v-if="isModalOpen"
        :user="selectedUser"
        @close="handleClose()"
        @save="saveUser"
    />
    <ConfirmationModal
        :isVisible="openDialogDelete"
        :dialog="dialog"
        @close="openDialogDelete = false"
        @confirm="deleteUser(selectedUser)"
    />
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import UserManagerService from '../services/UserManagerService'
import DropdownActionsMenu from './DropdownActionsMenu.vue'
import { toast } from 'vue3-toastify'
import UserFormManager from './UserFormManager.vue'
import ConfirmationModal from './ConfirmationModal.vue'

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
    setup() {
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
                    await UserManagerService.updateUser(user.id, user)
                } else {
                    await UserManagerService.createUser(user)
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
