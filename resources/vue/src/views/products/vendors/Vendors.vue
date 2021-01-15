
<template>
  <div id="data-list-list-view" class="data-list-container">

    <vendor-form :isSidebarActive="showVendorFormSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table"  v-model="selectedVendor" pagination :max-items="itemsPerPage" search :data="refinedVendors">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <vs-icon class="mr-2" icon="business_center" size="large" color="primary"></vs-icon>
          <h1 class="mr-6">
            Vendors
          </h1>

          <!-- Add Vendor Button -->
          <vs-button icon="add" id="vendorLoading" type="border" @click="showVendorForm"
                     class="mr-4 vs-con-loading__container">Add Vendor</vs-button>

          <!-- Filter By Region -->
          <v-select v-model="selectedRegionId" class="mr-6" :clearable="false" :reduce="item => item.id"
                    :options="availableRegions" label="region_name" />

        </div>

      </div>

      <template slot="thead">
        <vs-th sort-key="name">Name</vs-th>
        <vs-th sort-key="category">Location</vs-th>
         <vs-th>Edit</vs-th>
         <vs-th>Remove</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="item" :key="rowIndex" v-for="(item, rowIndex) in data">

          <vs-td>
            <p class="product-name font-medium truncate">{{ item.vendor_name }}</p>
          </vs-td>

          <vs-td>
            <p class="product-category">{{ item.location_name | title }} </p>
          </vs-td>

          <vs-td class="whitespace-no-wrap">
            <vs-button color="secondary" class="mr-2" size="small" type="border" @click="editData(item)">Edit</vs-button>
           </vs-td>

          <vs-td class="whitespace-no-wrap">
            <vs-button color="danger" size="small" type="border" @click="confirmVendorDeletion(item)">Delete</vs-button>
           </vs-td>

        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import vendorForm from './VendorSideForm'
import axios from "@/axios";
import vSelect from 'vue-select'

export default {
  components: {
    vendorForm,
    vSelect
  },

  data () {
    return {
      selectedVendor: {},
      rawVendors: [],
      vendorInstance: null,

      itemsPerPage: 100,
      isMounted: false,

      // Data Sidebar
      showVendorFormSidebar: false,
      sidebarData: {},

      selectedRegionId: { "id": null, "region_name": "All Regions" },
      availableRegions: []

    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },

    refinedVendors (){
      return this.rawVendors.map(function (vendor) {

        let name= "";
        name = vendor.place ? vendor.place.place_name : "";
        name = vendor.district ? name + " "+vendor.district.district_name : name;
        name = vendor.region ? name + " "+vendor.region.region_name : name;

        vendor.location_name = name;
        return  vendor;
      });
    }

  },
  methods: {

    fetchVendors(){
      console.log(JSON.stringify(this.selectedRegionId));

      this.rawVendors = [];
      this.$vs.loading({ background: this.backgroundLoading, container: "#vendorLoading", scale: 0.45 })
      console.info("fetching vendors..");
      axios.get('/resources/products/vendors?region_id='+this.selectedRegionId)
        .then((response) => {
          this.rawVendors = response.data.payload.vendors.data;
          this.$vs.loading.close("#vendorLoading > .con-vs-loading")
        }).catch((error) => {
        console.log(error)
      })
    },

    confirmVendorDeletion(vendor){
      this.vendorInstance = vendor;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove '+this.vendorInstance.vendor_name,
        accept: this.removeVendor
      })
    },

    removeVendor () {
      this.$vs.loading({ background: this.backgroundLoading, container: "#vendorLoading", scale: 0.45 })
      axios.post('/config/vendor/remove', { id : this.vendorInstance.id } )
        .then((response) => {
          this.fetchVendors();
        }).catch((error) => {
        console.log(error);
        this.$vs.loading.close("#vendorLoading > .con-vs-loading");
      })

    },

    showVendorForm () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },

    editData (vendorItem) {
      this.sidebarData = vendorItem
      this.toggleDataSidebar(true)
    },

    getOrderStatusColor (status) {
      if (status === 'on_hold')   return 'warning'
      if (status === 'delivered') return 'success'
      if (status === 'canceled')  return 'danger'
      return 'primary'
    },

    getPopularityColor (num) {
      if (num > 90)  return 'success'
      if (num > 70)  return 'primary'
      if (num >= 50) return 'warning'
      if (num < 50)  return 'danger'
      return 'primary'
    },

    toggleDataSidebar (val = false) {
      this.showVendorFormSidebar = val
      this.fetchVendors();
    },

    /*** Resources **/
    fetchRegions() {
      console.info("fetching regions..");
      console.info(JSON.stringify(this.selectedVendor));
      axios.get('/resources/addresses/regions?country_id=1')
        .then((response) => {
          this.availableRegions = response.data.payload.regions;
          this.availableRegions.unshift({ "id": null, "region_name": "All Regions" });

        }).catch((error) => {
        console.log(error)
      })
    }

  },
  watch: {
    selectedRegionId: function (val) {
      this.fetchVendors();
    },
    selectedVendor: function (newVal){
      console.log(JSON.stringify(newVal));
    }
  },

  created () {
    this.fetchRegions();
   },
  mounted () {
    this.fetchVendors();
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

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
        box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
        td{
          padding: 20px;
          &:first-child{
            border-top-left-radius: .5rem;
            border-bottom-left-radius: .5rem;
          }
          &:last-child{
            border-top-right-radius: .5rem;
            border-bottom-right-radius: .5rem;
          }
        }
        td.td-check{
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
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
