<template>
  <b-card title="Pengajuan KP Menurut Jurusan">
    <!-- chart -->
    <chartjs-component-doughnut-chart
      :height="275"
      :data="doughnutChart.data"
      :options="doughnutChart.options"
      class="mb-3"
    />
    <!--/ chart -->

    <!-- stocks -->
    <div
      v-for="(stock,index) in stockData"
      :key="stock.device"
      :class="index < stockData.length-1 ? 'mb-1':''"
      class="d-flex justify-content-between"
    >
      <div class="d-flex align-items-center">
        <span class="font-weight-bold ml-75 mr-25">{{ stock.device }}</span>
      </div>
      <div>
        <span>{{ stock.percentage }}%</span>
      </div>
    </div>
    <!--/ stocks -->
  </b-card>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { $themeColors } from '@themeConfig'
import ChartjsComponentDoughnutChart from './charts-components/ChartjsComponentDoughnutChart.vue'

export default {
  components: {
    ChartjsComponentDoughnutChart,
    BCard,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {

      doughnutChart: {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          responsiveAnimationDuration: 500,
          cutoutPercentage: 60,
          legend: { display: false },
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                const label = data.datasets[0].labels[tooltipItem.index] || ''
                const value = data.datasets[0].data[tooltipItem.index]
                const output = ` ${label} : ${value} %`
                return output
              },
            },
            // Updated default tooltip UI
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 8,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            backgroundColor: $themeColors.light,
            titleFontColor: $themeColors.dark,
            bodyFontColor: $themeColors.dark,
          },
        },
        data: {
          datasets: [
            {
              labels: ['Informatika', 'Teknik Elektro', 'Teknik Sipil'],
              data: [(this.data.kp.informatika / this.data.kp.kuantitas) * 100, (this.data.kp.elektro / this.data.kp.kuantitas) * 100, (this.data.kp.sipil / this.data.kp.kuantitas) * 100],
              backgroundColor: ['#28dac6', '#ffe802', $themeColors.primary],
              borderWidth: 0,
              pointStyle: 'rectRounded',
            },
          ],
        },
      },
      stockData: [
        {
          device: 'Informatika', color: 'text-primary', percentage: (this.data.kp.informatika / this.data.kp.kuantitas) * 100,
        },
        {
          device: 'Teknik Sipil', color: 'text-warning', percentage: (this.data.kp.sipil / this.data.kp.kuantitas) * 100,
        },
        {
          device: 'Teknik Elektro', color: 'text-success', percentage: (this.data.kp.elektro / this.data.kp.kuantitas) * 100,
        },
      ],
    }
  },
}
</script>
