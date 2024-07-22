<template>
    <section class="mx-16 my-10">
        <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <BarChart />
            <PieChart />
            <VerticalBarChart />
            <LineChart />
        </div>
    </section>
</template>


<script>
import { defineComponent } from 'vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import VerticalBarChart from './VerticalBarChart.vue'
import LineChart from './LineChart.vue'

export default defineComponent({
    components: {
        BarChart,
        PieChart,
        VerticalBarChart,
        LineChart,
    }
})
</script>
