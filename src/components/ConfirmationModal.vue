<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300" @click="$emit('close')">
        </div>
        <div class="relative bg-white rounded-lg p-6 shadow-lg z-10 max-w-sm">
            <h2 class="text-xl font-bold mb-4">{{ dialog.titleMessage }}</h2>
            <p class="mb-4">{{ dialog.message }}</p>
            <div class="flex justify-end">
                <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                    Não
                </button>
                <button type="button" @click="$emit('confirm')" class="bg-red-500 text-white px-4 py-2 rounded">
                    Sim
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        dialog: {
            type: Object,
            default: () => {}
        }
    }
})
</script>