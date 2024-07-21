<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300" @click="$emit('close')">
        </div>
        <div class="relative bg-white rounded-lg p-6 shadow-lg z-10">
            <h2 class="text-xl font-bold mb-4">{{ user?.id ? 'Editar usuário' : 'Criar usuário' }}</h2>
            <form @submit.prevent="$emit('save', user)">
                <div class="mb-4">
                    <label class="block text-gray-700">Primeiro nome</label>
                    <input v-model="user.first_name" class="w-full px-3 py-2 border rounded" type="text" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Último nome</label>
                    <input v-model="user.last_name" class="w-full px-3 py-2 border rounded" type="text" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">E-mail</label>
                    <input v-model="user.email" class="w-full px-3 py-2 border rounded" type="email" required>
                </div>
                <div class="flex justify-between">
                    <button type="button" @click="$emit('close')"
                        class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
    props: {
        user: {
            type: Object,
            default: () => { },
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            user: { ...props.user }
        })
        watch(
            () => props.user,
            (newUser) => {
                state.user = { ...newUser }
            },
            { immediate: true }
        )
        return {
            ...toRefs(state)
        }
    },
})
</script>