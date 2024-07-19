<template>
    <div class="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl mx-auto text-center">
            <form @submit.prevent="validateForm" class="space-y-6" action="#" method="POST">
                <span class="text-2xl font-light">Faça login na sua conta</span>
                <div class="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                    <div class="h-2 bg-indigo-400 rounded-t-md"></div>
                    <div class="py-6 px-8">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div class="mt-2">
                            <input id="email" v-model="form.email" type="email" autocomplete="email"
                                :class="{ 'input-error': isSubmitted && !form.email }"
                                class=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                            >
                        </div>
                        <small class="error-message mt-1" v-if="isSubmitted && !form.email">Preenchimento obrigatório</small>
                        <div class="flex items-center justify-between mt-3">
                            <label for="password"
                                class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                        </div>
                        <div class="mt-2">
                            <input id="password" v-model="form.password" type="password" autocomplete="current-password"
                                :class="{ 'input-error': isSubmitted && !form.password }"
                                class=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                            >
                        </div>
                        <small class="error-message mt-1" v-if="isSubmitted && !form.password">Preenchimento obrigatório</small>
                        <div>
                            <button type="submit"
                                class="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Entrar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import { defineComponent, onMounted, toRefs, reactive } from 'vue'
import UserAuthService from '../services/UserAuthService'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const store = useStore()
        const router = useRouter()
        const state = reactive({
            form: {
                password: '',
                email: ''
            },
            isSubmitted: false,
            error: false
        })
        const singIn = async () => {
            try {
                const data = {
                    email: state.form.email,
                    password: state.form.password
                }
                const response = await UserAuthService.userLogin(data)
                if (response.token) {
                    const token = response.token
                    store.dispatch('LOGIN', token)
                    router.push('/dashboard')
                }
            } catch (error) {
                console.error("Erro ao tentar fazer o login.", error)
            }
        }
        const validateForm = async () => {
            console.log('aqui')
            state.isSubmitted = true
            if (!state.form.email || !state.form.password || state.form.password.length < 3) {
                return false
            }
            await singIn()
        }
        onMounted(() => { })

        return {
            ...toRefs(state),
            validateForm,
            singIn
        }
    }
})
</script>

<style>
.input-error {
    border: 1px solid red;
}

.error-message {
    color: red;
}
</style>