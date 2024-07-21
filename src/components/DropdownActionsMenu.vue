<template>
    <div class="relative inline-block text-left">
        <button @click="toggleDropdown"
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-100 rounded-lg text-sm p-1.5"
            type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 16 3">
                <path
                    d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
        </button>
        <div v-if="dropdownOpen"
            class="absolute right-0 z-10 mt-2 w-44 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-200">
            <ul class="py-2">
                <li v-for="option in options" :key="option.text">
                    <a @click.prevent="handleClick(option.action, user)" :class="option.class + ' block px-4 py-2 text-sm cursor-pointer'">{{ option.text }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
    props: {
        options: {
            type: Array,
            required: true,
            default: () => [],
        },
        user: {
            type: Object,
            required: true,
            default: () => {},
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            dropdownOpen: false
        })
        const toggleDropdown = () => {
            state.dropdownOpen = !state.dropdownOpen
        }
        const handleClick = (action, user) => {
            emit('action', { action, user })
            state.dropdownOpen = false
        }
        return {
            ...toRefs(state),
            toggleDropdown,
            handleClick
        }
    }
})
</script>
