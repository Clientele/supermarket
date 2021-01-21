 <template>
  <div id="page-user-view">

    <!-- Variant form -->
    <div v-if="productVariantFormVisible" class="mb-6 variant-form">

      <div class="flex flex-wrap">

        <div class="flex-grow">
          <h3>Product Variant Information</h3>
        </div>


      </div>

      <div class="vx-row">

          <div class="vx-col md:w-1/3 w-1/4">

            <!-- Variant Name -->
            <vs-input class="w-full mt-4" label="Variant Name" v-model="productVariantInstance.variant_name"
                      v-validate="'required'" name="variant_name"/>
            <span class="text-danger text-sm" v-show="errors.has('variant_name')">
              {{errors.first('variant_name') }}
            </span>

            <!-- Restocking Quantity  -->
            <vs-input class="w-full mt-4" label="Restocking Quantity" v-model="productVariantInstance.restocking_quantity"
                      v-validate="'required'" name="product_name"/>
            <span class="text-danger text-sm" v-show="errors.has('restocking_quantity')">
              {{errors.first('restocking_quantity') }}
            </span>

            <!-- Measurement Unit -->
            <vs-input class="w-full mt-4" label="Measurement Unit" v-model="productVariantInstance.measuring_unit"
                      v-validate="'required'" name="measuring_unit"/>
            <span class="text-danger text-sm" v-show="errors.has('measuring_unit')">
              {{errors.first('measuring_unit') }}
            </span>

          </div>

          <div class="vx-col md:w-1/3 w-1/4">
          </div>

          <div class="vx-col md:w-1/3 w-1/4">
            <div class="flex flex-wrap">
              <div class="flex-grow">
                <h3>Images</h3>
              </div>

              <vs-button round   @click="closeVariantForm()" color="secondary"  >
                Add Image
              </vs-button>

            </div>

          </div>


      </div>

      <div class="vx-row mt-12">
        <div class="vx-col w-full">
          <div class="flex items-start flex-col sm:flex-row">
            <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
            <div>
              <vs-button type="border" @click="closeVariantForm()" color="danger" class="mr-4 mb-4">Cancel
              </vs-button>

              <vs-button ref="saveButton" @click="saveProductVariant()" color="success" class="mr-4 mb-4">Save
              </vs-button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- [end] Variant form -->

    <div>
     <!-- Heading -->
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
     <!-- [end] Heading -->

      <!-- Variant List -->
     <vs-table stripe :data="productsVariants">

       <template slot="thead">
         <vs-th>Variant Name</vs-th>
         <vs-th>Unit</vs-th>
         <vs-th>Restocking Quantity</vs-th>
         <vs-th>Status</vs-th>
         <vs-th>Action </vs-th>
         <vs-th> </vs-th>
       </template>

       <template slot-scope="{data}">
         <vs-tr :key="rowIndex" v-for="(tr, rowIndex) in data">

           <vs-td :data="data[rowIndex].variant_name"> {{ data[rowIndex].variant_name }} </vs-td>
           <vs-td :data="data[rowIndex].variant_name"> {{ data[rowIndex].measuring_unit }} </vs-td>

           <vs-td :data="data[rowIndex].restocking_quantity"> {{ data[rowIndex].restocking_quantity }} </vs-td>

           <vs-td :data="data[rowIndex].vendor">
             <vs-chip v-if="data[rowIndex].is_published" color="success">Published</vs-chip>
             <vs-chip v-else color="danger">Not Published</vs-chip>
           </vs-td>


           <vs-td :data="data[rowIndex].id">
             <vs-button type="border" color="secondary" class="mr-4" size="small"
                        @click="showProductVariants(data[rowIndex])">Open</vs-button>
             <vs-button type="border" class="mr-4" size="small"
                        @click="showVariantForm(data[rowIndex])">Edit</vs-button>
             <vs-button   color="success" class="mr-12" size="small"
                        @click="confirmRemoval(data[rowIndex])">Publish</vs-button>

           </vs-td>

           <vs-td :data="data[rowIndex].id">
             <vs-button type="border" color="danger" class="mr-4" size="small"
                        @click="confirmRemoval(data[rowIndex])">Remove</vs-button>
           </vs-td>

         </vs-tr>
       </template>
     </vs-table>
      <!-- [End] Variant List -->
   </div>



  </div>
</template>

<script>

import axios from "@/axios";
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  props: {
    product: Object
  },
  data () {
    return {
      user_data: null,
      productsVariants: [  ],
      rolesAvailable: [],
      staffStatus: [ 'Active', 'Suspended' ],

      productVariantFormVisible: false,
      productVariantInstance: {
        variant_name : '',
        restocking_quantity: '',
        measuring_unit: ''
      }

    }
  },
  watch: {
    product: function (newVal) {
      this.fetchProductVariants();
    }
  },

  computed: {
    validateForm () {
      return !this.errors.any()
    }
  },

  methods: {
    closeProductVariants(){
      this.$emit('closeProductVariants');
    },

    fetchProductVariants() {
      console.log("Fetching variants");
      axios.get('/resources/product/variants?product_id='+this.product.id)
        .then((response) => {
             this.productsVariants = response.data.success? response.data.payload.product_variants : [];
          }).catch((error) => {
        console.log(error)
      })
    },

    showVariantForm(variant = {}){
      this.productVariantInstance = variant
      this.productVariantFormVisible = true;
    },

    saveProductVariant(){

      this.productVariantInstance.product_id = this.product.id;

      let endpoint = '/config/product/variant/add';
      if(Number.isInteger(this.productVariantInstance.id)){
          endpoint = '/config/product/variant/update';console.log("Updating...")
      }

      console.log(endpoint);

      axios.post( endpoint, this.productVariantInstance)
        .then((response) => {
         this.productVariantFormVisible = false;
         this.fetchProductVariants();
      }).catch((error) => {
        let message = "Something went wrong";
        if(error.response){
            message = error.response.data.message;
        }

        this.$vs.loading.close();
        this.$vs.notify({
          time: 12000,
          color: 'danger',
          title: 'Failed',
          text: message
        })
        console.log(error)
      })
    },

    closeVariantForm(){
      this.productVariantFormVisible = false;
    },

    confirmRemoval(variant){
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

    removeProductVariant(){
      axios.post('/config/product/variant/remove', {
        id: this.productVariantInstance.id
      })
        .then((response) => {
          this.fetchProductVariants();
        }).catch((error) => {
        console.log(error)
      });
    }


    /** Resources **/


  },

  mounted () {
     this.fetchProductVariants();
   }
}

</script>

<style scoped>
.variant-form{
  border-radius: 6px;
  padding:  32px 16px;
  border: 1px solid #b2c2b2;
  background-color: #fffaf5;
}
</style>

