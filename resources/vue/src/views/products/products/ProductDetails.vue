<template>
  <div id="page-user-view">


    <div class="px-12">
      <!-- Product info -->
      <div class="flex flex-wrap items-center mb-6">
        <div class="flex-grow">
          <div class="flex flex-wrap ">
            <h2 class="font-bold"
                style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
              {{ productInstance ? productInstance.product_name : '' }}
            </h2>
          </div>

        </div>

      </div>
      <vs-divider class="mb-5"></vs-divider>

      <div>
        <vs-row class="mb-12">

          <!-- Product details -->
          <div class="vx-col md:w-1/4  ">
            <vx-card class="mb-12">
              <div class="flex flex-wrap">
                <div class="flex-grow">
                  <h4>Product Image</h4>
                </div>
              </div>

              <div  class="px-12 py-12 my-6" style="border: 1px solid #e1e1e1" >
                <img :src="productInstance ? productInstance.img_url:'' "
                     alt="content-img" class="responsive card-img-top">
              </div>

              <vs-button @click="showProductImageForm" color="secondary">Update Thumbnail</vs-button>

            </vx-card>

            <vx-card>
              <h4>Product Description</h4>
              <p class="mt-4"> {{ productInstance ? productInstance.product_description?productInstance.product_description:'No product description' : "No product description" }} </p>
            </vx-card>
          </div>
          <!-- [end] Product details -->

          <!-- Variants list -->
          <div class="vx-col md:w-3/4 pl-12  ">
            <vx-card>
              <!-- Variant Heading -->
              <div class="flex flex-wrap items-center mb-6">
                <div class="flex-grow">
                  <div class="flex flex-wrap ">
                    <h2 class="font-bold"
                        style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
                      Products Variants
                    </h2>

                    <vs-button icon="refresh" class="py-0 ml-4" type="flat" @click="fetchProductVariants()">Refresh</vs-button>
                  </div>

                </div>

                <vs-button icon="add" @click="showVariantForm()">Add Variant</vs-button>
              </div>
              <!-- [end] Variant Heading -->

              <!-- Variant List -->
              <vs-table stripe v-model="productVariantInstance" :data="productsVariants" @selected="showVariantDetails">

                <template slot="thead">
                  <vs-th>Thumbnail </vs-th>
                  <vs-th>Variant Name</vs-th>
                  <vs-th>Unit</vs-th>
                  <vs-th>Restocking Quantity</vs-th>
                  <vs-th>Status</vs-th>
                </template>

                <template slot-scope="{data}">
                  <vs-tr :data="item" :key="rowIndex" v-for="(item, rowIndex) in data">
                    <vs-td><div style="max-width: 32px" class="mr-2">
                      <img :src="item.img_url" alt="content-img" class="responsive card-img-top">
                    </div></vs-td>
                    <vs-td :data="data[rowIndex].variant_name"> {{ data[rowIndex].variant_name }}</vs-td>
                    <vs-td :data="data[rowIndex].variant_name"> {{ data[rowIndex].measuring_unit }}</vs-td>

                    <vs-td :data="data[rowIndex].restocking_quantity"> {{ data[rowIndex].restocking_quantity }}</vs-td>

                    <vs-td :data="data[rowIndex].vendor">
                      <vs-chip v-if="data[rowIndex].is_published" color="success">Published</vs-chip>
                      <vs-chip v-else color="danger">Not Published</vs-chip>
                    </vs-td>

                  </vs-tr>
                </template>
              </vs-table>
              <!-- [End] Variant List -->
            </vx-card>
           </div>
          <!-- [end] Variants list -->

        </vs-row>
      </div>

      <!-- [end] Product info -->
      <vs-divider class="mb-5"></vs-divider>


    </div>


    <!-- Image Form -->
    <vs-popup @close="productImageDialog=false" fullscreen title=""
              :active.sync="productImageDialog">

      <label class="btn btn-default">
        <input type="file" ref="product_image" @change="selectProductImageFile"/>
      </label>

      <vs-button color="secondary" @click="uploadProductThumbnail">Upload</vs-button>

    </vs-popup>


    <div v-if="productVariantInstance">
      <!-- Variant Information -->
      <vs-popup @close="closeProductVariantForm()" fullscreen title=""  :active.sync="productVariantFormVisible">
        <product-variant-information @closeVariantDialog="closeProductVariantForm" v-bind:productVariant="productVariantInstance" v-bind:product="product"></product-variant-information>
      </vs-popup>
      <!-- [end] Variant form -->
    </div>


  </div>
</template>

<script>

import axios from "@/axios";
import vSelect from 'vue-select'
import ProductVariantInformation from "@/views/products/products/ProductVariantInformation";
import {handle} from "@/http/handler";

export default {
  components: {
    vSelect,
    ProductVariantInformation
  },
  props: {
    product: Object
  },
  data() {
    return {
      productInstance: { product_name: '', },
      productsVariants: [],

      productVariantFormVisible: false,
      productVariantInstance: {
        variant_name: '',
        base_price: '',
        restocking_quantity: '',
        measuring_unit: ''
      },

      variantDetailsDialog: false,
      measurementUnits: ['Liters', 'Kilograms', 'Meters', 'CCs', 'Bottles', 'Bags', 'Crates', 'Satchel', 'Canes'],

      /** Product Images */
      productImageDialog: false,
      selectedFile: null,

      /** Variant Images */
      variantImageForm: false

    }
  },
  watch: {
    product: function (newVal) {
      if(newVal!=null){
        this.fetchProductDetails();
        this.fetchProductVariants();
      }
    }
  },

  computed: {
    validateForm() {
      return !this.errors.any()
    },

    productImageUrl() {
      return axios.defaults.baseURL + "/config/product/image/update";
    }
  },

  methods: {

    /*** Product ***/
    fetchProductDetails() {
      this.$vs.loading({ color: 'secondary' })
      console.log("Fetching product details ...");
      axios.get('/resources/product/details?id=' + this.product.id)
        .then((response) => {
          this.$vs.loading.close();
          this.productInstance = response.data.payload.product;
        }).catch((error) => {
        this.$vs.loading.close();
        console.log(error)
      })
    },

    /*** Images **/
    selectProductImageFile() {
      if(this.$refs.product_image == null){
        this.sadlyNotify("No image selected");
        return ;
      }
      this.selectedFile = this.$refs.product_image.files.item(0);
     },

    showProductImageForm() {
      console.log(JSON.stringify(this.productImageUrl));
      this.productImageDialog = true;
    },

    uploadProductThumbnail() {
      this.$vs.loading({ color: 'secondary' })
      if (this.selectedFile == null) {
        this.$vs.notify({color: 'danger', title: 'Error', text: 'Select image file'});
        return;
      }

      let formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("id", this.product.id);
      axios.post('/config/product/image/update', formData, {headers: {"Content-Type": "multipart/form-data"}})
        .then((response) => {
          this.$vs.loading.close();
          this.productImageDialog = false;
          this.$vs.notify({color: 'success', title: 'Success', text: 'Image Uploaded'});
          this.fetchProductDetails();
        }).catch((error) => {
        this.$vs.loading.close();
        console.log(error)
        this.handleUploadError(error)
      })

    },

    fetchProductVariants() {
      console.log("Fetching variants");
      axios.get('/resources/product/variants?product_id=' + this.product.id)
        .then((response) => {
          this.productsVariants = response.data.success ? response.data.payload.product_variants : [];
        }).catch((error) => {
        console.log(error)
      })
    },

    closeProductVariants() {
      this.$emit('closeProductVariants');
    },

    showVariantDetails() {
      this.productVariantFormVisible = true;
    },

    showVariantForm() {
      this.productVariantInstance = {variant_name: '',  base_price: '', restocking_quantity: '', measuring_unit: ''} ;
      this.productVariantFormVisible = true;
    },

    closeProductVariantForm() {
      this.productVariantFormVisible = false;
      this.productVariantInstance = {variant_name: '',  base_price: '', restocking_quantity: '', measuring_unit: ''} ;
    },
    /*** [end] Adding variant **/

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
    this.fetchProductDetails();
  },

  mounted() {
    this.fetchProductDetails();
    this.fetchProductVariants();
  }
}

</script>

<style scoped>
.variant-form {
  border-radius: 6px;
  padding: 32px 16px;
  border: 1px solid #b2c2b2;
  background-color: #fffaf5;
}

.image-form-div{
  border-radius: 6px;
  padding: 32px 16px;
  border: 1px solid #b2c2b2;
  background-color: #fffaf5;
}
</style>

