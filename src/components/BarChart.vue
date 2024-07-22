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
      series: [
        {
          name: 'Usuários',
          data: [250, 280, 130, 370, 240, 160]
        }
      ],
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
            horizontal: true
          }
        },
        colors: ['#b2d03e'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ["Nova York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"]
        },
        title: {
          text: 'Contagem de Usuários por Cidade'
        }
      }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>