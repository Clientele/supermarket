<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>Depot Information</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- DEPOT NAME -->
        <vs-input label="Depot Name" v-model="depotInstance.depot_name" class="mt-5 w-full" name="name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-name')">{{ errors.first('name') }}</span>


        <vs-input v-if="!selectedAddress" label="Location" v-model="locationQuery" class="mt-5 w-full" name="location" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('location')">{{ errors.first('item-name') }}</span>


        <!-- Address result -->
        <div v-for="(address,index) in addresses" :key="index"
             @click="pickAddress(address)" class="location-item px-2 py-2 rounded mt-4">
          <ul>
            <li>{{  address.location_name }} </li>
          </ul>
        </div>

        <!-- selected address -->
        <div class="mt-4" v-if="selectedAddress">
          <span class=" text-sm" >Depot Location</span>
        </div>
        <div class="selected-address px-2 py-2 rounded mt-4" v-if="selectedAddress">
          <div class="flex flex-wrap items-center">
            <div class="flex-grow">
              {{  selectedAddress.location_name }}
            </div>
            <vs-button @click="removeAddress()" color="danger" type="flat" icon-pack="feather" icon="icon-x"></vs-button>
          </div>
        </div>

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="saveDepot()" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>


  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import axios from "@/axios";

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
    VuePerfectScrollbar
  },
  data () {
    return {
      /*** Location **/
      locationQuery: '',
      locationSearchDialog: false,
      searchTerm: '',
      addressesRawResults: [],
      selectedAddress: null,
      /*** [end] Location **/

      depotInstance: {
        depot_name: '',

        country_id: '',
        zone_id: '',
        region_id: '',
        district_id: '',
        place_id: ''
      },

      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        //this.initValues()
        this.$validator.reset()
      } else {
         this.depotInstance = this.data ;
         this.selectedAddress = {};
         this.selectedAddress.location_name =  this.data.location_name;
         this.selectedAddress.country_id =  this.data.country_id;
         this.selectedAddress.zone_id =  this.data.zone_id;
         this.selectedAddress.region_id =  this.data.region_id;
         this.selectedAddress.district_id =  this.data.district_id;
         this.selectedAddress.place_id =  this.data.place_id;
      }
     },
    locationQuery(query){
      this.searchLocations();
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

    addresses(){
     return this.addressesRawResults.map(function (resultItem) {

       let location = {};


       if(resultItem.type==="places"){
         location.location_name = resultItem.searchable.place_name
         location.place_id = resultItem.searchable.id
       }
       if(resultItem.type==="districts"){
         location.location_name = resultItem.searchable.district_name
         location.district_id = resultItem.searchable.id
       }
       if(resultItem.type==="regions"){
         location.location_name = resultItem.searchable.region_name
         location.region_id = resultItem.searchable.id
       }


       if(resultItem.searchable.place){
         location.location_name = location.location_name+ " "+ resultItem.searchable.district.district_name;
         location.place_id = resultItem.searchable.id;
       }

       if(resultItem.searchable.district){
         location.location_name = location.location_name+ " "+ resultItem.searchable.district.district_name;
         location.district_id = resultItem.searchable.district.id;
       }

       if(resultItem.searchable.region){
         location.location_name = location.location_name+ " "+ resultItem.searchable.region.region_name;
         location.region_id = resultItem.searchable.region.id;
       }

       if(resultItem.searchable.country){
         location.location_name = location.location_name+ " "+ resultItem.searchable.region.region_name;
         location.country_id = resultItem.searchable.country.id;
       }

       return location;

     })
    }
  },

  methods: {

    /*** Addresses **/
    pickAddress(address){
      this.addressesRawResults = [];
      this.selectedAddress = address;
    },

    removeAddress(){
      this.selectedAddress = null;
    },
    /*** [end] Addresses **/

    saveDepot(){
      if(this.selectedAddress==null){
        this.$vs.notify({ title: 'Alert',  text: 'Select Address', color: 'danger'})
        return ;
      }

      this.depotInstance.country_id =  this.selectedAddress.country_id;
      this.depotInstance.region_id =  this.selectedAddress.region_id;
      this.depotInstance.district_id =  this.selectedAddress.district_id;
      this.depotInstance.place_id =  this.selectedAddress.place_id;

      axios.post('/config/assets/depot/add', this.depotInstance)
        .then((response) => {
          this.$vs.notify({ title: 'Success',  text: 'Depot Added', color: 'success'})
          this.depotInstance = {};
          this.selectedAddress = null;
          this.$emit('closeSidebar')
        }).catch((error) => {
        console.log(error)
      })
    },

    searchLocations(){
      this.addressesRawResults = [];

      if(!(this.locationQuery)){
        return ;
      }

      axios.post('/resources/addresses/find',{
        query : this.locationQuery
      }).then((response) => {

        if(response.data.success){
          this.addressesRawResults = response.data.payload.addresses;
        }
       }).catch((error) => {
        console.log(error)
      })
    }

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
