
<template>

  <div>
    <!--Categories Filter -->
    <div class="flex flex-wrap items-center mb-6">
      <div class="flex-grow">
        <div class="flex flex-wrap ">
          <h2 class="font-bold"
              style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
            <vs-icon class="inline pt-2 mr-4" size="32px" icon="subject"></vs-icon>
            Request Details
          </h2>
         </div>
      </div>
      <vs-button v-if="!(stockRequest.approved)" color="secondary" @click="approveRequest()">Approve</vs-button>
      <vs-chip v-else color="success">Approved</vs-chip>

    </div>
    <!-- [end] Categories Filter -->

    <!-- List -->
    <vx-card>

      <!-- Products -->
      <div style="" class="px-6 py-6 rounded">

        <div class="flex flex-wrap ">
          <h4 style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
            <vs-icon class="inline pt-2 mr-4" size="32px" icon="person"></vs-icon>
            {{ selectedRequest.staff? selectedRequest.staff.staff_name : "Unknown Staff"  }}
          </h4>
        </div>
         <vs-table v-model="selectedStockRequestProduct" @selected="showDispatchForm()" stripe   :data="stockRequest.request_products">

          <template slot="thead">
            <vs-th>Product </vs-th>
            <vs-th>Variant </vs-th>
            <vs-th>Requested  </vs-th>
            <vs-th>Dispatched </vs-th>
            <vs-th>Remaining </vs-th>
             </template>

          <template slot-scope="{data}">
            <vs-tr :data="item" :key="rowIndex" v-for="(item, rowIndex) in data">

              <vs-td>
                {{ item.product ? item.product.product_name : "No Product Name"  }}
              </vs-td>

              <vs-td>
                {{ item.variant ? item.variant.variant_name : "No Name"  }}
              </vs-td>

              <vs-td>
                {{ item.quantity }}
              </vs-td>


              <vs-td>
                 <vs-chip :color="item.approved? `#cdf7ec`:`#cdf7ec`">
                   <span v-bind:class="item.approved>0? `success-text`:`success-text`"  style=" font-weight: bold; margin-left: 4px;">
                    {{ item.dispatched_quantity  }}
                   </span>
                </vs-chip>
              </vs-td>

              <vs-td>
                 <vs-chip :color="(item.quantity - item.dispatched_quantity)<=0? `#cdf7ec`:`#fff4f6`">
                   <span v-bind:class="(item.quantity - item.dispatched_quantity)<=0? `success-text`:`danger-text`"  style=" font-weight: bold; margin-left: 4px;">
                    {{ (item.quantity - item.dispatched_quantity)  }}
                   </span>
                </vs-chip>
              </vs-td>


            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- [end] stockRequests -->


      <!-- Role Form -->
      <vs-prompt :title="`Dispatch`" :accept-text="`Dispatch`" :cancel-text="`Cancel`"
                  :color="`#118ab2`"
                 @cancel="selectedDepotProduct= null"
                 @accept="dispatchProduct()"
                 :active.sync="dispatchFormDialog">

        <!-- headings -->
        <h4 class="my-6" v-if="selectedDepotProduct">Quantity to dispatch</h4>
        <h4 class="my-6" v-else >Select depot stock</h4>


        <!-- input -->
        <div class="mb-6" v-if="selectedDepotProduct">
           <vs-input placeholder="Quantity" vs-placeholder="Quantity" v-model="dispatchQuantity" class="mt-3 w-full"/>
        </div>

        <!-- stocks -->
        <div @click="selectedDepotProduct=depotProduct"
             v-bind:class="selectedDepotProduct ? `product-item-active`: `product-item`"
                v-for="(depotProduct, index) in availableStockProducts" :key="index">
          <p>
            {{ depotProduct.product? depotProduct.product.product_name : "" }}
            {{ depotProduct.variant? depotProduct.variant.variant_name : "" }}
          </p>
          <p>Remaining: {{ depotProduct.remaining_quantity}} </p>
        </div>

        <div class="my-6" v-if="availableStockProducts.length===0">
          <span style="color: #e60000">No stock available in requested depot </span>
        </div>


      </vs-prompt>
      <!-- [end] Role Form -->


    </vx-card>
    <!-- List -->

  </div>
</template>

<script>
import axios from "@/axios";
import vSelect from 'vue-select';
import {handle} from "@/http/handler";

export default {
  props : {
    selectedRequest : Object
  },
  components: {
    vSelect
  },
  data() {
    return {

      stockRequests: [],
      productInstance: { id: null, product_name: null, vendor_id: 1, is_published: false, categories_ids: [] },
      productFormDialog: false,

      placesVisible: false,
      placesFormVisible: false,
      placeInstance: {id: null, place_name: null, district_id: null},
      places: [],

      productCategoriesArray: [{
        title: "Main Category",
        id: null,
        selected_category: null,
        selected_category_id: null,
        sub_categories: []
      }],
      availableVendors: [],
      selectedVendor: null,
      assignedCategories: [],


      /** Product variants **/
      productVariantsVisible: false,

      availableCategories: [],
      selectedCategory: {category_name: 'All Categories'},

      availableDepots: [],
      selectedDepot: { depot_name: "All Depots" },
      availableStockProducts: [],
      selectedStockRequestProduct: null,
      selectedDepotProduct: null,

      stockRequest: { request_products:[]},

      /*** Dispatch **/
      dispatchFormDialog: false,
      dispatchQuantity: null,


    }
  },

  methods: {

    /*** stockRequests **/
    fetchStockRequestDetails() {
      console.log("fetching details: "+this.selectedRequest.id )
      this.stockRequests = [];
      let endpoint = '/products/inventory/stock/request?id='+this.selectedRequest.id;
      axios.get(endpoint)
        .then((response) => {
          this.stockRequest = response.data.payload.request;
        }).catch((error) => {
        console.log(error)
      })
    },

    approveRequest(){
      axios.post('/products/inventory/stock/request/approve',{
        id: this.selectedRequest.id
      }).then((response) => {
           this.fetchStockRequestDetails();
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },

    showDispatchForm(){
      if(this.selectedStockRequestProduct.quantity<=this.selectedStockRequestProduct.dispatched_quantity){
        this.happilyNotify("Request fulfilled");
        return ;
      }
      this.dispatchFormDialog = true;
      this.getAvailableProducts();
    },

    getAvailableProducts(){
      axios.post('/products/inventory/stock/request/available',{
        requested_product_id  : this.selectedStockRequestProduct.id,
        depot_id : this.selectedRequest.depot_id ,
      })
        .then((response) => {
          this.availableStockProducts = response.data.payload;
         }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },


    dispatchProduct(){
      axios.post('/products/inventory/stock/request/dispatch',{
        requested_product_id  : this.selectedStockRequestProduct.id,
        depot_product_id  : this.selectedDepotProduct.id,
        quantity : this.dispatchQuantity ,
      })
        .then((response) => {
          this.selectedDepotProduct = null;
          this.selectedStockRequestProduct = null;
          this.happilyNotify("Product Dispatched");
          this.fetchStockRequestDetails();
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },


    /*** Resources **/
    fetchAvailableCategories() {
      axios.get('/resources/products/categories/all')
        .then((response) => {
          this.availableCategories = response.data.payload.categories;
          this.availableCategories.push(this.selectedCategory);

        }).catch((error) => {
        console.log(error);
      });
    },

    fetchAvailableVendors() {
      axios.get('/resources/products/vendors/all')
        .then((response) => {
          this.availableVendors = response.data.payload.vendors;
        }).catch((error) => {
        console.log(error);
      });
    },

    fetchAvailableDepots() {
      console.info("fetching depots..");
      console.info(JSON.stringify(this.selectedDepot));

      axios.get('/resources/assets/depots')
        .then((response) => {
          this.availableDepots = response.data.payload.depots.data;
          this.availableDepots.push(this.selectedDepot);
          this.selectedDepot = this.availableDepots[0];
         }).catch((error) => {
        console.log(error)
      })
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
      this.$vs.notify({title: 'Error', text: message, color: 'danger', time:15000, position: 'bottom-left'})
    },

  },

  created() {
    if(this.selectedRequest==null){
      console.log("SelectedRequest==null Going back");
      this.$router.go(-1);
    }else{
      console.log(this.selectedRequest.id);

    }
  },

  mounted() {
    this.fetchStockRequestDetails();
  }
}
</script>

<style scoped>
.category-item {
  padding: 8px 8px;
  margin-top: 12px;
  border: 1px solid #ddb892;
  background-color: #fcf8f4;
  border-radius: 4px;
}

.danger-text{
  color: #d90429;
}

.success-text{
  color: #048060;
}
.neutral-text{
  color: #80656a;
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

</style>
