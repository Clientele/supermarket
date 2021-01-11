<!-- =========================================================================================
    File Name: TableStriped.vue
    Description: Rendering default table with striped style
========================================================================================== -->


<template>
  <vx-card >

    <!--Regions Filter -->
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


              <vs-dropdown-item v-for="(country, index) in  countries" :key="index" @click="fetchRegions(country)">
                <span>{{ country.name  }}</span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>
          <!--refresh button -->
          <vs-button class="py-0" type="flat" @click="fetchRegions()">Refresh</vs-button>
        </div>

      </div>

      <vs-button icon="add"  @click="showRegionForm()">Add Region</vs-button>
    </div>
    <!-- [end] Regions Filter -->

    <!-- Regions -->
    <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">
      <h4 class="mb-4">Regions</h4>
      <vs-table stripe :data="regions">

        <template slot="thead">
          <vs-th>Region Name</vs-th>
          <vs-th>Added</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="rowIndex" v-for="(tr, rowIndex) in data">
            <vs-td :data="data[rowIndex].region_name">
              {{data[rowIndex].region_name}}
            </vs-td>
            <vs-td :data="data[rowIndex].created_at">
              {{data[rowIndex].created_at}}
            </vs-td>
            <vs-td :data="data[rowIndex].id">
              <vs-button type="border" color="secondary" class="mr-4" size="small" @click="viewDistricts(data[rowIndex])">Open</vs-button>
              <vs-button type="border"  class="mr-4" size="small" @click="showRegionForm(data[rowIndex])">Edit</vs-button>
              <vs-button  type="border" color="danger" class="mr-4" size="small" @click="confirmRegionRemoval(data[rowIndex])">Remove</vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

      <!-- Region Form -->
      <vs-prompt :title="`Region Name`" :accept-text="`Save`" :cancel-text="`Cancel`"
                 @cancel="regionInstance={}" color="secondary"
                 @accept="saveRegion()"
                 :active.sync="regionFormDialog">
        <div  >
          <vs-input placeholder="Region Name"  v-model="regionInstance.region_name" class="mt-3 w-full"/>
        </div>
      </vs-prompt>
      <!-- [end] Region Form -->
    <!--[end]  Regions -->



    <!-- Districts -->
    <vs-popup @close="closeDistricts()" fullscreen title="Districts" :active.sync="districtsVisible">
      <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">

        <div class="flex flex-wrap mb-4">
          <h4 class="mb-4 mr-6 mt-2"> {{ regionInstance.region_name }} Districts</h4>
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
            <vs-tr :key="rowIndex" v-for="(region, rowIndex) in data">
              <vs-td :data="data[rowIndex].district_name">
                {{data[rowIndex].district_name}}
              </vs-td>
              <vs-td :data="data[rowIndex].created_at">
                {{data[rowIndex].created_at}}
              </vs-td>
              <vs-td :data="data[rowIndex].id">
                <vs-button type="border" color="secondary" class="mr-4" size="small" @click="viewPlaces(data[rowIndex])">Open</vs-button>
                <vs-button type="border"  class="mr-4" size="small" @click="showDistrictForm(data[rowIndex])">Edit</vs-button>
                <vs-button  type="border" color="danger" class="mr-4" size="small" @click="confirmDistrictRemoval(data[rowIndex])">Remove</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vs-popup>

      <!-- District Form -->
      <vs-prompt :title="`District`" :accept-text="`Save`" :cancel-text="`Cancel`"
                 @cancel="districtInstance={}" color="secondary"
                 @accept="saveDistrict()"
                 :active.sync="districtsFormVisible">
        <div  >
          <vs-input placeholder="District Name"  v-model="districtInstance.district_name" class="mt-3 w-full"/>
        </div>
      </vs-prompt>
      <!-- [end] District Form -->
    <!-- [end] Districts -->


    <!-- Places -->
    <vs-popup @close="closePlaces()" fullscreen title="Places" :active.sync="placesVisible">
      <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">
         <div class="flex flex-wrap mb-4">
          <h4 class="mb-4 mr-6 mt-2"> {{ districtInstance.district_name }} Places</h4>
          <div class="flex-grow">
            <vs-button icon="add"  @click="showPlaceForm()">Add Place</vs-button>
          </div>
        </div>
        <vs-table stripe :data="places">

          <template slot="thead">
            <vs-th>Place Name</vs-th>
            <vs-th>Added</vs-th>
            <vs-th>Action</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="rowIndex" v-for="(tr, rowIndex) in data">
              <vs-td :data="data[rowIndex].region_name">
                {{data[rowIndex].place_name}}
              </vs-td>
              <vs-td :data="data[rowIndex].created_at">
                {{data[rowIndex].created_at}}
              </vs-td>
              <vs-td :data="data[rowIndex].id">
                 <vs-button type="border"  class="mr-4" size="small" @click="showPlaceForm(data[rowIndex])">Edit</vs-button>
                <vs-button  type="border" color="danger" class="mr-4" size="small" @click="confirmPlaceRemoval(data[rowIndex])">Remove</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vs-popup>

      <!-- Place Form -->
      <vs-prompt :title="`Place`" :accept-text="`Save`" :cancel-text="`Cancel`"
                 @cancel="placeInstance={}" color="secondary"
                 @accept="savePlace()"
                 :active.sync="placesFormVisible">
        <div>
          <vs-input placeholder="Place Name"  v-model="placeInstance.place_name" class="mt-3 w-full"/>
        </div>
      </vs-prompt>
      <!-- [end] Place Form -->
    <!-- [End] Places -->

  </vx-card>
</template>

<script>
import axios from "@/axios";

export default {
  data () {
    return {
      regions: [],
      regionInstance: { id: null,  region_name : null, country_id : 1 },
      regionFormDialog: false,

      districtsVisible: false,
      districtsFormVisible: false,
      districtInstance : {id: null,  district_name : null, region_id : null},
      districts : [
        {
          'id': 1,
          'region_name': 'Kinondoni',
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
      ]

    }
  },
  methods: {

    /*** Regions **/
    fetchRegions() {
      axios.get('/resources/addresses/regions?country_id=1').then((response) => {
        this.regions = response.data.payload.regions;
      }).catch((error) => {
        console.log(error)
      })
    },

    showRegionForm(region){
     // this.$store.commit('general/TOGGLE_GENERAL_NOTIFICATION', true)
      this.regionInstance = region? region : {};
      this.regionFormDialog = true;
    },

    saveRegion(){
      axios.post('/config/addresses/region/add', this.regionInstance)
        .then((response) => {
          this.regionFormDialog = false;
          this.fetchRegions();
        }).catch((error) => {
        console.log(error)
        })
    },

    confirmRegionRemoval(region){
      this.regionInstance = region;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove '+this.regionInstance.region_name,
        accept: this.removeRegion
      })
    },

    removeRegion(){
      axios.post('/config/addresses/region/remove', {
        id: this.regionInstance.id
      })
        .then((response) => {
          this.fetchRegions();
        }).catch((error) => {
        console.log(error)
        })
    },


    /*** District **/
    showDistrictForm(districtToEdit){
      this.districtInstance = districtToEdit ? districtToEdit : {};
      this.districtsFormVisible = true;
      this.districtsVisible = false;
    },

    viewDistricts(region){
      if(region){
        this.regionInstance = region;
      }
      this.districtsVisible = true;
      let endpoint ='/resources/addresses/districts?region_id='+this.regionInstance.id;
      console.log(endpoint)
      axios.get(endpoint)
        .then((response) => {
        this.districts = response.data.payload.districts;
      }).catch((error) => {
        console.log(error)
      })
    },

    saveDistrict(){
      this.districtInstance.region_id = this.regionInstance.id;
      axios.post('/config/addresses/district/add', this.districtInstance)
        .then((response) => {
          this.districtsFormVisible = false;
          this.districtInstance = {};
          this.viewDistricts();
         }).catch((error) => {
        console.log(error)
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
      axios.post('/config/addresses/district/remove', {
        id: this.districtInstance.id
      })
        .then((response) => {
          this.viewDistricts();
        }).catch((error) => {
        console.log(error)
      })
    },

    closeDistricts(){
      this.districtsVisible = false;
      this.regionInstance = {};
    },



    /*** Places **/
    showPlaceForm(placeToEdit){
      this.placeInstance = placeToEdit ? placeToEdit : {};
      this.placesFormVisible = true;
      this.placesVisible = false;
    },

    savePlace(){
      this.placeInstance.district_id = this.districtInstance.id;
      axios.post('/config/addresses/place/add', this.placeInstance)
        .then((response) => {
          this.placesFormVisible = false;
          this.placeInstance = {};
          this.viewPlaces();
        }).catch((error) => {
        console.log(error)
      })
    },

    viewPlaces(district){
      if(district){
        this.districtInstance = district;
      }
      this.districtsVisible = false;
      this.placesVisible = true;
       axios.get('/resources/addresses/places?district_id='+this.districtInstance.id)
        .then((response) => {
          this.places = response.data.payload.places;
        }).catch((error) => {
        console.log(error)
      })
    },

    confirmPlaceRemoval(place){
      this.placeInstance = place;
      this.placesVisible = false;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove '+this.placeInstance.place_name,
        accept: this.removePlace
      })
    },

    removePlace(){
      axios.post('/config/addresses/place/remove', {
        id: this.placeInstance.id
      })
        .then((response) => {
          this.viewPlaces();
        }).catch((error) => {
        console.log(error)
      })
    },

    closePlaces(){
      this.districtsVisible = true;
      this.placesVisible = false;
    },


    /*** Search**/
    searchLocation(){

    }


  },
  created() {
    this.fetchRegions();
  }
}
</script>
