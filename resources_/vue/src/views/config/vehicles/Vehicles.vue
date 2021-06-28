<template>
  <div id="data-list-list-view" class="data-list-container">

    <vehicle-form :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData"/>

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="refinedVehicles">

      <!-- Top Actions -->
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <vs-icon class="mr-2" icon="local_shipping" size="large" color="primary"></vs-icon>
          <h1 class="mr-6">
            Vehicles
          </h1>

          <!-- ADD NEW -->
          <vs-button id="loading" class="mr-6 vs-con-loading__container " @click="showVehicleForm">Add Vehicle</vs-button>

          <v-select v-model="selectedDepot" class="mr-6" :clearable="false" :reduce="item => item.id"
                    :options="availableDepots" label="depot_name" />

        </div>

      </div>
      <!-- [end] Top Actions -->

      <template slot="thead">
        <vs-th > Vehicle</vs-th>
        <vs-th > Type</vs-th>
        <vs-th> Staff</vs-th>
        <vs-th>Status</vs-th>
        <vs-th>Remove</vs-th>
      </template>

      <!-- Table data -->
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="item" :key="rowIndex" v-for="(item, rowIndex) in data">

          <vs-td>
            <p class="product-name font-medium truncate">{{ item.make }} {{ item.licence_plate_number }}</p>
          </vs-td>

          <vs-td>
            <p class="product-category">{{ item.vehicle_type  }} </p>
          </vs-td>

          <vs-td>
             <vs-chip color="#8a5a44" v-if="item.staff"> {{ item.staff.staff_name }} </vs-chip>
            <vs-chip color="grey" v-else> No Staff </vs-chip>
          </vs-td>


          <vs-td class="whitespace-no-wrap">
            <p class="product-category">
              <vs-chip :color="getOrderStatusColor(item.vehicle_status)" class="product-order-status">{{ item.vehicle_status }}</vs-chip>
            </p>
          </vs-td>

          <vs-td class="whitespace-no-wrap">
            <vs-button color="secondary" class="mr-2" size="small" type="border" @click="editVehicle(item)">Edit</vs-button>
            <vs-button color="danger" size="small" type="border" @click="confirmDepotDeletion(item)">Delete</vs-button>
          </vs-td>

        </vs-tr>
        </tbody>
      </template>
      <!-- [end] Table data -->


    </vs-table>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import VehicleForm from './VehicleSideForm'
import axios from "@/axios";

export default {
  components: {
    VehicleForm,
    vSelect
  },

  data() {
    return {
      selected: [],
      rawVehicles: [],
      depotInstance: null,

      itemsPerPage: 100,
      isMounted: false,

      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {},

      /***Resources **/
      availableDepots: [],
      availableStaff: [],
      selectedDepot: { "id": null, "depot_name": "All Depots" }

    }
  },

  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },

    refinedVehicles() {
      return this.rawVehicles.map(function (vehicle) {
        return vehicle;
      });
    }

  },

  methods: {

    fetchVehicles(depotId) {
      this.$vs.loading({background: this.backgroundLoading, container: "#loading", scale: 0.45})
      console.info("fetching vehicles..");
      axios.get('/resources/assets/vehicles?depot_id='+depotId)
        .then((response) => {
          this.rawVehicles = response.data.payload.vehicles.data;
          this.$vs.loading.close("#loading > .con-vs-loading")
        }).catch((error) => {
        console.log(error)
      })
    },

    confirmDepotDeletion(depot) {
      this.depotInstance = depot;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove ' + this.depotInstance.depot_name,
        accept: this.removeDepot
      })
    },

    removeDepot() {
      this.$vs.loading({background: this.backgroundLoading, container: "#depotLoading", scale: 0.45})
      axios.post('/config/assets/depot/remove', {id: this.depotInstance.id})
        .then((response) => {
          this.fetchVehicles();
        }).catch((error) => {
        console.log(error);
        this.$vs.loading.close("#depotLoading > .con-vs-loading");
      })

    },

    showVehicleForm() {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },

    editVehicle(depotItem) {
      this.sidebarData = depotItem
      this.toggleDataSidebar(true)
    },

    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val
      this.fetchVehicles();
    },

    /** Resources & Helpers **/
    fetchDepots() {
      console.info("fetching depots..");
      console.info(JSON.stringify(this.selectedDepot));

      axios.get('/resources/assets/depots')
        .then((response) => {
          this.availableDepots = response.data.payload.depots.data;
        }).catch((error) => {
        console.log(error)
      })
    },

    getOrderStatusColor(status){
      if (status === 'Active')   return 'success'
      return 'danger'
    }



  },

  watch: {
    selectedDepot: function (selectedDepotId) {
         this.fetchVehicles(selectedDepotId);
     }
  },

  created() {
  },
  mounted() {
    this.fetchDepots();
    this.fetchVehicles();
    this.isMounted = true
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;

      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .05);

        td {
          padding: 20px;

          &:first-child {
            border-top-left-radius: .5rem;
            border-bottom-left-radius: .5rem;
          }

          &:last-child {
            border-top-right-radius: .5rem;
            border-bottom-right-radius: .5rem;
          }
        }

        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }

      th.td-check {
        padding: 0 15px !important;
      }

      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
