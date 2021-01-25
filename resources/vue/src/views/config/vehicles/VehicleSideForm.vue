
<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>Vehicle Information</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">


        <!-- Vehicle Type -->
        <span>Vehicle Type</span>
        <v-select v-model="vehicleInstance.vehicle_type" class=" mb-5" :clearable="false"
                  :options="vehicleTypes"  />

        <!-- Vehicle Make -->
        <vs-input label="Vehicle Make" v-model="vehicleInstance.make" class="mb-5 w-full" name="make" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('make')">{{ errors.first('make') }}</span>

        <!-- Vehicle Model -->
        <vs-input label="Vehicle Model" v-model="vehicleInstance.model" class="mb-5 w-full" name="model" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('model')">{{ errors.first('model') }}</span>

        <!-- Licence Number -->
        <vs-input label="Licence Plate Number" v-model="vehicleInstance.licence_plate_number" class="mb-5 w-full" name="licence_plate_number" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('licence_plate_number')">{{ errors.first('licence_plate_number') }}</span>


        <span>Default Depot</span>
        <v-select v-model="selectedDepot" class=" mb-5" :clearable="false"
                  :options="availableDepots" label="depot_name" />

        <span>Assigned Staff</span>
        <v-select v-model="assignedStaff" class=" mb-5" :clearable="false"
                  :options="availableStaff" label="staff_name" />

        <span>Vehicle Status</span>
        <v-select v-model="vehicleInstance.vehicle_status" class=" mb-5" :clearable="false"
                  :options="statusOptions"  />

      </div>
    </component>

    <!--Bottom Actions -->
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="saveDepot()" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>

  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import axios from "@/axios";
import vSelect from 'vue-select'

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },

  components: {
    VuePerfectScrollbar,
    vSelect
  },

  data () {
    return {

      vehicleInstance: {
        assigned_staff_id: '',
        default_depot_id: null,
        driver_id: '',

        vehicle_type: '',
        make: '',
        model: '',
        licence_plate_number: '',
        vehicle_status: 'Active',
      },

      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },

      /***Resources **/
      availableDepots: [],
      selectedDepot: { id: null, depot_name: "Select Depot"},
      vehicleTypes: [ "Truck", "Van", "Motor Bike", "TriCycle" ],
      statusOptions: [ "Active", "Out Of Service" ],

      availableStaff: [],
      assignedStaff: { id: null, staff_name: "Select Staff"},

    }
  },
  watch: {

    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        //this.initValues()
        this.$validator.reset()
      } else {
         this.vehicleInstance = this.data ;

        let depotArray = this.availableDepots.filter(x => x.id ==  this.vehicleInstance.default_depot_id);
        if(depotArray.length>0){
          this.selectedDepot = depotArray[0];
        }

        let staffArray = this.availableStaff.filter(x => x.id == this.vehicleInstance.assigned_staff_id);
        if(depotArray.length>0){
          this.assignedStaff = staffArray[0];
        }

       }
     }

  },
  computed: {

    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },

    isFormValid () {
      return !this.errors.any()
    },

    scrollbarTag () { return this.$store.getters.scrollbarTag },


  },

  methods: {

    saveDepot(){

      console.log(JSON.stringify(this.vehicleInstance));
      this.vehicleInstance.default_depot_id = this.selectedDepot.id;
      this.vehicleInstance.assigned_staff_id = this.assignedStaff.id;

      axios.post('/config/assets/vehicle/add', this.vehicleInstance)
        .then((response) => {
          this.$vs.notify({ title: 'Success',  text: 'Vehicle Added', color: 'success'})
          this.vehicleInstance = {};
          this.$emit('closeSidebar')
        }).catch((error) => {
        console.log(error)
      })
    },

    /** Resources **/
    fetchDepots() {
      console.info("fetching depots..");
      console.info(JSON.stringify(this.selectedDepot));

      axios.get('/resources/assets/depots')
        .then((response) => {
          this.availableDepots = response.data.payload.depots.data;
        }).catch((error) => {
        console.log(error)
      })
    },

    fetchStaff() {
      console.info("fetching staff..");
      console.info(JSON.stringify(this.selectedDepot));
      axios.post('/resources/staff/get')
        .then((response) => {
          this.availableStaff = response.data.payload.staff;
         }).catch((error) => {
        console.log(error)
      })
    },

  },

  created() {
    this.fetchDepots();
    this.fetchStaff();
  }

}
</script>

<style lang="scss" scoped>
.location-item{
  border: 1px solid #e5e5e5;
  background-color: #dbf4fc;
}

.selected-address{
  border: 1px solid #2a9d8f;
  background-color: #eaf5f4;
   color: #2a9d8f;
}

div.location-item:hover{
  background-color: #b7e9f9;
  cursor: pointer;
}

.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
}

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}
.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
