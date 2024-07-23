<template>
  <nav
    class="fixed top-0 left-0 z-20 flex items-center justify-between w-full py-2 bg-white shadow-md border-b-2 border-primary-100">
    <div class="flex items-center space-x-4">
      <div class="text-xl m-3 font-bold">Bobby</div>
      <div v-for="(nav, index) in navigation" :key="index" class="hidden sm:flex space-x-4">
        <router-link :to="nav.path" class="py-2 px-4 rounded hover:bg-gray-200">{{ nav.name }}</router-link>
      </div>
    </div>
    <div class="sm:hidden">
      <button @click="$emit('toggle-menu')" class="py-2 px-4 hover:bg-gray-200">
        <svg aria-hidden="true" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
    </div>
    <div v-if="isMenuOpen" class="sm:hidden flex flex-col space-y-2 mt-4">
      <div v-for="(nav, index) in navigation" :key="index" class="flex flex-col space-y-2">
        <router-link :to="nav.path" class="py-2 px-4 hover:bg-gray-200">{{ nav.name }}</router-link>
      </div>
    </div>
    <div class="m-3 ml-4 sm:block hidden" @click="logOut()">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 384.971 384.971">
        <g>
          <path
            d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03C192.485,366.299,187.095,360.91,180.455,360.91z" />
          <path
            d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
        </g>
      </svg>
    </div>
  </nav>
</template>

<script>
import { defineComponent, onMounted, toRefs, reactive } from "vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

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
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const logOut = () => {
      store.dispatch('LOGOUT')
      router.push('/login')
    }

    return {
      logOut
    }
  }
})
</script>
