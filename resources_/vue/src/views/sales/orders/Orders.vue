<template>
  <div id="data-list-list-view" class="data-list-container">


    <div class="flex flex-wrap-reverse items-center data-list-btn-container mb-6">

        <vs-icon class="mr-2" icon="shopping_cart" size="large" color="primary"></vs-icon>
       <div class="flex-grow">
         <div class="flex"><h1 class="mr-6">
           Orders
         </h1>
           <vs-button type="border" icon="refresh"  @click="fetchOrders" class="mr-4 ">Refresh </vs-button> </div>
       </div>

        <!-- Mine -->
        <v-select @input="fetchOrders" v-model="orderChannel" class="mr-6" :clearable="false"
                  :options="orderChannelsOptions" label="text"/>

        <!-- Filter By Region -->
        <v-select @input="fetchOrders" v-model="selectedOrderRegionId" class="mr-6" :clearable="false" :reduce="item => item.id"
                  :options="availableRegions" label="region_name"/>

        <!-- Add Order Button -->
        <vs-button icon="add" id="customerLoading" @click="showOrderForm"
                   class="mr-4 vs-con-loading__container">Add Order
        </vs-button>

      </div>


    <!-- orders table-->
    <vs-card class="px-6">

      <!--filters -->
      <div class="flex flex-wrap py-12 ">
        <ul class="centerx flex">
          <li>
            <vs-checkbox @input="fetchOrders" v-model="isApproved">Approved</vs-checkbox>
          </li>
          <li>
            <vs-checkbox @input="fetchOrders" v-model="isCancelled">Cancelled</vs-checkbox>
          </li>

        </ul>
      </div>
      <!--[end]  filters -->

      <vs-table ref="table"  @selected="showOrderDetails" v-model="selectedOrder" pagination :max-items="100"   :data="orders">

        <template slot="thead">
          <vs-th >#</vs-th>
          <vs-th  >Customer</vs-th>
          <vs-th  >Address</vs-th>
          <vs-th  >Sales Person</vs-th>
          <vs-th  >Status</vs-th>
          <vs-th  >Date</vs-th>
         </template>

        <template slot-scope="{data}">
          <tbody>
          <vs-tr :data="item" :key="rowIndex" v-for="(item, rowIndex) in data">

            <vs-td>
              <p class="product-name font-medium truncate">{{ item.id }}</p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">{{ item.customer ? item.customer.customer_name : " " }}</p>
            </vs-td>

            <vs-td>
              <p class="product-category">
                {{ item.place ? item.place.place_name : " " }}
                {{ item.district ? item.district.district_name : " " }}
                {{ item.region ? item.region.region_name : " " }}
              </p>
            </vs-td>

            <vs-td>
              <vs-chip color="secondary" v-if="item.staff">
                <vs-avatar color="secondary" icon-pack="feather" icon="icon-user"/>
                {{ item.staff.staff_name }}
              </vs-chip>
              <vs-chip color="grey" v-else> No Salesman</vs-chip>
            </vs-td>

            <vs-td>
              <span v-bind:class="getStatusColor(item)"> {{ item.order_status }}</span>
            </vs-td>

            <vs-td>
               {{ item.created_at }}
            </vs-td>



          </vs-tr>
          </tbody>
        </template>
      </vs-table>

    </vs-card>
    <!-- [end] orders table-->

    <!-- Order Form -->
    <vs-popup @close="closeOrderForm()" fullscreen title="New Order" :active.sync="orderFormDialog">

      <div class="md:px-6">

        <!-- Content Row -->
        <div class="vx-row">

          <!--customer info -->
          <div class="vx-col md:w-1/3 w-1/4">

            <!--Customer -->
            <div class="mt-4 mb-5">
              <!-- customer -->
              <h3>Customer</h3>
              <vs-input v-if="!selectedOrderCustomer" v-model="customerQuery" class="mt-5 w-full" name="location"
                        v-validate="'required'"/>

              <!-- customers results -->
              <div v-for="(customer,index) in customers" :key="index"
                   @click="pickCustomer(customer)" class="location-item px-2 py-2 rounded mt-4">
                <ul>
                  <li>{{ customer.customer_name }} {{ customer.email }}</li>
                  <li>{{ customer.phone_number_1 }} {{ customer.phone_number_2 }}</li>
                  <li>
                    {{ customer.region ? customer.region.region_name : " " }}
                    {{ customer.district ? customer.district.distrcit_name : " " }}
                    {{ customer.place ? customer.place.place_name : " " }}
                  </li>
                </ul>
              </div>

              <!-- selectedOrder customer -->
              <div class="selectedOrder-address px-2 py-2 rounded mt-4" v-if="selectedOrderCustomer">
                <div class="flex flex-wrap items-center">
                  <div class="flex-grow">
                    {{ selectedOrderCustomer.customer_name }}
                  </div>
                  <vs-button @click="removeCustomer()" color="danger" type="flat" icon-pack="feather"
                             icon="icon-x"></vs-button>
                </div>
              </div>
            </div>

            <!-- Delivery Address -->
            <div class="mt-4 mb-5">
              <h3>Delivery Address</h3>

              <vs-input v-if="!selectedOrderAddress" v-model="locationQuery" class="mt-5 w-full" name="location"
                        v-validate="'required'"/>
              <span class="text-danger text-sm" v-show="errors.has('location')">{{ errors.first('item-name') }}</span>

              <!-- Address result -->
              <div v-for="(address,index) in addresses" :key="index"
                   @click="pickAddress(address)" class="location-item px-2 py-2 rounded mt-4">
                <ul>
                  <li>{{ address.location_name }}</li>
                </ul>
              </div>

              <!-- selectedOrder address -->
              <div class="selectedOrder-address px-2 py-2 rounded mt-4" v-if="selectedOrderAddress">
                <div class="flex flex-wrap items-center">
                  <div class="flex-grow">
                    {{ selectedOrderAddress.location_name }}
                  </div>
                  <vs-button @click="removeAddress()" color="danger" type="flat" icon-pack="feather"
                             icon="icon-x"></vs-button>
                </div>
              </div>

            </div>
            <!-- [end] Delivery Address -->

          </div>

          <!--product picker -->
          <div class="vx-col md:w-1/3 w-1/4">

            <div class="mx-6 px-6">
              <h3>Pick Product</h3>
              <!-- Product -->
              <div class="mt-4 mb-5">
                <label class="vs-input--label">Product</label>
                <v-select @input="fetchProductVariants()" v-model="selectedOrderProduct" :clearable="false"
                          :options="products" v-validate="'required'" name="Product" label="product_name"
                          placeholder="Select">
                </v-select>
                <span class="text-danger text-sm" v-show="errors.has('Product')">{{ errors.first('Product') }}</span>
              </div>

              <!-- Product Variant-->
              <div class="mt-4 mb-5">
                <label class="vs-input--label">Product Variant</label>
                <v-select v-model="selectedOrderProductVariant" :clearable="false" :options="productVariants"
                          v-validate="'required'" name="Variant" label="variant_name"
                          placeholder="Select">
                </v-select>
                <span class="text-danger text-sm" v-show="errors.has('Variant')">{{ errors.first('Variant') }}</span>
              </div>

              <div class="mt-4 mb-5">
                <vs-input class="w-full mt-4" label="Quantity" v-model="quantity"
                          v-validate="'required'" name="quantity"/>
                <span class="text-danger text-sm" v-show="errors.has('quantity')">
                   {{ errors.first('quantity') }} </span>
              </div>


              <div v-if="selectedOrderProduct && selectedOrderProductVariant && quantity>0">
                <vs-button ref="saveButton" @click="addProductToCart()" color="secondary" class="mr-4 mb-4">
                  Add to cart
                </vs-button>
              </div>
            </div>

          </div>
          <!-- [end] product picker -->

          <!-- Cart contents -->
          <div class="vx-col md:w-1/3 w-1/4">
            <h3>Cart</h3>
            <div class="category-item" v-for="(cartProduct, index) in cartProducts" :key="index">
              <vs-card class="my-6">
                <div class="flex flex-wrap">
                  <p class="mt-1 flex-grow">
                    {{ cartProduct.product.product_name }}
                    {{ cartProduct.productVariant.variant_name }},
                    QTY: {{ cartProduct.quantity }}
                  </p>
                  <vs-button type="border" color="danger" @click="removeFromCart(index)"
                             radius icon="close" size="small"></vs-button>
                </div>
              </vs-card>
            </div>

            <div v-if="cartProducts.length>0">
              <vs-button ref="saveButton" @click="submitOrder()" color="success" class="mr-4 mb-4">
                Submit Order
              </vs-button>
            </div>
          </div>
          <!-- [end] Cart contents -->

        </div>

        <div class="vx-row mt-12">
          <div class="vx-col w-full">
            <div class="flex items-start flex-col sm:flex-row">
              <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->

            </div>
          </div>
        </div>

      </div>
    </vs-popup>
    <!-- [end] Order Form -->

    <!-- Order details -->
    <vs-popup @close="closeOrderDetails()" fullscreen title="Order Details" :active.sync="orderDetailsVisible">
      <div style="min-height: 100vh;">
        <div class="vx-row">

          <!-- Customer info -->
          <div class="vx-col md:w-1/3">
            <div class="mb-6">
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

            <vs-button v-if="!(selectedOrder.is_cancelled)" class="mt-12" @click="rejectOrder()" color="danger"> Cancel Order</vs-button>
          </div>

          <!-- Ordered product -->
          <div class="vx-col md:w-1/3 " v-if="selectedOrder.order_products">
            <div class="mb-6">
              <span class="font-bold">Ordered Products</span>
            </div>

            <vx-card class="overflow-hidden mb-6"
                     v-for="(orderProduct,index) in selectedOrder.order_products">
              <div slot="no-body">
                <div class="p-6 flex justify-between flex-row-reverse items-center">
                  <feather-icon :icon="`PackageIcon`" class="p-3 inline-flex rounded-full text-primary"
                                :style="{background: `rgba(var(--vs-primary),.15)`}"></feather-icon>
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

          <!-- Sales person -->
          <div class="vx-col md:w-1/3 " v-if="selectedOrder.order_products">
            <div class="mb-6">
              <span class="font-bold">Sales Person</span>
            </div>
            <table>
              <tr>
                <td class="pr-6">Name</td>
                <td>{{ selectedOrder.staff ? selectedOrder.staff.staff_name : "No sales person" }}</td>
              </tr>

              <tr>
                <td class="pr-6">Phone</td>
                <td> {{ selectedOrder.staff ? selectedOrder.staff.phone_number : "No Phone" }}</td>
              </tr>
            </table>

            <div class="mt-4 mb-5">
              <label class="vs-input--label">Update Sales Person</label>
              <v-select @input="setSalesPerson()" v-model="selectedStaff" :clearable="false"
                        :options="availableStaff" v-validate="'required'" name="Staff" label="staff_name"
                        placeholder="Select">
              </v-select>
              <span class="text-danger text-sm" v-show="errors.has('Staff')">{{ errors.first('Staff') }}</span>
            </div>
          </div>

        </div>
      </div>
    </vs-popup>
    <!-- [end] Order details -->

    <!-- Cancel Form -->
    <vs-prompt title="Cancellation Reason" :accept-text="`Continue`" :cancel-text="`Cancel`"
               @cancel="cancellationReason=null" color="secondary"
               @accept="rejectOrder()"
               :active.sync="cancellationForm">
      <div>
        <vs-input placeholder="Reason"  v-model="cancellationReason" class="mt-3 w-full"/>
      </div>
    </vs-prompt>
    <!-- [end] Cancel Form -->

  </div>
</template>

<script>
import axios from "@/axios";
import vSelect from 'vue-select'
import {handle} from "@/http/handler";
import Table from "@/views/ui-elements/table/Table";

export default {
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

      orderFormDialog: false,
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

      /*** filtering **/
      isApproved : false,
      isCancelled : false,
      orderChannel: { text:'All Sources', value: 0 },
      orderChannelsOptions: [
        { text:'All Sources', value: 0 },
        { text:'My Orders', value: 1 },
        { text:'Customer App', value: 2 },
        { text:'From Sales People', value: 3 },
        { text:'Call Center', value: 4 }
      ]

    }
  },

  watch: {

    locationQuery(query) {
      this.searchLocations();
    },
    customerQuery(query) {
      this.searchCustomer();
    },
    isApproved (newValue){
      if(newValue===true){
        this.isCancelled = false;
      }
      this.fetchOrders();
    },
    isCancelled(newValue){
      if(newValue===true){
        this.isApproved = false;
      }
      this.fetchOrders();
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

    fetchOrders() {
      this.$vs.loading({ color: 'secondary' })
      console.log(JSON.stringify(this.selectedOrderRegionId));

      this.rawCustomers = [];
       console.info("fetching orders..");
       let endpoint = '/resources/sales/orders?region_id='
        + this.selectedOrderRegionId
        + `&order_channel=${this.orderChannel.value}`
        + `&include_approved=${this.isApproved? "1" : "0"}`
        + `&include_cancelled=${this.isCancelled? "1" : "0"}` ;

       console.log("endpoint"+endpoint);
       axios.get(endpoint)
        .then((response) => {
          this.$vs.loading.close();
          this.orders = response.data.payload.orders.data;
         }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.handleApiError(error);
      })
    },

    fetchOrderDetails() {
      this.$vs.loading({ color: 'secondary' })
      console.info("fetching details..");
      axios.get('/resources/sales/order?id=' + this.selectedOrder.id)
        .then((response) => {
          this.$vs.loading.close();
          this.selectedOrder = response.data.payload.order;
        }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.handleApiError(error);
      })
    },

    confirmCustomerDeletion(customer) {
      this.customerInstance = customer;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove ' + this.customerInstance.customer_name,
        accept: this.removeCustomer
      })
    },

    showOrderForm(order = {}) {
      this.orderFormDialog = true;
      this.orderInstance = order;
    },

    closeOrderForm() {
      this.orderFormDialog = false;
    },

    addProductToCart() {
      let cartProduct = {
        product: this.selectedOrderProduct,
        productVariant: this.selectedOrderProductVariant,
        quantity: this.quantity
      };

      this.selectedOrderProduct = null;
      this.selectedOrderProductVariant = null;
      this.quantity = 1;

      this.cartProducts.push(cartProduct)
    },

    removeFromCart(index) {
      console.log(index)
      delete this.cartProducts.splice(index, 1);
    },

    submitOrder() {
      if (!this.selectedOrderCustomer) {
        this.sadlyNotify("Select customer")
        return;
      }
      if (!this.selectedOrderAddress) {
        this.sadlyNotify("Select address")
        return;
      }

      let variants = this.cartProducts.map(function (cartItem) {
        return {
          id: cartItem.productVariant.id,
          quantity: cartItem.quantity
        }
      });

      let orderData = {
        customer_id: this.selectedOrderCustomer.id,
        region_id: this.selectedOrderAddress.region_id,
        district_id: this.selectedOrderAddress.district_id,
        place_id: this.selectedOrderAddress.place_id,
        product_variants: variants
      };
      console.log(JSON.stringify(orderData))

      this.$vs.loading({ color: 'secondary' })
      axios.post('/sales/order/add', orderData)
        .then((response) => {
          this.$vs.loading.close();
          this.closeOrderForm();
          this.happilyNotify("Order Added");
          this.selectedOrderCustomer = null; this.selectedOrderAddress = null;
          this.cartProducts = []; this.customerQuery = null; this.locationQuery = null;
          this.fetchOrders();
        }).catch((error) => {
        this.$vs.loading.close();
        console.log(error);
        this.handleApiError(error);
      })
    },


    showOrderDetails() {
       this.$router.push({ name: "sales-order-details", params: { passedOrder: this.selectedOrder }});
     },

    closeOrderDetails() {
      this.orderDetailsVisible = false;
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
    fetchRegions() {
      console.info("fetching regions..");
      console.info(JSON.stringify(this.selectedOrderCustomer));
      axios.get('/resources/addresses/regions?country_id=1')
        .then((response) => {
          this.availableRegions = response.data.payload.regions;
          this.availableRegions.unshift({"id": null, "region_name": "All Regions"});

        }).catch((error) => {
        console.log(error)
      })
    },

    fetchProducts() {
      axios.get('/resources/products/products?category_id=')
        .then((response) => {
          this.products = response.data.payload.products.data;
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

    getStatusColor(item){
      if(item.is_cancelled){
        return 'text-danger';
      }else if(item.is_delivered){
        return `text-success`;
      }else if(item.is_approved){
        return `text-secondary`;
      }
      return 'text-warning'
    }

  },


  created() {
    this.fetchProducts();
    this.fetchStaff();
    this.fetchRegions();
  },
  mounted() {
    this.fetchOrders();
    this.isMounted = true
  }
}
</script>






<style lang="scss">

.text-secondary{
  color: #0d77e4 !important;
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
