
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

          <v-select class="flex ml-4" @input="fetchStockRequests()" v-model="selectedDepot"
                    :options="availableDepots" name="depot_name" label="depot_name" :clearable="false"
                    placeholder="Depot"  >
          </v-select>

          <vs-button icon="refresh" class="py-0 ml-4" type="flat" @click="fetchStockRequests()">Refresh</vs-button>
        </div>
      </div>

    </div>
    <!-- [end] Categories Filter -->

    <!-- List -->
    <vx-card>

      <!-- Products -->
      <div style="" class="px-6 py-6 rounded">


         <vs-table  @selected="showVariantsStocks" stripe   :data="stockRequests" v-model="selectedProduct">

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
                    {{ item.approved? 'Approved' : '' }}
                    {{ item.rejected? 'Rejected' : '' }}
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


      <!-- Product Variants -->
      <vs-popup @close="closeProductVariantsDialog()" fullscreen title=""
                :active.sync="productVariantsVisible">
        <div>
          <stock-details @closeProductVariants="closeProductVariantsDialog"
                         v-bind:depot="selectedDepot"
                         v-bind:product="productInstance"></stock-details>
        </div>
      </vs-popup>
      <!-- [end] Product Variants -->

    </vx-card>
    <!-- List -->

  </div>
</template>

<script>
import axios from "@/axios";
import vSelect from 'vue-select';
import StockDetails from "@/views/products/inventory/StockDetails";

export default {
  components: {
    vSelect,
    StockDetails
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

      selectedProduct: {},


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

    showVariantsStocks( ) {
      console.info("Handling selection...");
      if(this.selectedDepot.id==null){
        this.$vs.notify({ time: 3000, color: 'danger', title: 'No Depot',  text: "Select depot before selecting product" });
        return ;
      }

      this.productInstance = this.selectedProduct;
      this.productVariantsVisible = true;
    },

    closeProductForm() {
      this.productFormDialog = false;
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

  },

  created() {
    this.getAvailableCategories(0);
    this.fetchAvailableVendors();
    this.fetchAvailableCategories();
    this.fetchAvailableDepots();
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
