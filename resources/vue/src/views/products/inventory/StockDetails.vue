<template>
  <div id="page-user-view">

    <!-- Variant form -->
    <div v-if="stockFormVisible" class="mb-12 ">

      <div class="flex flex-wrap">

        <div class="flex-grow">
          <h3>Receive {{ product.product_name }} {{ selectedVariant.variant_name }},
            <span style="font-weight: lighter">Depot: {{ depot.depot_name}}</span>
          </h3>
        </div>

      </div>

      <div class="vx-row">

        <div class="vx-col md:w-1/3 w-1/4">

          <div class="variant-form mt-6">
            <!-- Variant Name -->
            <vs-input class="w-full mt-4" label="Received Quantity" v-model="depotStockInstance.received_quantity"
                      v-validate="'required'" name="received_quantity"/>
            <span class="text-danger text-sm" v-show="errors.has('received_quantity')">
              {{ errors.first('received_quantity') }}
            </span>

            <!-- Batch Number  -->
            <vs-input class="w-full mt-4" label="Batch Number"
                      v-model="depotStockInstance.batch_number"
                      v-validate="'required'" name="batch_number"/>
            <span class="text-danger text-sm" v-show="errors.has('batch_number')">
              {{ errors.first('batch_number') }}
            </span>

            <div style="height: 8px"></div>
            <span class="text-black text-sm"> Expiry Date </span>
            <datepicker placeholder="Expiry Date" v-model="depotStockInstance.expiry_date"></datepicker>

            <div class="flex mt-6">
              <vs-button type="border" @click="closeStockForm()" color="danger" class="mr-4 mb-4">Cancel
              </vs-button>

              <vs-button ref="saveButton" @click="saveReceivedStock()" color="success" class="mr-4 mb-4">Save
              </vs-button>
            </div>

          </div>

        </div>

      </div>


    </div>
    <!-- [end] Variant form -->


    <!-- Batches breakdown -->
    <div v-else-if="variantBatchesVisible">
      <!-- Heading -->
      <div class="flex flex-wrap items-center mb-6">
        <div class="flex-grow">
          <div class="flex flex-wrap ">
            <vs-button type="border" radius color="danger" icon="close" class="mt-2 mr-2"
                       @click="closeStockBatchBreakdown()"></vs-button>
            <h2 class="font-bold"
                style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
              Batches
            </h2>

            <vs-button icon="refresh" class="py-0 ml-4" type="flat" @click="fetchVariantStock()">Refresh</vs-button>
          </div>

        </div>

      </div>
      <!-- [end] Heading -->

      <!-- Variant List -->
      <vs-table stripe :data="variantDepotBatches">

        <template slot="thead">
          <vs-th>Batch #</vs-th>
          <vs-th>Reception Date</vs-th>
          <vs-th>Received QTY</vs-th>
          <vs-th>Remaining QTY</vs-th>
          <vs-th>Ratio</vs-th>
          <vs-th></vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="rowIndex" v-for="(tr, rowIndex) in data">

            <vs-td  > {{ data[rowIndex].batch_number }}</vs-td>
            <vs-td  > {{ data[rowIndex].received_at }}</vs-td>
            <vs-td > {{ data[rowIndex].received_quantity }}</vs-td>
            <vs-td > {{ data[rowIndex].remaining_quantity }}</vs-td>

            <vs-td>
              <vs-progress :height="12" :percent="(data[rowIndex].remaining_quantity/((data[rowIndex].received_quantity)))*100"
                           color="secondary">
              </vs-progress>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>
      <!-- [End] Variant List -->
    </div>
    <!-- [end] Batches breakdown -->

    <!-- Variant stocks -->
    <div v-else>
      <!-- Heading -->
      <div class="flex flex-wrap items-center mb-6">
        <div class="flex-grow">
          <div class="flex flex-wrap ">
            <h2 class="font-bold"
                style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
             {{ product.product_name }}  <span style="font-weight: lighter; margin-left: 1em"> Stocks</span>
            </h2>

            <vs-button icon="refresh" class="py-0 ml-4" type="flat" @click="fetchVariantStock()">Refresh</vs-button>
          </div>

        </div>

      </div>
      <!-- [end] Heading -->

      <!-- Variant List -->
      <vs-table stripe :data="productsVariants">

        <template slot="thead">
          <vs-th>Variant Name</vs-th>
          <vs-th>Remaining quantity</vs-th>
           <vs-th>Status</vs-th>
          <vs-th>Level</vs-th>
          <vs-th></vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="rowIndex" v-for="(tr, rowIndex) in data">

            <vs-td  > {{ data[rowIndex].variant_name }}</vs-td>
            <vs-td > {{ data[rowIndex].remaining_quantity }}</vs-td>

            <vs-td>
              <vs-chip type="border" v-if="data[rowIndex].remaining_quantity>0" color="success">In Stock</vs-chip>
              <vs-chip v-else color="danger">Out Of Stock</vs-chip>
            </vs-td>

            <vs-td>
              <vs-progress :height="12" :percent="(data[rowIndex].remaining_quantity/(2*(data[rowIndex].restocking_quantity)))*100"
                           :color="data[rowIndex].remaining_quantity <= data[rowIndex].restocking_quantity? `danger`: `success`">
              </vs-progress>
            </vs-td>

            <vs-td :data="data[rowIndex].id">

              <vs-button color="secondary" class="mr-12" size="small"
                         @click="showStockReceptionForm(data[rowIndex])">Receive
              </vs-button>

              <vs-button type="border" color="secondary" class="mr-4" size="small"
                         @click="showStockBatchBreakdown(data[rowIndex])">Breakdown
              </vs-button>

            </vs-td>

          </vs-tr>
        </template>
      </vs-table>
      <!-- [End] Variant List -->
    </div>
    <!-- [end] Variant stocks -->






  </div>
</template>

<script>

import axios from "@/axios";
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    vSelect,Datepicker
  },
  props: {
    product: Object,
    depot: Object,
  },
  data() {
    return {
      user_data: null,
      productsVariants: [],
      rolesAvailable: [],
      selectedVariant: {},
      staffStatus: ['Active', 'Suspended'],

      stockFormVisible: false,
      depotStockInstance: {
        depot_id: null,
        product_variant_id: null,
        received_quantity: null,
        batch_number: null,
        expiry_date: null
      },

      variantBatchesVisible: false,
      variantDepotBatches: []

    }
  },
  watch: {
    product: function (newVal) {
      this.fetchVariantStock();
    }
  },

  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },

  methods: {
    closeProductVariants() {
      this.$emit('closeProductVariants');
    },

    fetchVariantStock() {
      console.log("Fetching variants stock..");
      let endpoint = '/products/inventory/stock/product?product_id=' + this.product.id
                      +"&depot_id="+ this.depot.id;
      axios.get(endpoint)
        .then((response) => {
          this.productsVariants = response.data.success ? response.data.payload.variants : [];
        }).catch((error) => {
        console.log(error)
      })
    },

    showStockReceptionForm(variant = {}) {
      this.selectedVariant = variant
      this.stockFormVisible = true;
    },

    closeStockForm() {
      this.stockFormVisible = false;
    },

    saveReceivedStock() {

      this.depotStockInstance.depot_id = this.depot.id;
      this.depotStockInstance.product_variant_id = this.selectedVariant.id;
      console.log(JSON.stringify(this.depotStockInstance));
      let endpoint = '/products/inventory/stock/receive';

      axios.post(endpoint, this.depotStockInstance)
        .then((response) => {
          this.stockFormVisible = false;
          this.depotStockInstance = {};
          this.fetchVariantStock();
        }).catch((error) => {
        let message = "Something went wrong";
        if (error.response) {
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

    /** Breakdown **/
    fetchVariantStockBreakdown() {
      console.log("Fetching variants stock breakdown..");
      let endpoint = 'products/inventory/stock/variant/breakdown?variant_id=' + this.selectedVariant.id ;
      axios.get(endpoint)
        .then((response) => {
          this.variantDepotBatches = response.data.success ? response.data.payload.depot_products : [];
        }).catch((error) => {
        console.log(error)
      })
    },

    showStockBatchBreakdown(variant = {}) {
      this.selectedVariant = variant
      this.variantBatchesVisible = true;
      this.fetchVariantStockBreakdown();
    },

    closeStockBatchBreakdown() {
      this.variantBatchesVisible = false;
    },

    /** Resources **/

  },

  mounted() {
    this.fetchVariantStock();
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
</style>

