
<template>

  <div>
    <!--Categories Filter -->
    <div class="flex flex-wrap items-center mb-6">
      <div class="flex-grow">
        <div class="flex flex-wrap ">
          <h2 class="font-bold"
              style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
            <vs-icon class="inline pt-2 mr-4" size="32px" icon="view_quilt"></vs-icon>
            Products
          </h2>
          <v-select class="flex ml-4" @input="fetchProducts()" v-model="filterCategory"
                    :options="allCategories" name="category_name" label="category_name" :clearable="false"
                    placeholder="Category" :reduce="option => option.id">
          </v-select>
          <vs-button icon="refresh" class="py-0 ml-4" type="flat" @click="fetchProducts()">Refresh</vs-button>
        </div>
      </div>

      <vs-button icon="add" @click="showProductForm()">Add Product</vs-button>
    </div>
    <!-- [end] Categories Filter -->


    <vx-card>

      <!-- Products -->
      <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">
        <h4 class="mb-4">Products</h4>
        <vs-table stripe :data="products">

          <template slot="thead">
            <vs-th>Product Name</vs-th>
            <vs-th>Vendor</vs-th>
            <vs-th>Added On</vs-th>
            <vs-th>Action</vs-th>
            <vs-th> </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="rowIndex" v-for="(tr, rowIndex) in data">
              <vs-td :data="data[rowIndex].product_name">
                {{ data[rowIndex].product_name }}
              </vs-td>

              <vs-td :data="data[rowIndex].vendor">
                {{ data[rowIndex].vendor ? data[rowIndex].vendor.vendor_name : "Unknown Vendor" }}
              </vs-td>
              <vs-td :data="data[rowIndex].created_at">
                {{ data[rowIndex].created_at }}
              </vs-td>
              <vs-td :data="data[rowIndex].id">
                <vs-button type="border" color="secondary" class="mr-4" size="small"
                           @click="showProductVariants(data[rowIndex])">Open
                </vs-button>
                <vs-button type="border" class="mr-4" size="small" @click="showProductForm(data[rowIndex])">Edit
                </vs-button>
              </vs-td>
              <vs-td>
                <vs-button type="border" color="danger" class="mr-4" size="small"
                           @click="confirmProductRemoval(data[rowIndex])">Remove
                </vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- [end] Products -->

      <!-- Product Form -->
      <vs-popup @close="closeProductForm()" fullscreen title="Product Information" :active.sync="productFormDialog">

        <div class="md:px-6">

          <!-- Content Row -->
          <div class="vx-row">
            <div class="vx-col md:w-1/3 w-1/4">
              <vs-input class="w-full mt-4" label="Product Name" v-model="productInstance.product_name"
                        v-validate="'required'" name="product_name"/>
              <span class="text-danger text-sm" v-show="errors.has('product_name')">{{
                  errors.first('product_name')
                }}</span>

              <div class="mt-4 mb-5">
                <label class="vs-input--label">Vendor</label>
                <v-select v-model="selectedVendor" :clearable="false"
                          :options="availableVendors" v-validate="'required'" name="vendor_name" label="vendor_name"
                          placeholder="Select">
                </v-select>

                <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
              </div>

            </div>

            <div class="vx-col md:w-1/3 w-1/4">
              <div class="mt-4 mb-5" v-for="(category, index) in productCategoriesArray" :key="index">
                <label class="vs-input--label">{{ category.title }}</label>
                <v-select @input="fetchSubCategories(category)" v-model="category.selected_category" :clearable="false"
                          :options="category.sub_categories" v-validate="'required'" name="status" label="category_name"
                          placeholder="Select">
                </v-select>

                <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
              </div>
            </div>

            <div class="vx-col md:w-1/3 w-1/4">
              <h3>Categories</h3>
              <div class="category-item" v-for="(assignedCategory, index) in assignedCategories" :key="index">
                <div class="flex flex-wrap">
                  <p class="mt-1 flex-grow">{{ assignedCategory.category.category_name }}</p>
                  <vs-button type="border" @click="removeAssignedCategory(assignedCategory)"
                             color="danger" radius icon="close" size="small"></vs-button>
                </div>
              </div>

            </div>

          </div>

          <div class="vx-row mt-12">
            <div class="vx-col w-full">
              <div class="flex items-start flex-col sm:flex-row">
                <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                <div>
                  <vs-button ref="saveButton" @click="saveProduct()" color="success" class="mr-4 mb-4">Save Product
                  </vs-button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </vs-popup>
      <!-- [end] Product Form -->

      <!-- Product Variants -->
      <vs-popup @close="closeProductVariantsDialog()" fullscreen title=""
                :active.sync="productVariantsVisible">
        <div>
          <product-variants @closeProductVariants="closeProductVariantsDialog" v-bind:product="productInstance"></product-variants>
        </div>
      </vs-popup>
      <!-- [end] Product Variants -->

    </vx-card>
  </div>
</template>

<script>
import axios from "@/axios";
import vSelect from 'vue-select';
import ProductVariants from "@/views/products/products/ProductVariants";

export default {
  components: {
    vSelect,
    ProductVariants
  },
  data() {
    return {
      products: [],
      productInstance: {id: null, product_name: null, vendor_id: 1, is_published: false, categories_ids: []},
      productFormDialog: false,

      placesVisible: false,
      placesFormVisible: false,
      placeInstance: {id: null, place_name: null, district_id: null},
      places: [],

      countries: [
        {"name": "Tanzania"},
        {"name": "Kenya"},
        {"name": "Uganda"},
        {"name": "Rwanda"},
        {"name": "Burundi"},
        {"name": "Congo"}
      ],

      productCategoriesArray: [{
        title: "Main Category",
        id: null,
        selected_category: null,
        selected_category_id: null,
        sub_categories: []
      }],
      filterCategory: {category_name: 'Category'},
      availableVendors: [],
      selectedVendor: null,
      assignedCategories: [],
      allCategories: [],


      /** Product variants **/
      productVariantsVisible: false


    }
  },

  methods: {

    /*** Products **/
    fetchProducts() {
      this.products = [];
      axios.get('/resources/products/products?category_id=' + this.filterCategory)
        .then((response) => {
          this.products = response.data.payload.products.data;
        }).catch((error) => {
        console.log(error)
      })
    },

    fetchProductDetails() {
      axios.get('/resources/product/details?id=' + this.productInstance.id)
        .then((response) => {
          this.productInstance = response.data.payload.product;
          this.selectedVendor = response.data.payload.product.vendor;
          this.assignedCategories = response.data.payload.product.categories;
        }).catch((error) => {
        console.log(error);
      });
    },

    showProductForm(product) {
      this.productInstance = product ? product : {};
      this.productFormDialog = true;
      if (product) {
        this.fetchProductDetails();
      }
    },

    saveProduct() {

      let selectedCategories = this.productCategoriesArray.map(function (cat) {
        return cat.selected_category ? cat.selected_category.id : null;
      }).filter(item => !!item);

      this.productInstance.categories_ids = selectedCategories;
      this.productInstance.vendor_id = this.selectedVendor.id;
      console.log(JSON.stringify(this.productInstance));

      let endpoint = '/config/product/add';
      if (this.productInstance.id) {
        endpoint = '/config/product/update';
      }

      axios.post(endpoint, this.productInstance)
        .then((response) => {
          this.productFormDialog = false;
          this.productInstance = {};
          this.productCategoriesArray = [{
            title: "Main Category",
            id: null,
            selected_category: null,
            selected_category_id: null,
            sub_categories: []
          }];
          this.fetchProducts();
          this.getAvailableCategories(0);
        }).catch((error) => {
        console.log(error)
      })
    },

    confirmProductRemoval(product) {
      this.productInstance = product;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove ' + this.productInstance.product_name,
        accept: this.removeProduct
      })
    },

    removeProduct() {
      axios.post('/products/product/remove', {
        id: this.productInstance.id
      })
        .then((response) => {
          this.fetchProducts();
        }).catch((error) => {
        console.log(error)
      });
    },

    removeAssignedCategory(assignedCategory) {
      axios.post('/config/product/assigned/category/remove', {
        product_id: assignedCategory.product_id,
        category_id: assignedCategory.category_id
      })
        .then((response) => {
          this.fetchProductDetails();
        }).catch((error) => {
        console.log(error);
      });
    },

    closeProductForm() {
      this.productFormDialog = false;
    },

    /*** Product variants **/
    closeProductVariantsDialog() {
      this.productVariantsVisible = false;
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

    fetchAllCategories() {
      axios.get('/resources/products/categories/all')
        .then((response) => {
          this.allCategories = response.data.payload.categories;
        }).catch((error) => {
        console.log(error);
      });
    },

    /*** Vendors Resources **/
    fetchVendors() {
      axios.get('/resources/products/vendors/all')
        .then((response) => {
          this.availableVendors = response.data.payload.vendors;
        }).catch((error) => {
        console.log(error);
      });
    },
  },

  created() {
    this.getAvailableCategories(0);
    this.fetchVendors();
    this.fetchAllCategories();
  },
  mounted() {
    this.fetchProducts();
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


</style>
