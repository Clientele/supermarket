

<template>
 <div>
   <div class="flex flex-wrap-reverse items-center data-list-btn-container mb-6">

     <vs-icon class="mr-2" icon="home_work" size="large" color="primary"></vs-icon>
     <h1 class="mr-6">
       Sales Zones
     </h1>

     <!-- Add Sales Zone -->
     <vs-button icon="add" id="depotLoading"  @click="showZoneForm()"
                class="mr-4 vs-con-loading__container">Add Zone</vs-button>
   </div>

   <vx-card >


     <!-- Regions -->
     <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">
        <vs-table stripe :data="zones">

         <template slot="thead">
           <vs-th>Region Name</vs-th>
           <vs-th>Added</vs-th>
           <vs-th>Action</vs-th>
         </template>

         <template slot-scope="{data}">
           <vs-tr :key="rowIndex" v-for="(tr, rowIndex) in data">
             <vs-td :data="data[rowIndex].zone_name">
               {{data[rowIndex].zone_name}}
             </vs-td>
             <vs-td :data="data[rowIndex].created_at">
               {{data[rowIndex].created_at}}
             </vs-td>
             <vs-td :data="data[rowIndex].id">
               <vs-button type="border" color="secondary" class="mr-4" size="small" @click="showZoneDistricts(data[rowIndex])">Open</vs-button>
               <vs-button type="border"  class="mr-4" size="small" @click="showZoneForm(data[rowIndex])">Edit</vs-button>
               <vs-button  type="border" color="danger" class="mr-4" size="small" @click="confirmZoneRemoval(data[rowIndex])">Remove</vs-button>
             </vs-td>
           </vs-tr>
         </template>
       </vs-table>
     </div>

     <!-- Region Form -->
     <vs-prompt :title="`Zone Name`" :accept-text="`Save`" :cancel-text="`Cancel`"
                @cancel="zoneInstance={}" color="secondary"
                @accept="saveSalesZone()"
                :active.sync="zoneFormDialog">
       <div  >
         <vs-input placeholder="Region Name"  v-model="zoneInstance.zone_name" class="mt-3 w-full"/>
       </div>
     </vs-prompt>
     <!-- [end] Region Form -->
     <!--[end]  Regions -->



     <!-- Districts -->
     <vs-popup @close="closeDistricts()" fullscreen title="Districts" :active.sync="districtsVisible">
       <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">

         <div class="flex flex-wrap mb-4">
           <h4 class="mb-4 mr-6 mt-2"> {{ zoneInstance.zone_name }} Districts</h4>
           <div class="flex-grow">
             <vs-button icon="add"  @click="showDistrictForm()">Add District</vs-button>
           </div>
         </div>

         <vs-table stripe :data="districts">

           <template slot="thead">
             <vs-th>District Name</vs-th>
             <vs-th>Added</vs-th>
             <vs-th>Action</vs-th>
           </template>

           <template slot-scope="{data}">
             <vs-tr :key="rowIndex" v-for="(zone, rowIndex) in data">
               <vs-td :data="data[rowIndex].district_name">
                 {{data[rowIndex].district_name}}
               </vs-td>
               <vs-td :data="data[rowIndex].created_at">
                 {{data[rowIndex].created_at}}
               </vs-td>
               <vs-td :data="data[rowIndex].id">
                 <vs-button  type="border" color="danger" class="mr-4" size="small" @click="confirmDistrictRemoval(data[rowIndex])">Remove</vs-button>
               </vs-td>
             </vs-tr>
           </template>
         </vs-table>
       </div>
     </vs-popup>

     <!-- District Form -->
     <vs-popup  title="Select Districts"
                 color="secondary" @accept="updateZone()" @close="closeRegionsForm()"
                fullscreen  :active.sync="districtsFormVisible">
       <div>

         <div class="vx-row">

           <div v-for="(district, index) in allDistricts"
                class="vx-col md:w-1/4 w-1/6 px-6 py-6" :key="index">
             <vs-checkbox v-model="selectedDistricts" :vs-value="district.id">{{ district.district_name }}</vs-checkbox>
           </div>


         </div>

         <div class="vx-row px-6">
           <vs-button color="secondary" @click="updateZone">Update Zone</vs-button>
         </div>


         </div>
     </vs-popup>
     <!-- [end] District Form -->

   </vx-card>
 </div>
</template>

<script>
import axios from "@/axios";
import {handle} from "@/http/handler";

export default {
  data () {
    return {
      zones: [],
      zoneInstance: { id: null,  zone_name : null, country_id : 1 },
      zoneFormDialog: false,

      districtsVisible: false,
      districtsFormVisible: false,
      districtInstance : {id: null,  district_name : null, zone_id : null},
      districts : [],
      selectedDistricts: [],


      allDistricts: [],
      countries: [
        { "name": "Tanzania" },
        { "name": "Kenya" },
        { "name": "Uganda" },
        { "name": "Rwanda" },
        { "name": "Burundi" },
        { "name": "Congo" }
      ]

    }
  },
  methods: {

    /*** Regions **/
    fetchZones() {
      axios.get('/resources/addresses/zones').then((response) => {
        this.zones = response.data.payload.zones;
      }).catch((error) => {
        console.log(error)
      })
    },

    showZoneForm(zone){
     // this.$store.commit('general/TOGGLE_GENERAL_NOTIFICATION', true)
      this.zoneInstance = zone? zone : {};
      this.zoneFormDialog = true;
    },

    saveSalesZone(){
      axios.post('/config/addresses/zone/add', this.zoneInstance)
        .then((response) => {
          this.zoneFormDialog = false;
          this.fetchZones();
          this.happilyNotify("Zone Added")
        }).catch((error) => {
        console.log(error);
        this.handleApiError(error);
        })
    },

    confirmZoneRemoval(zone){
      this.zoneInstance = zone;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove '+this.zoneInstance.zone_name,
        accept: this.removeZone
      })
    },

    removeZone(){
      axios.post('/config/addresses/zone/remove', {
        id: this.zoneInstance.id
      })
        .then((response) => {
          this.fetchZones();
        }).catch((error) => {
        console.log(error)
        })
    },


    /*** District **/
    showZoneDistricts(zone){
      if(zone){
        this.zoneInstance = zone;
      }
      this.districtsVisible = true;
      let endpoint ='/resources/addresses/zone/districts?zone_id='+this.zoneInstance.id;
      console.log(endpoint)
      axios.get(endpoint)
        .then((response) => {
        this.districts = response.data.payload.districts;
      }).catch((error) => {
        console.log(error)
      })
    },

    showDistrictForm(){
      this.selectedDistricts = this.districts.map(function (district) { return district.id; });
      this.districtsFormVisible = true;
      this.districtsVisible = false;
    },

    updateZone(){
      axios.post('/config/addresses/zone/update', {
        zone_id: this.zoneInstance.id,
        district_ids : this.selectedDistricts
      })
        .then((response) => {
           this.districtsFormVisible = false;
           this.showZoneDistricts();
           this.happilyNotify("Updated");
          this.selectedDistricts = [];
         }).catch((error) => {
        console.log(error);
        this.handleApiError(error)
      })
    },

    confirmDistrictRemoval(district){
      this.districtsVisible  = false;
      this.districtInstance = district;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove '+this.districtInstance.district_name,
        accept: this.removeDistrict
      })
    },

    removeDistrict(){
      axios.post('/config/addresses/zone/district/remove', {
        id: this.districtInstance.id
      })
        .then((response) => {
          this.showZoneDistricts();
        }).catch((error) => {
        console.log(error)
      })
    },

    closeDistricts(){
      this.districtsVisible = false;
      this.zoneInstance = {};
    },



    /** Helpers **/
    handleApiError(error){
      this.$vs.notify({
        title: 'Error',
        text: handle(error),
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })
    },

    happilyNotify(message){
      this.$vs.notify({ title: 'Success',  text: message, color: 'success'})
    },

    fetchDistricts() {
      axios.get('/resources/addresses/districts').then((response) => {
        this.allDistricts = response.data.payload.districts;
      }).catch((error) => {
        console.log(error)
      })
    },


  },
  created() {
    this.fetchZones();
    this.fetchDistricts();
  }
}
</script>
