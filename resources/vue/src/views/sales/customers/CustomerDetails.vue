
<template>
  <div id="page-user-view">

    <div id="user-data"  >

      <vx-card title="Customer" class="mb-base">

        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img  :src="require('@/assets/ajab/images/user_.png')" class="rounded w-full" />
            </div>
          </div>
          <!-- [end] Avatar Col -->

          <!-- Primary Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Name</td>
                <td> {{  customer.customer_name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Phone </td>
                <td>{{  customer.phone_number_1 }}, {{  customer.phone_number_2 }} </td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{  customer.email }}</td>
              </tr>
            </table>
          </div>
          <!-- / Primary Information - Col 1 -->

          <!-- Information - Status, Role, Last seen-->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Status</td>
                <td>Active</td>
              </tr>

              <tr>
                <td class="font-semibold">Last Seen</td>
                <td>January 7th 2020</td>
              </tr>
              <tr>
                <td class="font-semibold">Added by</td>
                <td>{{  customer.creator? customer.creator.name : "Unknown"  }}</td>
              </tr>
            </table>
          </div>

           <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button v-if="!(customer.verified)" @click="verifyCustomer()" icon-pack="feather" color="secondary"
                       icon="icon-check" class="mr-4">Verify</vs-button>

             <vs-chip size="large" v-else color="success">
               <vs-avatar color="secondary" icon-pack="feather" icon="icon-check" />
               Verified
             </vs-chip>
          </div>

        </div>

      </vx-card>

      <!-- Orders  -->
      <div class="vx-row">
        <div class="vx-col   w-full">
          <vx-card title="Orders">
            <vs-table ref="table"  pagination :max-items="100"  :data="orders">

              <template slot="thead">
                <vs-th sort-key="name">#</vs-th>
                 <vs-th >Address</vs-th>
                <vs-th >Status</vs-th>
                <vs-th>Date</vs-th>
                <vs-th></vs-th>
                <vs-th>Sales Person</vs-th>
              </template>

              <template slot-scope="{data}">
                <tbody>
                <vs-tr :data="item" :key="rowIndex" v-for="(item, rowIndex) in data">

                  <vs-td>
                    <p class="product-name font-medium truncate">{{ item.id   }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="product-category">
                      {{ item.place ?  item.place.place_name : " "  }}
                      {{ item.district? item.district.district_name : " "  }}
                      {{ item.region? item.region.region_name : " "  }}
                    </p>
                  </vs-td>


                  <vs-td>
                    <vs-chip color="success" v-if="item.is_delivered">Delivered</vs-chip>
                    <vs-chip color="danger" v-else-if="item.is_cancelled">Cancelled</vs-chip>
                    <vs-chip color="#8a5a44" v-else>Pending</vs-chip>
                  </vs-td>

                  <vs-td> {{ item.created_at }}</vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <vs-button color="secondary" class="mr-2" size="small" type="border"  >View</vs-button>
                  </vs-td>

                  <vs-td> </vs-td>

                </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </vx-card>

        </div>

       </div>

      <div class="vx-row my-6">
        <div class="vx-col lg:w-1/2 w-full">
        <div class="flex">
          <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash"
                     @click="confirmDeleteRecord">Delete Customer</vs-button>

          <vs-button type="border" class="ml-6"  icon-pack="feather" v-if="customer.verified"
                     @click="verifyCustomer(false)">Unverify Customer</vs-button>
        </div>
        </div>
      </div>


    </div>

    <!-- Customer form -->
    <vs-popup @close="closeCustomerForm()"
              fullscreen title="Customer Info" :active.sync="userFormVisible">
      <div >
      </div>
    </vs-popup>
    <!-- [end] Customer form -->

  </div>
</template>

<script>

import axios from "@/axios";
import {handle} from "@/http/handler";

export default {
  components: {
  },
  props: {
    customerId: [String, Number]
  },
  data () {
    return {
      user_data: null,
      user_not_found: false,
      customer: {
        "id": '',
        "user_id": '',
        "customer_name": '',
        "phone_number": '',
        "email": '',
        "created_at": ''
      },

      userFormDialog: false,
      orders: []
    }
  },
  computed: {
    userFormVisible(){
      return this.$store.state.general.userFormVisible;
    }
  },

  watch: {
    userFormVisible: function (newValue) {
      this.fetchCustomerDetails();
    }
  },
  methods: {

    fetchCustomerDetails() {
      axios.get('/resources/sales/customer/details?id='+this.customerId)
     .then((response) => {
        this.customer = response.data.payload.customer;
      }).catch((error) => {
        console.log(error)
        this.handleApiError(error)
      })
    },

    deleteCustomer() {
      axios.post('/config/customer/user/remove',{
        id : this.customerId
      }).then((response) => {
        this.$router.go(-1);
      }).catch((error) => {
        console.log(error)
        this.handleApiError(error)
      })
    },

    verifyCustomer(value = true) {
      axios.post('/sales/customer/verify',{
        id : this.customerId, value:  value
      }).then((response) => {
        this.happilyNotify("Verification status updated");
        this.fetchCustomerDetails();
      }).catch((error) => {
        console.log(error)
        this.handleApiError(error)
      })
    },

    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.customer.customer_name}"`,
        accept: this.deleteCustomer,
        acceptText: 'Delete'
      })
    },

    showCustomerForm() {
      this.$store.commit('general/TOGGLE_USER_FORM', true)
    },
    closeCustomerForm() {
      this.$store.commit('general/TOGGLE_USER_FORM', false)
    },
    navigateToCustomers(){
      this.$router.push({ name: 'sales-customers'})
    },

    /** orders **/
    fetchCustomerOrders(){
        axios.get('/resources/sales/customer/orders?customer_id='+this.customerId)
          .then((response) => {
            this.orders = response.data.payload.orders.data;
           }).catch((error) => {
          console.log(error)
          this.handleApiError(error)
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
    },

    sadlyNotify(message){
      this.$vs.notify({ title: 'Error',  text: message, color: 'danger',position:'bottom-left'})
    }

  },

  created () {
    console.log("CustomerDetails: CustomerID:"+this.customerId);
    if(this.customerId){
      this.fetchCustomerDetails();
      this.fetchCustomerOrders();
    }else{
     this.navigateToCustomers();
    }
  }
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

}

</style>
