<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row">

      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="DollarSignIcon" statistic="TSH 975M" statisticTitle="Day Sales" :chartData="subscribersGained.series" color="success" type="area"></statistics-card-line>
      </div>

      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="PackageIcon" statistic="Azania HBF" statisticTitle="Top Product" :chartData="productTrend.series" type="area"></statistics-card-line>
      </div>



      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="ShoppingBagIcon" statistic="12K" statisticTitle="Orders Received" :chartData="orderTrend.series" color="secondary" type="area"></statistics-card-line>
      </div>

      <!-- CARD 3: ORDER RECIEVED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line icon="UsersIcon" statistic="65K" statisticTitle="Monthly Customers" :chartData="customersTrend.series" color="warning" type="area"></statistics-card-line>
      </div>
    </div>

    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Top Products">
          <div slot="no-body" class="mt-4">
            <vs-table :data="dispatchedOrders" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>PRODUCT.</vs-th>
                <vs-th>ORDERS</vs-th>
                <vs-th>DELIVERIES</vs-th>
                <vs-th>INCREASE</vs-th>
                <vs-th>STOCK</vs-th>
                </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].orderNo">
                    <span>#{{data[indextr].orderNo}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].status">
                    <span class="flex items-center px-2 py-1 rounded">
                      <div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + data[indextr].statusColor"></div>{{data[indextr].status}}</span>
                  </vs-td>
                   <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].location}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].distance}}</span>
                    <vs-progress :percent="data[indextr].distPercent" :color="data[indextr].statusColor"></vs-progress>
                  </vs-td>

                </vs-tr>
              </template>
            </vs-table>
          </div>

        </vx-card>
      </div>
    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from './ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import VxTimeline from '@/components/timeline/VxTimeline'

export default {
  data () {
    return {
      checkpointReward: {},
      ordersRecevied: {},
      salesBarSession: {},
      supportTracker: {},
      productsOrder: {},
      salesRadar: {},

      timelineData: [
        {
          color: 'primary',
          icon: 'PlusIcon',
          title: 'Client Meeting',
          desc: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
          time: '25 mins Ago'
        },
        {
          color: 'warning',
          icon: 'MailIcon',
          title: 'Email Newsletter',
          desc: 'Cupcake gummi bears soufflé caramels candy',
          time: '15 Days Ago'
        },
        {
          color: 'danger',
          icon: 'UsersIcon',
          title: 'Plan Webinar',
          desc: 'Candy ice cream cake. Halvah gummi bears',
          time: '20 days ago'
        },
        {
          color: 'success',
          icon: 'LayoutIcon',
          title: 'Launch Website',
          desc: 'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.',
          time: '25 days ago'
        },
        {
          color: 'primary',
          icon: 'TvIcon',
          title: 'Marketing',
          desc: 'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.',
          time: '28 days ago'
        }
      ],

      analyticsData,
      dispatchedOrders: [],

      subscribersGained: {
        series: [
          {
            name: 'Subscribers',
            data: [28, 40, 36, 52, 38, 60, 55]
          }
        ],
        analyticsData: {
          subscribers: 92600
        }
      },
      productTrend: {
        series: [
          {
            name: 'Subscribers',
            data: [28, 40, 36, 11, 38, 24, 55]
          }
        ],
        analyticsData: {
          subscribers: 92600
        }
      },
      orderTrend: {
        series: [
          {
            name: 'Subscribers',
            data: [28, 40, 36, 52, 38, 45, 28]
          }
        ],
        analyticsData: {
          subscribers: 92600
        }
      },
      customersTrend: {
        series: [
          {
            name: 'Subscribers',
            data: [50, 40, 36, 52, 38, 45, 50]
          }
        ],
        analyticsData: {
          subscribers: 92600
        }
      },

      topProduct: [
        {}
        ,{},
        {}
      ]
    }
  },

  components: {
    VueApexCharts,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline
  },

  created () {
    //  User Reward Card
    // this.$http.get('/api/user/checkpoint-reward')
    //   .then((response) => { this.checkpointReward = response.data })
    //   .catch((error)   => { console.log(error) })
    //
    //   // Subscribers gained - Statistics
    // this.$http.get('/api/card/card-statistics/subscribers')
    //   .then((response) => { this.subscribersGained = response.data })
    //   .catch((error)   => { console.log(error) })
    //
    //   // Orders - Statistics
    // this.$http.get('/api/card/card-statistics/orders')
    //   .then((response) => { this.ordersRecevied = response.data })
    //   .catch((error)   => { console.log(error) })
    //
    //   // Sales bar - Analytics
    // this.$http.get('/api/card/card-analytics/sales/bar')
    //   .then((response) => { this.salesBarSession = response.data })
    //   .catch((error)   => { console.log(error) })
    //
    //   // Support Tracker
    // this.$http.get('/api/card/card-analytics/support-tracker')
    //   .then((response) => { this.supportTracker = response.data })
    //   .catch((error)   => { console.log(error) })
    //
    //   // Products Order
    // this.$http.get('/api/card/card-analytics/products-orders')
    //   .then((response) => { this.productsOrder = response.data })
    //   .catch((error)   => { console.log(error) })
    //
    //   // Sales Radar
    // this.$http.get('/api/card/card-analytics/sales/radar')
    //   .then((response) => { this.salesRadar = response.data })
    //   .catch((error)   => { console.log(error) })
    //
    //   // Dispatched Orders
    // this.$http.get('/api/table/dispatched-orders')
    //   .then((response) => { this.dispatchedOrders = response.data })
    //   .catch((error)   => { console.log(error) })
  }

}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user{
    position: relative;

    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>
