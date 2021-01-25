<template>
  <div id="page-user-view">


   <vs-card>
     <!-- Batches breakdown -->
     <div  class="px-6 py-6" >
       <!-- Heading -->
       <div class="flex flex-wrap items-center mb-6">
         <div class="flex-grow">
           <div class="flex flex-wrap ">
             <h2 class="font-bold"
                 style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
               {{  staff.staff_name }} &nbsp; <span style="font-weight: lighter;"> Stock </span>
             </h2>

             <vs-button icon="refresh" class="py-0 ml-4" type="flat" @click="fetchTruckedStock()">Refresh</vs-button>
           </div>
         </div>


       </div>
       <!-- [end] Heading -->

       <!-- Variant List -->
       <vs-table stripe :data="truckedStock">

         <template slot="thead">
           <vs-th>Product </vs-th>
           <vs-th>Reception Date</vs-th>
           <vs-th>Received QTY</vs-th>
           <vs-th>Remaining QTY</vs-th>
           <vs-th>Remaining</vs-th>
           <vs-th></vs-th>
         </template>

         <template slot-scope="{data}">
           <vs-tr :key="rowIndex" v-for="(item, rowIndex) in data">

             <vs-td  >
               {{ data[rowIndex].product? data[rowIndex].product.product_name : " " }}
               ({{ data[rowIndex].variant? data[rowIndex].variant.variant_name : " " }})
             </vs-td>
             <vs-td  > {{ data[rowIndex].created_at }}</vs-td>
             <vs-td > {{ data[rowIndex].received_quantity }}</vs-td>
             <vs-td > {{ data[rowIndex].remaining_quantity }}</vs-td>

             <vs-td>
               <vs-progress :height="12" :percent="(data[rowIndex].remaining_quantity/((data[rowIndex].received_quantity)))*100"
                            :color="(item.remaining_quantity/item.received_quantity) > 0.3? `success`:`danger`">
               </vs-progress>
             </vs-td>

           </vs-tr>
         </template>
       </vs-table>
       <!-- [End] Variant List -->
     </div>
     <!-- [end] Batches breakdown -->

   </vs-card>

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
    staff: Object
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
      truckedStock: []

    }
  },
  watch: {
    staff: function (newVal) {
      this.fetchTruckedStock();
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

    fetchTruckedStock() {
      console.log("Fetching trucked stock..");
      let endpoint = '/products/inventory/stock/mobile/staff?staff_id=' + this.staff.id;
      axios.get(endpoint)
        .then((response) => {
          this.truckedStock = response.data.payload.trucked_stock.data ;
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
          this.fetchTruckedStock();
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
    fetchTruckedStockBreakdown() {
      console.log("Fetching variants stock breakdown..");
      let endpoint = 'products/inventory/stock/variant/breakdown?variant_id=' + this.selectedVariant.id ;
      axios.get(endpoint)
        .then((response) => {
          this.truckedStock = response.data.success ? response.data.payload.depot_products : [];
        }).catch((error) => {
        console.log(error)
      })
    },

    showStockBatchBreakdown(variant = {}) {
      this.selectedVariant = variant
      this.variantBatchesVisible = true;
      this.fetchTruckedStockBreakdown();
    },

    closeStockBatchBreakdown() {
      this.variantBatchesVisible = false;
    },

    /** Resources **/

  },

  created() {
   },
  mounted() {
    if(this.staff!=null){
      this.fetchTruckedStock();
    }else{
      console.log("No staff passed, returning");
      this.$router.go(-1);
    }

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

