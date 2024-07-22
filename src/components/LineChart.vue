<template>
  <div class="p-4 bg-white shadow-lg rounded-lg">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
      class="w-full"
    ></apexchart>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  components: {
    apexchart: VueApexCharts
  },
  setup() {
    const state = reactive({
      series: [{
        name: 'Novos Usuários',
        data: [100, 250, 180, 100, 200, 300]
      }],
      chartOptions: {
        chart: {
          type: 'line',
          height: 350,
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"]
        },
        title: {
          text: 'Tendência Cadastro de Usuários'
        }
      }
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>