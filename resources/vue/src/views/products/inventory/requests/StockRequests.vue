
<template>

  <div>
    <!--Categories Filter -->
    <div class="flex flex-wrap items-center mb-6">
      <div class="flex-grow">
        <div class="flex flex-wrap ">
          <h2 class="font-bold"
              style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
            <vs-icon class="inline pt-2 mr-4" size="32px" icon="view_quilt"></vs-icon>
            Stock Requests
          </h2>


          <v-select class="flex ml-4" @input="fetchStockRequests()" v-model="selectedDepot"
                    :options="availableDepots" name="depot_name" label="depot_name" :clearable="false"
                    placeholder="Depot"  >
          </v-select>

          <vs-button  icon="refresh" class="py-0 ml-4" type="flat" @click="fetchStockRequests()">Refresh</vs-button>
        </div>
      </div>

      <!-- Add Order Button -->
      <vs-button icon="add" id="customerLoading" @click="showRequestForm"
                 class="mr-4 vs-con-loading__container">Request Stock
      </vs-button>

    </div>
    <!-- [end] Categories Filter -->

    <!-- List -->
    <vx-card>

      <!-- Stock Requests -->
      <div style="" class="px-6 py-6 rounded">

         <vs-table  @selected="showRequestDetails" stripe   :data="stockRequests" v-model="selectedRequest">

          <template slot="thead">
            <vs-th>Staff </vs-th>
            <vs-th> Date </vs-th>
            <vs-th> Approval </vs-th>
            <vs-th> Dispatch Status </vs-th>
            </template>

          <template slot-scope="{data}">
            <vs-tr :data="item" :key="rowIndex" v-for="(item, rowIndex) in data">

              <vs-td>
                {{ data[rowIndex].staff ? data[rowIndex].staff.staff_name : "Unknown Staff" }}
              </vs-td>

              <vs-td>
                <span style="color: #0d77e4; font-weight: bold"> {{ data[rowIndex].created_at }} </span>
              </vs-td>

              <vs-td  >
                 <vs-chip :color="item.approved? `#cdf7ec`:`#fff4f6`">
                   <span v-bind:class="item.approved? `success-text`:`danger-text`"  style=" font-weight: bold; margin-left: 4px;">
                    {{ item.approved? 'Approved' : item.rejected? 'Rejected' : 'Not Approved' }}
                   </span>
                </vs-chip>
              </vs-td>

              <vs-td>
                <vs-chip :color="item.dispatched? `#cdf7ec`:`#f9eae4`">
                   <span v-bind:class="item.dispatched? `success-text`:`neutral-text`"  style=" font-weight: bold; margin-left: 4px;">
                          {{ item.dispatched? 'Dispatched' : 'Not Dispatched' }}
                  </span>
                </vs-chip>
              </vs-td>

            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- [end] stockRequests -->

    </vx-card>
    <!-- List -->

    <!-- Order Form -->
    <vs-popup @close="closeRequestForm()" fullscreen title="Request Stock" :active.sync="orderFormDialog">

      <div class="md:px-6">

        <!-- Content Row -->
        <div class="vx-row">

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
            <h3>Selected products</h3>
            <div class="category-itemm" v-for="(cartProduct, index) in cartProducts" :key="index">
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
              <vs-button ref="saveButton" @click="submitRequest()" color="success" class="mr-4 mb-4">
                Submit Request
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


  </div>
</template>

<script>
import axios from "@/axios";
import vSelect from 'vue-select';
import {handle} from "@/http/handler";

export default {
  components: {
    vSelect},
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

      selectedRequest: {},

      /**Requesting **/
      orderFormDialog: false,
      cartProducts: [],
      quantity: 1,
      selectedOrderProduct: null,
      selectedOrderProductVariant: null,

      products: [],
      productVariants: []


    }
  },

  methods: {

    /*** stockRequests **/
    fetchStockRequests() {
      this.stockRequests = [];
      let endpoint = '/products/inventory/stock/requests?depot_id=';
      axios.get(endpoint)
        .then((response) => {
          this.stockRequests = response.data.payload.requests.data;
        }).catch((error) => {
        console.log(error)
      })
    },

    showRequestDetails( ) {
       this.$router.push({
         name: 'products-inventory-stock-request-details',
         params: { selectedRequest: this.selectedRequest }
       });
    },

    closeProductForm() {
      this.productFormDialog = false;
    },

    /*** Requesting **/
    showRequestForm( ) {
      this.orderFormDialog = true;
     },
    closeRequestForm() {
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

    submitRequest() {

      let variants = this.cartProducts.map(function (cartItem) {
        return {
          variant_id: cartItem.productVariant.id,
          quantity: cartItem.quantity
        }
      });

      let requestData = {
        depot_id: null,
        product_variants: variants
      };
      console.log(JSON.stringify(requestData))

      axios.post('/products/inventory/stock/request', requestData)
        .then((response) => {
          this.closeRequestForm();
          this.happilyNotify("Request Sent");
          this.fetchStockRequests();
         }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
      })
    },


    /*** Product variants **/
    closeProductVariantsDialog() {
      this.productVariantsVisible = false;
      this.fetchStockRequests();
    },

    showProductVariants(product) {
      this.productInstance = product;
      this.productVariantsVisible = true;
    },

    /*** Categories Resources **/
    getAvailableCategories(categoriesIndex) {
      let letCatId = this.productCategoriesArray[categoriesIndex].id;
      axios.get('/resources/products/categories?parent_id=' + letCatId).then((response) => {
        this.productCategoriesArray[categoriesIndex].sub_categories = response.data.payload.categories;
      }).catch((error) => {
        console.log(error);
      });
    },

    fetchSubCategories(selectedCategory) {
      axios.get('/resources/products/categories?parent_id=' + selectedCategory.selected_category.id)
        .then((response) => {
          const subCategories = response.data.payload.categories;
          if (subCategories.length > 0) {
            console.log("Has sub categories");
            let category = {};
            category.id = selectedCategory.id;
            category.title = selectedCategory.selected_category.category_name;
            category.selected_category_id = selectedCategory.null;
            category.sub_categories = subCategories;
            this.productCategoriesArray.push(category);
          }
        }).catch((error) => {
        console.log(error);
      });
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
    this.getAvailableCategories(0);
    this.fetchAvailableVendors();
    this.fetchAvailableCategories();
    this.fetchAvailableDepots();
    this.fetchProducts();
    },

  mounted() {
    this.fetchStockRequests();
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


</style>
