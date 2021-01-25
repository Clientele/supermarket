<template>
  <div id="data-list-list-view" class="data-list-container">

    <div class="flex flex-wrap-reverse items-center flex-grow justify-between mb-6">

      <div class="flex  ">
        <vs-icon class="mr-2" icon="shopping_cart" size="large" color="primary"></vs-icon>
        <h1 class="mr-6">
          Order Details
        </h1>
      </div>

      <vs-button v-if="!(selectedOrder.is_cancelled)"   @click="rejectOrder()" color="warning"> Cancel Order</vs-button>
      <vs-chip v-else color="danger" >Order Cancelled </vs-chip>
    </div>

    <vs-card >
      <div   class="px-6 py-12">
        <div class="vx-row">

          <!-- Customer info -->
          <div class="vx-col md:w-1/2">

            <!-- Customer info -->
            <div class="mb-2 ">
              <span class="font-bold">Customer</span>
            </div>
            <div>
              <table>
                <tr>
                  <td class="pr-6">Name</td>
                  <td>{{ selectedOrder.customer ? selectedOrder.customer.customer_name : "No Customer" }}</td>
                </tr>
                <tr>
                  <td class="pr-6">Phone</td>
                  <td>
                    {{ selectedOrder.customer ? selectedOrder.customer.phone_number_1 : "No Phone" }}
                    {{ selectedOrder.customer ? selectedOrder.customer.phone_number_2 : "" }}
                  </td>
                </tr>
                <tr>
                  <td class="pr-6">Email</td>
                  <td>
                    {{ selectedOrder.customer ? selectedOrder.customer.email : "Email" }}
                  </td>
                </tr>
                <tr>
                  <td class="pr-6">Address</td>
                  <td>
                    {{ selectedOrder.place ? selectedOrder.place.place_name : " " }}
                    {{ selectedOrder.district ? selectedOrder.district.district_name : " " }}
                    {{ selectedOrder.region ? selectedOrder.region.region_name : " " }}
                  </td>
                </tr>
              </table>
            </div>

            <!-- Sales person -->
            <div class="mb-6">
              <div class="mb-2 mt-6">
                <span class="font-bold">Sales Person</span>
              </div>
              <table>
                <tr>
                  <td class="pr-6">Name</td>
                  <td>
                    <span v-bind:class="!(selectedOrder.staff) ? `danger--text`:`blue--text`" >{{ selectedOrder.staff ? selectedOrder.staff.staff_name : "No sales person" }}</span>
                  </td>
                </tr>

                <tr>
                  <td class="pr-6">Phone</td>
                  <td> {{ selectedOrder.staff ? selectedOrder.staff.phone_number : "No Phone" }}</td>
                </tr>
              </table>

              <div style="max-width: 320px" class="mt-4 mb-5 small-form">
                <h6 class="mb-4"> {{selectedOrder.staff? "Change":"Assign" }} Sales Person</h6>
                <v-select @input="setSalesPerson()" v-model="selectedStaff" :clearable="false"
                          :options="availableStaff" v-validate="'required'" name="Staff" label="staff_name"
                          placeholder="Select">
                </v-select>
                <span class="text-danger text-sm" v-show="errors.has('Staff')">{{ errors.first('Staff') }}</span>
              </div>
            </div>

          </div>


          <!-- Ordered product -->
          <div class="vx-col md:w-1/2 " v-if="selectedOrder.order_products">
            <div class="mb-6">
              <span class="font-bold">Ordered Products</span>
            </div>

            <vx-card class="overflow-hidden mb-6" v-for="(orderProduct,index) in selectedOrder.order_products"
                     :key="index">
              <div slot="no-body">
                <div class="p-6 flex justify-between flex-row-reverse items-center">
                  <vs-button v-if="!(selectedOrder.is_cancelled)" color="secondary"
                             @click="showAvailableProductsToDeliver(orderProduct)" class="p-3 inline-flex" >Deliver Products</vs-button>
                  <vs-chip v-else color="black" class=" inline-flex" >Order Cancelled </vs-chip>

                  <div class="truncate">
                    <h3 class="mb-1 font-bold">
                      {{ orderProduct.product ? orderProduct.product.product_name : "" }}
                      {{ orderProduct.variant ? orderProduct.variant.variant_name : " " }}
                    </h3>
                    <ul>
                      <li>Quantity {{ orderProduct.ordered_quantity }}</li>
                      <li>Delivered: {{ orderProduct.delivered_quantity }}</li>
                      <li>@TSH{{ orderProduct.selling_price }}</li>
                    </ul>
                  </div>
                </div>

              </div>
            </vx-card>
          </div>

        </div>
      </div>
    </vs-card>

    <!-- Delivery Form -->
    <
    <!-- Dispatch Form -->
    <vs-prompt :title="`Delivery`" :accept-text="`Delivery`" :cancel-text="`Cancel`"
               :color="`#118ab2`"
               @cancel="selectedTruckedProduct= null"
               @accept="deliverProduct()"
               :active.sync="deliveryForm">

      <!-- headings -->
      <h4 class="my-6" v-if="selectedTruckedProduct">Quantity to deliver</h4>
      <h4 class="my-6" v-else >Select stock</h4>


      <!-- input -->
      <div class="mb-6" v-if="selectedTruckedProduct">
        <vs-input placeholder="Quantity" vs-placeholder="Quantity" v-model="quantityToDeliver" class="mt-3 w-full"/>
      </div>

      <!-- stocks -->
      <div v-if="selectedTruckedProduct"  class="product-item-active">
        <p>
          {{ selectedTruckedProduct.product? selectedTruckedProduct.product.product_name : "" }}
          {{ selectedTruckedProduct.variant? selectedTruckedProduct.variant.variant_name : "" }}
        </p>
        <p>Remaining: {{ selectedTruckedProduct.remaining_quantity}} </p>
        <p>Created at: {{ selectedTruckedProduct.created_at }} </p>
      </div>

      <div v-else>
       <div @click="selectedTruckedProduct=truckedProduct"
            class="product-item"
            v-for="(truckedProduct, index) in availableTruckedProducts" :key="index">

         <div>
           <p>
             {{ truckedProduct.product? truckedProduct.product.product_name : "" }}
             {{ truckedProduct.variant? truckedProduct.variant.variant_name : "" }}
           </p>
           <p>Remaining: {{ truckedProduct.remaining_quantity}} </p>
         </div>
       </div>
     </div>


      <div class="my-6" v-if="availableTruckedProducts.length===0">
        <span style="color: #e60000">No stock available in requested depot </span>
      </div>


    </vs-prompt>
    <!-- [end] Dispatch Form -->

    <!-- [end] Cancel Form -->

  </div>
</template>

<script>
import axios from "@/axios";
import vSelect from 'vue-select'
import {handle} from "@/http/handler";
import Table from "@/views/ui-elements/table/Table";

export default {
  props: {
    passedOrder : Object
  },
  components: {
    Table,
    vSelect
  },

  data() {
    return {
      selectedOrder: {},
      orders: [],
      orderDetailsVisible: false,

      itemsPerPage: 4,
      isMounted: false,

      // Data Sidebar
      showOrderFormSidebar: false,
      sidebarData: {},

      selectedOrderRegionId: {"id": null, "region_name": "All Regions"},
      availableRegions: [],

      deliveryForm: false,
      cartProducts: [],
      quantity: 1,
      selectedOrderProduct: null,
      selectedOrderProductVariant: null,

      products: [],
      productVariants: [],

      customerQuery: '',
      customers: [],
      selectedOrderCustomer: null,

      locationQuery: '',
      addressesRawResults: [],
      selectedOrderAddress: null,

      availableStaff: [],
      selectedStaff: {},

      cancellationReason: '',
      cancellationForm: false,

      /**Order delivery **/
      selectedOrderedProduct: null,
      selectedTruckedProduct: null,
      availableTruckedProducts: [],
      quantityToDeliver: null

    }
  },

  watch: {
    selectedOrderRegionId: function (val) {
      this.fetchOrders();
    },
    locationQuery(query) {
      this.searchLocations();
    },
    customerQuery(query) {
      this.searchCustomer();
    }
  },

  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },

    addresses() {
      return this.addressesRawResults.map(function (resultItem) {

        let location = {};


        if (resultItem.type === "places") {
          location.location_name = resultItem.searchable.place_name
          location.place_id = resultItem.searchable.id
        }
        if (resultItem.type === "districts") {
          location.location_name = resultItem.searchable.district_name
          location.district_id = resultItem.searchable.id
        }
        if (resultItem.type === "regions") {
          location.location_name = resultItem.searchable.region_name
          location.region_id = resultItem.searchable.id
        }


        if (resultItem.searchable.place) {
          location.location_name = location.location_name + " " + resultItem.searchable.district.district_name;
          location.place_id = resultItem.searchable.id;
        }

        if (resultItem.searchable.district) {
          location.location_name = location.location_name + " " + resultItem.searchable.district.district_name;
          location.district_id = resultItem.searchable.district.id;
        }

        if (resultItem.searchable.region) {
          location.location_name = location.location_name + " " + resultItem.searchable.region.region_name;
          location.region_id = resultItem.searchable.region.id;
        }

        if (resultItem.searchable.country) {
          location.location_name = location.location_name + " " + resultItem.searchable.region.region_name;
          location.country_id = resultItem.searchable.country.id;
        }

        return location;

      })
    }

  },

  methods: {

    fetchOrderDetails() {
      console.info("fetching details..");
      axios.get('/resources/sales/order?id=' + this.passedOrder.id)
        .then((response) => {
          this.selectedOrder = response.data.payload.order;
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },

    showAvailableProductsToDeliver(orderedProduct = {}) {
      this.selectedOrderedProduct = orderedProduct;

      if(this.selectedOrderedProduct.delivered_quantity  >= this.selectedOrderedProduct.ordered_quantity ){
        this.happilyNotify("Order Already fulfilled");
        return ;
      }

      this.deliveryForm = true;
      axios.post('/sales/order/delivery/available',
        {order_product_id: this.selectedOrderedProduct.id })
        .then((response) => {
             this.availableTruckedProducts = response.data.payload;
           }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },

    deliverProduct(){
      axios.post('/sales/order/delivery/deliver',
        {
          order_product_id: this.selectedOrderedProduct.id,
          trucked_product_id: this.selectedTruckedProduct.id,
          quantity: this.quantityToDeliver,
        })
        .then((response) => {
          this.selectedTruckedProduct = null;
          this.selectedOrderedProduct = null;
          this.quantity = null;
          this.happilyNotify("Product delivered");
          this.fetchOrderDetails();
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },

    /**Sales person **/
    setSalesPerson() {
      axios.post('/sales/order/staff', {id: this.selectedOrder.id, staff_id: this.selectedStaff.id})
        .then((response) => {
          if (response.data.success) {
            this.customers = response.data.payload.customers;
            this.happilyNotify("Updated");
            this.fetchOrderDetails();
          }
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },

    /*** Cancellation **/
    promptCancellation(){
      this.cancelletionReason = ""
      this.cancellationForm = true;
    },

    rejectOrder() {
      axios.post('/sales/order/cancel', {
        id: this.selectedOrder.id,
        cancellationReason: this.cancellationReason,
      })
        .then((response) => {
          if (response.data.success) {
            this.customers = response.data.payload.customers;
            this.happilyNotify("Updated");
            this.fetchOrderDetails();
          }
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },


    /*** Resources **/
    fetchProducts() {
      axios.get('/resources/products/products?category_id=')
        .then((response) => {
          this.products = response.data.payload.products.data;
        }).catch((error) => {
        console.log(error)
      })
    },

    fetchStaff() {
      console.info("fetching staff..");
      console.info(JSON.stringify(this.selectedDepot));
      axios.post('/resources/staff/get')
        .then((response) => {
          this.availableStaff = response.data.payload.staff;
        }).catch((error) => {
        console.log(error)
      })
    },

    fetchProductVariants() {
      this.productVariants = [];
      this.selectedOrderProductVariant = null;
      axios.get('/resources/product/variants?product_id=' + this.selectedOrderProduct.id)
        .then((response) => {
          this.productVariants = response.data.payload.product_variants;
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },


    /*** Customers **/
    searchCustomer() {
      console.log("Finding customer...");
      this.customers = [];
      if (!(this.customerQuery)) {
        return;
      }
      axios.get('/resources/sales/customer/find?query=' + this.customerQuery)
        .then((response) => {
          if (response.data.success) {
            this.customers = response.data.payload.customers;
          }
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })

    },

    pickCustomer(customer) {
      this.customers = [];
      this.selectedOrderCustomer = customer;
    },

    removeCustomer() {
      this.selectedOrderCustomer = null;
    },

    /*** Location **/
    searchLocations() {
      this.addressesRawResults = [];

      if (!(this.locationQuery)) {
        return;
      }
      axios.post('/resources/addresses/find', {
        query: this.locationQuery
      }).then((response) => {
        if (response.data.success) {
          this.addressesRawResults = response.data.payload.addresses;
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    pickAddress(address) {
      this.addressesRawResults = [];
      this.selectedOrderAddress = address;
    },

    removeAddress() {
      this.selectedOrderAddress = null;
    },


    /** Helpers **/
    handleApiError(error) {
      this.$vs.notify({
        title: 'Error',
        text: handle(error),
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })
    },

    happilyNotify(message) {
      this.$vs.notify({title: 'Success', text: message, color: 'success'})
    },

    sadlyNotify(message) {
      this.$vs.notify({title: 'Error', text: message, color: 'danger', position: 'bottom-left'})
    },


  },

  created() {
    this.fetchStaff();
  },
  mounted() {
    this.isMounted = true

    if(this.passedOrder!=null){
      console.log("orderId:"+this.passedOrder.id);
      this.fetchOrderDetails();
    }else{
      console.info("Order id not found, going back")
      this.$router.go(-1);
    }
  }
}
</script>


<style lang="scss">
.small-form{
  padding: 16px;
  background-color: #edfafe;
  border: 1px solid #b7e9f9;
  border-radius: 6px;
}
.danger--text{
  color: #e60000;
}

.blue--text{
  color: #00aaff;
}
.product-item{
  background-color: #f8fcff;
  padding: 12px;
  border: 1px solid #bde0fe;
  margin-bottom: 32px;
}

.product-item-active{
  background-color: #eaf7f0;
  padding: 12px;
  border: 1px solid #95d5b2;
  margin-bottom: 32px;
}

div.product-item-active:hover, div.product-item:hover {
  cursor: pointer;
}

.vs-card--content {
  font-size: 1em !important;
}

.location-item {
  border: 1px solid #e5e5e5;
  background-color: #dbf4fc;
}

.selectedOrder-address {
  border: 1px solid #2a9d8f;
  background-color: #eaf5f4;
  color: #2a9d8f;
}

div.location-item:hover {
  background-color: #b7e9f9;
  cursor: pointer;
}

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
