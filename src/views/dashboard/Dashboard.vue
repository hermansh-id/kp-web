<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col
        xl="8"
        md="6"
      >
        <ecommerce-statistics :data="data.statisticsItems" />
      </b-col>
    </b-row>

  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

// import EcommerceMedal from './EcommerceMedal.vue'
import EcommerceStatistics from './EcommerceStatistics.vue'
// import EcommerceRevenueReport from './EcommerceRevenueReport.vue'
// import EcommerceOrderChart from './EcommerceOrderChart.vue'
// import EcommerceProfitChart from './EcommerceProfitChart.vue'
// import EcommerceEarningsChart from './EcommerceEarningsChart.vue'
// import EcommerceCompanyTable from './EcommerceCompanyTable.vue'
// import EcommerceMeetup from './EcommerceMeetup.vue'
// import EcommerceBrowserStates from './EcommerceBrowserStates.vue'
// import EcommerceGoalOverview from './EcommerceGoalOverview.vue'
// import EcommerceTransactions from './EcommerceTransactions.vue'

export default {
  components: {
    BRow,
    BCol,

    // EcommerceMedal,
    EcommerceStatistics,
    // EcommerceRevenueReport,
    // EcommerceOrderChart,
    // EcommerceProfitChart,
    // EcommerceEarningsChart,
    // EcommerceCompanyTable,
    // EcommerceMeetup,
    // EcommerceBrowserStates,
    // EcommerceGoalOverview,
    // EcommerceTransactions,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
