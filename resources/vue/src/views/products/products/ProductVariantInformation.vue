<template>
  <div id="page-user-view">

    <div>
      <div class="flex flex-wrap">

        <div style="max-width: 32px" class="mr-2">
          <img :src="productVariantInstance?productVariantInstance.img_url:''"
               alt="content-img" class="responsive card-img-top">
        </div>
        <div class="flex-grow">
          <h3 class="mt-2">Product Variant Information</h3>
        </div>

      </div>

      <vs-divider></vs-divider>

      <div class="mt-5">
         <vs-tabs alignment="fixed">
          <vs-tab label="Primary Information">
            <!-- Variant information -->
            <div class="vx-col md:w-1/4 w-1/5">
              <div class="flex flex-wrap">
                <div class="flex-grow">
                  <h3>Primary Info</h3>
                </div>

              </div>


              <!-- Variant Name -->
              <vs-input class="w-full mt-4" label="Variant Name" v-model="productVariantInstance.variant_name"
                        v-validate="'required'" name="name"/>
              <span class="text-danger text-sm" v-show="errors.has('name')">
              {{ errors.first('name') }}
            </span>

              <!-- Variant Base Price -->
              <vs-input class="w-full mt-4" label="Base Price" v-model="productVariantInstance.base_price"
                        v-validate="'required'" name="price"/>
              <span class="text-danger text-sm" v-show="errors.has('price')">
              {{ errors.first('price') }}
            </span>

              <!-- Restocking Quantity  -->
              <vs-input class="w-full mt-4" label="Restocking Quantity"
                        v-model="productVariantInstance.restocking_quantity"
                        v-validate="'required'" name="name"/>
              <span class="text-danger text-sm" v-show="errors.has('quantity')">
              {{ errors.first('quantity') }}
            </span>

              <!-- Measurement Unit -->
              <div style="height: 12px"></div>
              <span>Measurement Unit </span>
              <v-select v-model="productVariantInstance.measuring_unit" :clearable="false"
                        :options="measurementUnits" v-validate="'required'" name="unit"
                        placeholder="Select">
              </v-select>
              <span class="text-danger text-sm" v-show="errors.has('unit')">
              {{ errors.first('unit') }}
            </span>


              <div class="flex items-start flex-col sm:flex-row mt-12">
                <div>
                  <vs-button type="border" @click="closeVariantDialog()" color="danger" class="mr-4 mb-4">Cancel
                  </vs-button>

                  <vs-button ref="saveButton" @click="saveProductVariant()" color="success" class="mr-4 mb-4">Save
                  </vs-button>
                </div>
              </div>


            </div>
            <!-- [end] Variant information -->

          </vs-tab>

          <vs-tab label="Variant Prices">
            <!-- Variant description & prices-->
            <div class="vx-col md:w-1/3 w-1/4 px-12" v-if="productVariantInstance" >

              <!-- Description -->
              <div v-if="!variantPriceForm" class="flex flex-wrap">
                <div class="flex-grow">
                  <h3>Variant Description</h3>
                  <div class="mt-6">
                    <vs-textarea height="256px" counter="1024"
                                 label="Description"
                                 v-model="productVariantInstance.description" />
                  </div>
                </div>
              </div>

              <!-- Variant Prices -->
              <div class="mt-12">
                <vs-divider></vs-divider>
                <div class="flex flex-wrap justify-between">
                  <h3>Variant Prices</h3>
                  <vs-button v-if="!variantPriceForm" round @click="showPriceForm()" color="secondary">
                    Add Price
                  </vs-button>
                </div>
                <vs-divider></vs-divider>
              </div>

              <!-- Price form -->
              <div class="image-form-div" v-if="variantPriceForm">
                <h4> Price information</h4>

                <!-- Sales zone -->
                <div class="my-6">
                  <span>Sales Zone </span>
                  <v-select v-model="priceInstance.zone" :clearable="false"
                            label="zone_name"   :options="salesZones" v-validate="'required'" name="unit"
                            placeholder="Select">
                  </v-select>
                </div>

                <!-- Amount -->
                <div class="my-4">
                  <vs-input class="w-full mt-4" label="Amount" v-model="priceInstance.amount"
                            v-validate="'required'" name="amount"/>
                  <span class="text-danger text-sm" v-show="errors.has('amount')"> {{ errors.first('amount') }} </span>
                </div>

                <div class="flex flex-wrap">
                  <vs-button class="mr-4" color="warning" @click="variantPriceForm=false">Cancel</vs-button>
                  <vs-button color="secondary" @click="saveVariantPrice">Upload</vs-button>
                </div>
              </div>
              <!-- [end] Price form -->

              <div v-if="!priceRemovalDialog" class="variant-price flex flex-wrap justify-between"
                   v-for="(variantPrice, index) in productVariantInstance.prices" :key="index">
                <table>
                  <tr>
                    <td  >TSH {{ variantPrice.amount }}</td>
                  </tr>
                  <tr>
                    <td class="mr-12">Sales Zone</td>
                    <td>{{ variantPrice.zone ? variantPrice.zone.zone_name : '' }}</td>
                  </tr>

                  <tr>
                    <td  class="mr-12">Created</td>
                    <td>{{ variantPrice.created_at }}</td>
                  </tr>
                </table>
                <div>
                  <vs-button v-if="priceRemovalDialog"  class="px-2 py-2" @click="removeVariantPrice()" color="danger">Continue</vs-button>

                  <vs-button v-else @click="confirmPriceRemoval(variantPrice)" type="border" radius color="danger"
                             icon="close"></vs-button>
                </div>
              </div>

              <div v-if="priceRemovalDialog" class="variant-price flex flex-wrap justify-between" >
                <table v-if="priceInstance">
                  <tr>
                    <td  >TSH {{ priceInstance.amount }}</td>
                  </tr>
                  <tr>
                    <td class="mr-12">Sales Zone</td>
                    <td>{{ priceInstance.zone ? priceInstance.zone.zone_name : '' }}</td>
                  </tr>

                  <tr>
                    <td  class="mr-12">Created</td>
                    <td>{{ priceInstance.created_at }}</td>
                  </tr>
                </table>
                <div>
                  <vs-button   class="px-2 py-2" @click="removeVariantPrice()" color="danger">Continue</vs-button>
                </div>
              </div>

            </div>
            <!-- [end] Variant description & prices -->

          </vs-tab>

          <vs-tab label="Variant Images">
            <!-- Variant images -->
            <div class="vx-col md:w-1/3 w-1/4">
              <div class="flex flex-wrap mb-6">
                <div class="flex-grow">
                  <h3>Images</h3>
                </div>

                <vs-button v-if="!variantImageForm" round @click="showVariantImageForm()" color="secondary">
                  Add Image
                </vs-button>
              </div>

              <!-- Variant image form -->
              <div class="image-form-div" v-if="variantImageForm">

                <div class="my-6">
                  <label class="btn btn-default">
                    <input type="file" ref="variant_image" @change="selectVariantFile"/>
                  </label>
                </div>

                <div class="flex flex-wrap mb-6">
                  <vs-checkbox  v-model="is_thumbnail">Is thumbnail</vs-checkbox>
                </div>

                <div class="flex flex-wrap">
                  <vs-button class="mr-4" color="warning" @click="variantImageForm=false">Cancel</vs-button>
                  <vs-button color="secondary" @click="uploadVariantImage">Upload</vs-button>
                </div>
              </div>
              <!-- [end] Variant image form -->

              <!-- Images list -->
              <div v-if="!imageInHold">
                <div  class="pt-4 mb-6" v-if="productVariantInstance" >
                  <vs-row>
                    <vs-col class="md:w-1/3"  style="border: 1px solid #e1e1e1"
                            v-for="(productImage,index) in productVariantInstance.images"  :key="index">
                      <div class="px-4 py-4"  @click="confirmImageRemoval(productImage)">
                        <img
                          :src="productImage.url"
                          alt="content-img" class="responsive card-img-top">
                      </div>
                    </vs-col>
                  </vs-row>
                </div>
              </div>

              <div v-else class="px-12 py-12" style="border: 1px solid #e2e2e2">
                <div class="flex flex-wrap justify-center">
                  <div style="max-width: 192px">
                    <img
                      :src="imageInHold?imageInHold.url :'' "
                      alt="content-img" class="responsive card-img-top">
                  </div>
                </div>
                <vs-divider></vs-divider>
                <div class="flex flex-wrap justify-between mt-4">
                  <vs-button  @click="imageInHold=null" color="secondary">
                    Close
                  </vs-button>

                  <vs-button  @click="removeProductImage" color="danger">
                    Remove
                  </vs-button>
                </div>
              </div>

            </div>
            <!-- [end] Variant images -->
          </vs-tab>
        </vs-tabs>
      </div>




    </div>

  </div>
</template>

<script>

import axios from "@/axios";
import vSelect from 'vue-select'
import ProductDetails from "@/views/products/products/ProductDetails";
import _ from 'lodash'
import {handle} from "@/http/handler";
import Table from "@/views/ui-elements/table/Table";
export default {
  components: {
    Table,
    vSelect,
    ProductDetails
  },
  props: {
    product: Object,
    productVariant: Object
  },
  data() {
    return {
      productVariantInstance: {
        variant_name: '',
        base_price: '',
        restocking_quantity: '',
        measuring_unit: '',
        prices: []
      },

      variantDetailsDialog: false,
      measurementUnits: ['Liters', 'Kilograms', 'Meters', 'CCs', 'Bottles', 'Bags', 'Crates', 'Satchel', 'Canes'],

      /** Variant Images */
      variantImageForm: false,
      is_thumbnail: false,
      selectedVariantImage: null,
      imageConfirmationDialog: false,
      imageInHold: null,

      /** Variant Prices */
      variantPriceForm: false,
      priceInHold: null,
      priceRemovalDialog: false,

      /**Resources **/
      salesZones: [],
      priceInstance: {
        zone_id: '',
        product_variant_id: '',
        amount: '',
        zone: {}
      },

    }
  },
  watch: {
    productVariant: function (variant) {
      // this.productVariantInstance = _.cloneDeep(variant);
      if(variant.id!=null){
        this.fetchVariantDetails();
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

    fetchVariantDetails() {
      this.imageInHold = null;
      console.log("Fetch product details ...");
      axios.get('/resources/product/variant/details?id=' + this.productVariant.id)
        .then((response) => {
          this.productVariantInstance = response.data.payload.variant;
        }).catch((error) => {
          this.handleApiError(error)
          console.log(error)
      })
    },


    closeProductVariants() {
      this.$emit('closeProductVariants');
    },

    /*** Adding variant **/
    saveProductVariant() {

      this.$vs.loading({ color: 'secondary' })
      this.productVariantInstance.product_id = this.product.id;

      let endpoint = '/config/product/variant/add';
      if (Number.isInteger(this.productVariantInstance.id)) {
        endpoint = '/config/product/variant/update';
        console.log("Updating...")
      }

      console.log(endpoint);
      axios.post(endpoint, this.productVariantInstance)
        .then((response) => {
          this.$vs.loading.close();
          this.closeProductVariants();
          this.happilyNotify("Product variant saved")
        }).catch((error) => {
        this.$vs.loading.close();
        let message = "Something went wrong";
        this.handleApiError(error)
      })
    },

    closeVariantDialog() {
      this.$emit('closeVariantDialog')
    },
    /*** [end] Adding variant **/

    confirmVariantRemoval(variant) {
      this.productVariantInstance = variant;
      this.closeProductVariants();
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove ' + this.productVariantInstance.variant_name,
        accept: this.removeProductVariant
      })
    },

    removeProductVariant() {
      axios.post('/config/product/variant/remove', {
        id: this.productVariantInstance.id
      })
        .then((response) => {
          this.closeProductVariants();
        }).catch((error) => {
        console.log(error)
      });
    },

    showVariantDetails() {
      this.variantDetailsDialog = true;
    },


    /** Variant image **/
    showVariantImageForm(){
      this.variantImageForm = true
    },

    selectVariantFile(){
      this.selectedVariantImage = this.$refs.variant_image.files.item(0);
    },

    uploadVariantImage() {

      if (this.selectedVariantImage == null) {
        this.$vs.notify({color: 'danger', title: 'Error', text: 'Select image file'});
        return;
      }

      this.$vs.loading({ color: this.colorLoading })
      let formData = new FormData();
      formData.append("file", this.selectedVariantImage);
      formData.append("is_thumbnail", this.is_thumbnail);
      formData.append("id", this.productVariantInstance.id);

      axios.post('/config/product/variant/image/update', formData, {headers: {"Content-Type": "multipart/form-data"}})
        .then((response) => {
          this.$vs.loading.close()
          this.variantImageForm = false;
          this.$vs.notify({color: 'success', title: 'Success', text: 'Image Uploaded'});
          this.fetchVariantDetails();
        }).catch((error) => {
        console.log(error)
        this.handleApiError(error)
        this.$vs.loading.close()

      })

    },

    confirmImageRemoval(productImage) {
      console.log("Showing confirmation dialog");
      this.imageConfirmationDialog = true;
      this.imageInHold = productImage;
    },

    removeProductImage(){
      this.$vs.loading({ color: 'secondary' })
      axios.post('/config/product/variant/image/remove' , {
        id : this.imageInHold.id
      }).then((response) => {
        this.imageInHold = null;
        this.$vs.loading.close();
        this.fetchVariantDetails();
      }).catch((error) => {
        this.$vs.loading.close();
        console.log(error)
      })
    },
    /** [end] Variant image **/

    /** Variant price **/
    showPriceForm(){
      this.variantPriceForm = true;
    },

    saveVariantPrice(){
      this.$vs.loading({ color: this.colorLoading });
      this.priceInstance.zone_id = this.priceInstance.zone.id;
      this.priceInstance.product_variant_id = this.productVariant.id;
      console.log(JSON.stringify(this.priceInstance));

      axios.post( '/config/product/variant/price/add',
        this.priceInstance
      ).then((response) => {
        this.$vs.loading.close()
        this.fetchVariantDetails();
        this.happilyNotify("Price saved")
        this.variantPriceForm = false;

      }).catch((error) => {
        this.$vs.loading.close()
        this.variantPriceForm = false;
        this.handleApiError(error);
        console.log(error)
      });
     },

    confirmPriceRemoval(price){
      this.priceInstance = price;
      this.priceRemovalDialog = true;
    },

    removeVariantPrice(){
      this.$vs.loading({ color: this.colorLoading });

      axios.post( '/config/product/variant/price/remove',
        this.priceInstance
      ).then((response) => {
        this.$vs.loading.close()
        this.fetchVariantDetails();
        this.happilyNotify("Price removed")
        this.priceRemovalDialog = false;

      }).catch((error) => {
        this.$vs.loading.close()
        this.variantPriceForm = false;
        this.handleApiError(error);
        console.log(error)
      });
     },
    /** [end] Variant price **/


    /**  Resources **/
    fetchSalesZones() {
      axios.get('/resources/addresses/zones').then((response) => {
        this.salesZones = response.data.payload.zones;
      }).catch((error) => {
        console.log(error)
      })
    },
    /** [end] Resources **/


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
    }
  },

  created() {
    console.log("Creating variant info");
    console.log(JSON.stringify(this.productVariant))
    this.productVariantInstance = _.cloneDeep(this.productVariant);
    this.fetchSalesZones();
   },

  mounted() {
   this.fetchVariantDetails();
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

.variant-price{
  border-radius: 6px;
  padding: 8px 16px;
  border: 1px solid #ffedc2;
  background-color: #fffaf0;
  margin-bottom: 16px;
}

</style>

