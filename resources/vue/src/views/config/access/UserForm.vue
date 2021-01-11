<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
========================================================================================== -->

<template>
  <div id="page-user-view">

    <div   class="md:px-6"  >

      <!-- Content Row -->
      <div class="vx-row">
        <div class="vx-col md:w-1/3 w-1/4">
          <vs-input class="w-full mt-4" label="Staff Name" v-model="staff.staff_name" v-validate="'required'" name="staff_name"  />
          <span class="text-danger text-sm"  v-show="errors.has('staff_name')">{{ errors.first('staff_name') }}</span>

          <vs-input class="w-full mt-4" label="Email" v-model="staff.email" v-validate="'required|email'" name="email" />
          <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

          <vs-input class="w-full mt-4" label="Phone" v-model="staff.phone_number" type="phone_number" v-validate="'required'" name="phone_number" />
          <span class="text-danger text-sm"  v-show="errors.has('phone_number')">{{ errors.first('phone_number') }}</span>
        </div>

        <div class="vx-col md:w-1/3 w-1/4">

          <div class="mt-4">
            <label class="vs-input--label">Role</label>
            <v-select v-model="staff.role_name" :clearable="false" :options="rolesAvailable" v-validate="'required'" name="role_name" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('role_name')">{{ errors.first('role_name') }}</span>
          </div>

          <div class="mt-4 mb-5">
            <label class="vs-input--label">Status</label>
            <v-select v-model="staff.status" :clearable="false" :options="staffStatus" v-validate="'required'" name="status" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <span class="text-danger text-sm"  v-show="errors.has('status')">{{ errors.first('status') }}</span>
          </div>

          <span></span>
          <label class="vs-input--label">Default Depot</label>
          <v-select v-model="selectedDepot" class=" mb-5" :clearable="false"
                    :options="availableDepots" label="depot_name" />



        </div>
      </div>

      <div class="vx-row mt-12">
        <div class="vx-col w-full">
          <div class="flex items-start flex-col sm:flex-row">
             <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
            <div>
               <vs-button ref="saveButton" @click="saveUser()" color="success" class="mr-4 mb-4">Save User</vs-button>
             </div>
          </div>
        </div>
      </div>

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
    userId: [String, Number]
  },
  data () {
    return {
      user_data: null,
      user_not_found: false,
      staff: {
        "id": '',
        "user_id": '',
        "default_depot_id": '',
        "staff_name": '',
        "phone_number": '',
        "email": '',
        "created_at": '',
        'role_name' : '',
        'status' : 'Active',
      },

      rolesAvailable: [],
      staffStatus: [ 'Active', 'Suspended' ],

      availableDepots: [],
      selectedDepot: { id: null, depot_name: "Select Depot"}

    }
  },
  computed: {
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {

    fetchUserDetails() {
      axios.post('/resources/staff/details',{
        id : this.userId
      }).then((response) => {
          this.staff = response.data.payload.staff;
          this.selectedDepot = response.data.payload.staff.depot;
         }).catch((error) => {
        console.log(error)
      })
    },

    saveUser(){
      this.$vs.loading();

      let endpoint = '/config/staff/user/add';
      if(Number.isInteger(this.staff.id)){
          endpoint = '/config/staff/user/update';console.log("Updating...")
      }

      this.staff.default_depot_id = this.selectedDepot.id;
      console.log(JSON.stringify(this.staff));


      axios.post( endpoint, this.staff).then((response) => {
        this.$vs.loading.close();
        this.closeUserForm();

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

    /** Resources **/
    fetchAvailableRoles() {
      axios.get('/resources/staff/roles/all').then((response) => {
          this.rolesAvailable = response.data.payload.roles;
       }).catch((error) => {
        console.log(error)
      })
    },

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

    closeUserForm() {
      this.$store.commit('general/TOGGLE_USER_FORM', false)
    }

  },
  created () {
    console.log("UserForm userId:"+this.userId)
    if(this.userId){
      this.fetchUserDetails();
    }

    this.fetchAvailableRoles();
    this.fetchDepots();
   }
}

</script>

