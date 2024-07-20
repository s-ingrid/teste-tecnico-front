<template>
  <nav
    class="z-20 flex items-center justify-between w-full py-4 bg-white shadow-md border-b-2 border-primary-100"
  >
    <div class="flex items-center space-x-4">
      <div class="text-xl font-bold">MyApp</div>
      <div
        v-for="(nav, index) in navigation"
        :key="index"
        class="hidden sm:flex space-x-4"
      >
        <router-link :to="nav.path" class="py-2 px-4 hover:bg-gray-200">{{ nav.name }}</router-link>
      </div>
    </div>
    <div class="sm:hidden">
      <button @click="$emit('toggle-menu')" class="py-2 px-4 hover:bg-gray-200">
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
    </div>
    <div v-if="isMenuOpen" class="sm:hidden flex flex-col space-y-2 mt-4">
        <div
            v-for="(nav, index) in navigation"
            :key="index"
            class="hidden sm:flex space-x-4"
        >
            <router-link :to="nav.path" class="py-2 px-4 hover:bg-gray-200">{{ nav.name }}</router-link>
        </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, onMounted, toRefs, reactive } from "vue";

export default defineComponent({
  props: {
    navigation: {
      type: Array,
      default: [],
    },
    isMenuOpen: {
      type: Boolean,
      default: false,
    },
  }
})
</script>
