<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300" @click="$emit('close')">
        </div>
        <div class="relative bg-white rounded-lg p-6 shadow-lg z-10">
            <h2 class="text-xl font-bold mb-4">{{ user?.id ? 'Editar usuário' : 'Criar usuário' }}</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-gray-700">Primeiro nome</label>
                    <input :class="{ 'input-error': isSubmitted && !user.first_name }" v-model="user.first_name"
                        class="w-full px-3 py-2 border rounded" placeholder="Primeiro nome" type="text">
                    <small class="error-message mt-1" v-if="isSubmitted && !user.first_name">Preenchimento
                        obrigatório</small>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Último nome</label>
                    <input :class="{ 'input-error': isSubmitted && !user.last_name }" v-model="user.last_name"
                        class="w-full w-100 px-3 py-2 border rounded" placeholder="Último nome" type="text">
                    <small class="error-message mt-1" v-if="isSubmitted && !user.last_name">Preenchimento
                        obrigatório</small>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">E-mail</label>
                    <input
                        :class="{ 'input-error': (isSubmitted && !user.email) || (isSubmitted && user.email && !validateEmail) }"
                        v-model="user.email" placeholder="exemplo@exemplo.com" class="w-full px-3 py-2 border rounded"
                        type="text">
                    <small class="error-message mt-1" v-if="isSubmitted && !user.email">Preenchimento
                        obrigatório</small>
                    <small class="error-message mt-1" v-if="isSubmitted && user.email && !validateEmail">Formato de
                        email inválido</small>
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
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
    props: {
        user: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props, { emit }) {
        const state = reactive({
            user: { ...props.user },
            isSubmitted: false,
        })

        const validateEmail = computed(() => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailPattern.test(state.user.email)
        })

        const validateForm = () => {
            state.isSubmitted = true
            const isValid =
                state.user.first_name &&
                state.user.last_name &&
                state.user.email &&
                validateEmail.value

            return isValid
        }

        const handleSubmit = () => {
            if (validateForm()) {
                emit('save', state.user)
            }
        }

        watch(
            () => props.user,
            (newUser) => {
                state.user = { ...newUser }
            },
            { immediate: true }
        )

        return {
            ...toRefs(state),
            validateForm,
            validateEmail,
            handleSubmit,
        }
    },
})
</script>

<style>
.input-error {
    border: 1px solid red
}

.error-message {
    color: red
}
</style>