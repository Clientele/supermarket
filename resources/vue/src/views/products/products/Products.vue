<!-- =========================================================================================
    File Name: TableStriped.vue
    Description: Rendering default table with striped style
========================================================================================== -->


<template>
  <vx-card >

    <!--Products Filter -->
    <div class="flex flex-wrap items-center mb-6">
      <div class="flex-grow">
        <div class="flex flex-wrap ">
          <vs-dropdown vs-trigger-click class="cursor-pointer mr-4">
            <div  class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">  Tanzania </span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>


              <vs-dropdown-item v-for="(country, index) in  countries" :key="index" @click="fetchProducts(country)">
                <span>{{ country.name  }}</span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>
          <!--refresh button -->
          <vs-button class="py-0" type="flat" @click="fetchProducts()">Refresh</vs-button>
        </div>

      </div>

      <vs-button icon="add"  @click="showProductForm()">Add Product</vs-button>
    </div>
    <!-- [end] Products Filter -->

    <!-- Products -->
    <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">
      <h4 class="mb-4">Products</h4>
      <vs-table stripe :data="products">

        <template slot="thead">
          <vs-th>Product Name</vs-th>
          <vs-th>Added</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="rowIndex" v-for="(tr, rowIndex) in data">
            <vs-td :data="data[rowIndex].product_name">
              {{data[rowIndex].product_name}}
            </vs-td>
            <vs-td :data="data[rowIndex].created_at">
              {{data[rowIndex].created_at}}
            </vs-td>
            <vs-td :data="data[rowIndex].id">
              <vs-button type="border" color="secondary" class="mr-4" size="small" @click="viewDistricts(data[rowIndex])">Open</vs-button>
              <vs-button type="border"  class="mr-4" size="small" @click="showProductForm(data[rowIndex])">Edit</vs-button>
              <vs-button  type="border" color="danger" class="mr-4" size="small" @click="confirmProductRemoval(data[rowIndex])">Remove</vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>


    <!-- User Form -->
    <vs-popup @close="closeProductForm()" fullscreen title="Product Information" :active.sync="productFormDialog">

      <div   class="md:px-6"  >

        <!-- Content Row -->
        <div class="vx-row">
           <div class="vx-col md:w-1/3 w-1/4">
            <vs-input class="w-full mt-4" label="Product Name" v-model="productInstance.product_name" v-validate="'required'" name="product_name"  />
            <span class="text-danger text-sm"  v-show="errors.has('product_name')">{{ errors.first('product_name') }}</span>

             <div class="mt-4 mb-5" >
               <label class="vs-input--label">Vendor</label>
               <v-select v-model="productInstance.vendor_id" :clearable="false"
                         :options="availableVendors" v-validate="'required'" name="vendor_name" label="vendor_name"
                         placeholder="Select"  :reduce="option => option.id">
               </v-select>

               <span class="text-danger text-sm"  v-show="errors.has('status')">{{ errors.first('status') }}</span>
             </div>

        </div>

          <div class="vx-col md:w-1/3 w-1/4">
            <div class="mt-4 mb-5" v-for="(category, index) in categoriesArray" :key="index">
              <label class="vs-input--label">{{ category.title }}</label>
              <v-select @input="fetchSubCategories(category)" v-model="category.selected_category" :clearable="false"
                        :options="category.sub_categories" v-validate="'required'" name="status" label="category_name"
                        placeholder="Select"  >
              </v-select>

              <span class="text-danger text-sm"  v-show="errors.has('status')">{{ errors.first('status') }}</span>
            </div>
          </div>

      </div>

        <div class="vx-row mt-12">
          <div class="vx-col w-full">
            <div class="flex items-start flex-col sm:flex-row">
              <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
              <div>
                <vs-button ref="saveButton" @click="saveProduct()" color="success" class="mr-4 mb-4">Save Product</vs-button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </vs-popup>
    <!-- [end] User Form -->



  </vx-card>
</template>

<script>
import axios from "@/axios";
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  data () {
    return {
      products: [],
      productInstance: { id: null,  product_name : null, vendor_id : 1, is_published: false, categories_ids: [] },
      productFormDialog: false,

      districtsVisible: false,
      districtsFormVisible: false,
      districtInstance : {id: null,  district_name : null, product_id : null},
      districts : [
        {
          'id': 1,
          'product_name': 'Kinondoni',
          'created_at': 'june 4, 2020'
        }
      ],

      placesVisible: false,
      placesFormVisible: false,
      placeInstance: {id: null,  place_name : null, district_id : null},
      places : [],

      countries: [
        { "name": "Tanzania" },
        { "name": "Kenya" },
        { "name": "Uganda" },
        { "name": "Rwanda" },
        { "name": "Burundi" },
        { "name": "Congo" }
      ],

      categoriesArray: [
        {
        title: "Main Category",
        id: null,
        selected_category: null,
        selected_category_id: null,
        sub_categories: [] }
        ],

      availableVendors: []
    }
  },

  methods: {

    /*** Products **/
    fetchProducts() {
      axios.get('/resources/products/products?category=1').then((response) => {
        this.products = response.data.payload.products.data;
      }).catch((error) => {
        console.log(error)
      })
    },

    showProductForm(product){
      this.productInstance = product? product : {};
      this.productFormDialog = true;
    },

    saveProduct(){
      let selectedCategories = this.categoriesArray.map(function (cat) {
          return cat.selected_category? cat.selected_category.id : null;
      }).filter(item => !!item);

      this.productInstance.categories_ids = selectedCategories;
      console.log(JSON.stringify(this.productInstance));

      axios.post('/products/product/add', this.productInstance)
        .then((response) => {
          this.productFormDialog = false;
          this.productInstance = {};
          this.fetchProducts();
        }).catch((error) => {
        console.log(error)
        })
    },

    confirmProductRemoval(product){
      this.productInstance = product;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove '+this.productInstance.product_name,
        accept: this.removeProduct
      })
    },

    removeProduct(){
      axios.post('/config/addresses/product/remove', {
        id: this.productInstance.id
      })
        .then((response) => {
          this.fetchProducts();
        }).catch((error) => {
        console.log(error)
        })
    },

    /*** Product **/
    closeProductForm(){
      this.productFormDialog = false;
    },

    /*** Categories Resources **/
    getAvailableCategories(categoriesIndex){
       let letCatId = this.categoriesArray[categoriesIndex].id;
        axios.get('/resources/products/categories?parent_id='+letCatId).then((response) => {
          this.categoriesArray[categoriesIndex].sub_categories = response.data.payload.categories ;
        }).catch((error) => {
          console.log(error);
        });
    },

    fetchSubCategories(selectedCategory){

        axios.get('/resources/products/categories?parent_id='+selectedCategory.selected_category.id)
         .then((response) => {
          const subCategories = response.data.payload.categories ;
          if(subCategories.length>0){
            console.log("Has sub categories");
            let category = {};
            category.id = selectedCategory.id;
            category.title = selectedCategory.selected_category.category_name+" Subcategory";
            category.selected_category_id = selectedCategory.null;
            category.sub_categories = subCategories;
            this.categoriesArray.push(category);
          }
       }).catch((error) => {
        console.log(error);
      });
    },

    /*** Vendors Resources **/
    fetchVendors(){
      axios.get('/resources/products/vendors/all')
        .then((response) => {
          this.availableVendors = response.data.payload.vendors ;
        }).catch((error) => {
        console.log(error);
      });
    },



  },

  created() {
    this.getAvailableCategories(0);
    this.fetchVendors();
  },
  mounted() {
    this.fetchProducts();
  }
}
</script>
