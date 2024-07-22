<template>
  <div class="p-4 bg-white shadow-lg rounded-lg">
    <apexchart
      type="bar"
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
      series: [{
        data: [1, 2, 1, 1, 2, 3]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#58adfe'],
        xaxis: {
          categories: ["B", "G", "L", "M", "R", "T"]
        },
        title: {
          text: 'Contagem de Usuários por Inicial do Primeiro Nome'
        }
      }
    })
    return {
      ...toRefs(state)
    }
      
  }
});
</script>