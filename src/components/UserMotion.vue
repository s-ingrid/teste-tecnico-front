<!-- src/components/UserMotion.vue -->
<template>
  <div class="mt-16">
    <h2 v-if="users.length > 0" class="text-lg font-semibold m-2">Últimos usuários cadastrados</h2>
    <div 
      v-for="user in users" 
        :key="user.id"
        v-motion
        :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
      }"
      class="p-4 bg-white rounded-sm shadow-lg mb-4"
    >
      <p class="text-sm font-semibold">{{ user.first_name }} {{ user.last_name  }}</p>
      <p class="text-gray-500">{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});
</script>
