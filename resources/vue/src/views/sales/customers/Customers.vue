
<template>
  <div id="data-list-list-view" class="data-list-container">

    <customer-form :isSidebarActive="showCustomerFormSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="refinedCustomers">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <vs-icon class="mr-2" icon="groups" size="large" color="primary"></vs-icon>
          <h1 class="mr-6">
            Customers
          </h1>

          <!-- Filter By Region -->
          <v-select v-model="selectedRegionId" class="mr-6" :clearable="false" :reduce="item => item.id"
                    :options="availableRegions" label="region_name" />

          <!-- Add Customer Button -->
          <vs-button icon="add" id="customerLoading"  @click="showCustomerForm"
                     class="mr-4 vs-con-loading__container">Add Customer</vs-button>

        </div>

      </div>

      <template slot="thead">
        <vs-th sort-key="name">Name</vs-th>
        <vs-th sort-key="category">Location</vs-th>
         <vs-th>Action</vs-th>
         <vs-th>Action</vs-th>
         <vs-th>Action </vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="item" :key="rowIndex" v-for="(item, rowIndex) in data">

          <vs-td>
            <p class="product-name font-medium truncate">{{ item.customer_name  }}</p>
          </vs-td>

          <vs-td>
            <p class="product-category">{{ item.location_name | title }} </p>
          </vs-td>

          <vs-td class="whitespace-no-wrap">
            <vs-button color="secondary" class="mr-2" size="small" type="border" @click="editData(item)">Edit</vs-button>
           </vs-td>

          <vs-td class="whitespace-no-wrap">
            <vs-button color="secondary" class="mr-2" size="small" type="border"
                       :to="{ name: 'sales-customer-details', params: { customerId: item.id  }}"
            >Open</vs-button>

           </vs-td>

          <vs-td class="whitespace-no-wrap">
            <vs-button color="danger" size="small" type="border" @click="confirmCustomerDeletion(item)">Delete</vs-button>
           </vs-td>

        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import CustomerForm from './CustomersSideForm'
import axios from "@/axios";
import vSelect from 'vue-select'
import {handle} from "@/http/handler";

export default {
  components: {
    CustomerForm,
    vSelect
  },

  data () {
    return {
      selected: [],
      rawCustomers: [],
      customerInstance: null,

      itemsPerPage: 4,
      isMounted: false,

      // Data Sidebar
      showCustomerFormSidebar: false,
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

    refinedCustomers (){
      return this.rawCustomers.map(function (customer) {

        let name= "";
        name = customer.place ? customer.place.place_name : "";
        name = customer.district ? name + " "+customer.district.district_name : name;
        name = customer.region ? name + " "+customer.region.region_name : name;

        customer.location_name = name;
        return  customer;
      });
    }

  },
  methods: {

    fetchCustomers(){
      console.log(JSON.stringify(this.selectedRegionId));

      this.rawCustomers = [];
      this.$vs.loading({ background: this.backgroundLoading, container: "#customerLoading", scale: 0.45 })
      console.info("fetching customers..");
      axios.get('/resources/sales/customers?region_id='+this.selectedRegionId)
        .then((response) => {
          this.rawCustomers = response.data.payload.customers.data;
          this.$vs.loading.close("#customerLoading > .con-vs-loading")
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },

    confirmCustomerDeletion(customer){
      this.customerInstance = customer;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove '+this.customerInstance.customer_name,
        accept: this.removeCustomer
      })
    },

    removeCustomer () {
      this.$vs.loading({ background: this.backgroundLoading, container: "#customerLoading", scale: 0.45 })
      axios.post('/sales/customer/remove', { id : this.customerInstance.id } )
        .then((response) => {
          this.fetchCustomers();
          this.happilyNotify("Customer removed")
        }).catch((error) => {
        console.log(error);
        this.$vs.loading.close("#customerLoading > .con-vs-loading");
        this.handleApiError(error);

      })

    },

    showCustomerForm () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },

    editData (customerItem) {
      this.sidebarData = customerItem
      this.toggleDataSidebar(true)
    },

    toggleDataSidebar (val = false) {
      this.showCustomerFormSidebar = val
      this.fetchCustomers();
    },

    showCustomerDetails(customer){
      this.customerInstance = customer;
    },

    /*** Resources **/
    fetchRegions() {
      console.info("fetching regions..");
      console.info(JSON.stringify(this.selectedCustomer));
      axios.get('/resources/addresses/regions?country_id=1')
        .then((response) => {
          this.availableRegions = response.data.payload.regions;
          this.availableRegions.unshift({ "id": null, "region_name": "All Regions" });

        }).catch((error) => {
        console.log(error)
      })
    },

    /** Helpers **/
    handleApiError(error){
      this.$vs.notify({
        title: 'Error',
        text: handle(error),
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })
    },

    happilyNotify(message){
      this.$vs.notify({ title: 'Success',  text: message, color: 'success'})
    }

  },
  watch: {
    selectedRegionId: function (val) {
      this.fetchCustomers();
    }
  },

  created () {
    this.fetchRegions();
   },
  mounted () {
    this.fetchCustomers();
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
