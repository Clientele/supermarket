<!-- =========================================================================================
    File Name: TableStriped.vue
    Description: Rendering default table with striped style
========================================================================================== -->


<template>
  <vx-card >

    <!-- Filter -->
    <div class="flex flex-wrap items-center mb-6">
      <div class="flex-grow">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
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
      </div>

      <vs-button icon="add" type="border" @click="showRegionForm()">Add Region</vs-button>
    </div>
    <!-- [end] Filter -->

    <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">
      <h4 class="mb-4">Regions</h4>
      <vs-table stripe :data="regions">

        <template slot="thead">
          <vs-th>Region Name</vs-th>
          <vs-th>Added</vs-th>
          <vs-th>Action</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].region_name">
              {{data[indextr].region_name}}
            </vs-td>
            <vs-td :data="data[indextr].created_at">
              {{data[indextr].created_at}}
            </vs-td>
            <vs-td :data="data[indextr].id">
              <vs-button type="border" color="secondary" class="mr-4" size="small" @click="viewDistricts(data[indextr].id)">Open</vs-button>
              <vs-button type="border"  class="mr-4" size="small" @click="viewDistricts(data[indextr].id)">Edit</vs-button>
              <vs-button  type="border" color="danger" class="mr-4" size="small" @click="viewDistricts(data[indextr].id)">Remove</vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

    </div>


    <!-- Districts -->
    <vs-popup @close="closeDistricts()" fullscreen title="Districts" :active.sync="districtsVisible">
      <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">
        <h4 class="mb-4">Districts</h4>
        <vs-table stripe :data="districts">

          <template slot="thead">
            <vs-th>District Name</vs-th>
            <vs-th>Added</vs-th>
            <vs-th>Action</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].region_name">
                {{data[indextr].region_name}}
              </vs-td>
              <vs-td :data="data[indextr].created_at">
                {{data[indextr].created_at}}
              </vs-td>
              <vs-td :data="data[indextr].id">
                <vs-button type="border" color="secondary" class="mr-4" size="small" @click="viewPlaces(data[indextr].id)">Open</vs-button>
                <vs-button type="border"  class="mr-4" size="small" @click="viewPlaces(data[indextr].id)">Edit</vs-button>
                <vs-button  type="border" color="danger" class="mr-4" size="small" @click="viewPlaces(data[indextr].id)">Remove</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vs-popup>
    <!-- [end] Districts -->


    <!-- Places -->
    <vs-popup @close="closePlaces()" fullscreen title="Places" :active.sync="placesVisible">
      <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">
        <h4 class="mb-4">Places</h4>
        <vs-table stripe :data="places">

          <template slot="thead">
            <vs-th>Place Name</vs-th>
            <vs-th>Added</vs-th>
            <vs-th>Action</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].region_name">
                {{data[indextr].region_name}}
              </vs-td>
              <vs-td :data="data[indextr].created_at">
                {{data[indextr].created_at}}
              </vs-td>
              <vs-td :data="data[indextr].id">
                <vs-button type="border" color="secondary" class="mr-4" size="small" @click="viewRegionDistricts(data[indextr].id)">Open</vs-button>
                <vs-button type="border"  class="mr-4" size="small" @click="editRegion(data[indextr].id)">Edit</vs-button>
                <vs-button  type="border" color="danger" class="mr-4" size="small" @click="removeRegion(data[indextr].id)">Remove</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vs-popup>
    <!-- [End] Places -->

  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      regions: [
        {
          'id': 1,
          'region_name': 'Manyara',
          'created_at': 'Bret'
        },
      {
          'id': 1,
          'region_name': 'Kahama',
          'created_at': 'Bret'
        },
      {
          'id': 1,
          'region_name': 'Rukwa',
          'created_at': 'Bret'
        },


      ],
      regionInstance: {},

      districtsVisible: false,
      districtInstance : {},
      districts : [
        {
          'id': 1,
          'region_name': 'Kinondoni',
          'created_at': 'june 4, 2020'
        }
      ],

      placesVisible: false,
      placeInstance: {},
      places : [
        {
          'id': 1,
          'region_name': 'Oysterbay',
          'created_at': 'june 4, 2020'
        }
      ],

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
    fetchRegions(){

    },
    showRegionForm(){
      this.regionsVisible = true;
    },
    closeRegions(){
      this.regionsVisible = false;
    },


    /*** District **/
    viewDistricts(){
      console.log("showing district")
      this.districtsVisible = true;
    },
    closeDistricts(){
      this.districtsVisible = false;
    },

    /*** Places **/
    viewPlaces(){
      console.log("showing place")
      this.districtsVisible = false;
      this.placesVisible = true;
    },
    closePlaces(){
      this.districtsVisible = true;
      this.placesVisible = false;
    }



  }
}
</script>
