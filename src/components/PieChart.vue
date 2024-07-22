<template>
  <div class="p-4 bg-white shadow-lg rounded-lg">
    <apexchart
      type="pie"
      height="350"
      :options="chartOptions"
      :series="series"
      class="w-full"
    ></apexchart>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

export default defineComponent({
  components: {
    apexchart: VueApexCharts
  },
  setup() {
    const state = reactive({
      series: [70, 30],
      chartOptions: {
        chart: {
          type: 'pie',
          height: 350
        },
        labels: ["Cadastrados", "Excluídos"],
        title: {
          text: 'Proporção de Usuários Cadastrados e Excluídos'
        },
        legend: {
          position: 'bottom'
        },
        tooltip: {
          y: {
            formatter: (value) => `${value}%`
          }
        }
      }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>