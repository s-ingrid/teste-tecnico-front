<template>
    <section class="relative mx-4 my-6 sm:mx-8 sm:my-8 lg:mx-16 lg:my-10">
        <div class="flex flex-col lg:flex-row">
            <div class="w-full lg:w-80 mb-8 lg:mb-0 lg:mr-8">
                <UserMotion :users="users" />
            </div>
            <div class="flex-grow grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <BarChart />
                <PieChart />
                <VerticalBarChart />
                <LineChart />
            </div>
        </div>
    </section>
</template>


<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import VerticalBarChart from './VerticalBarChart.vue'
import LineChart from './LineChart.vue'
import UserMotion from './UserMotion.vue'
import { mockUsers } from '../mockData'

export default defineComponent({
    components: {
        BarChart,
        PieChart,
        VerticalBarChart,
        LineChart,
        UserMotion
    },
    setup() {
        const state = reactive({
            users: []
        })
        onMounted(() => {
            let index = 0;
            const interval = setInterval(() => {
                if (index < mockUsers.length) {
                    state.users.push(mockUsers[index])
                    index++
                } else {
                    clearInterval(interval)
                }
            }, 1000)
        })

        return {
            ...toRefs(state)
        }
    }
})
</script>
