<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-view">

    <div id="user-data"  >

      <vx-card title="Account" class="mb-base">

         <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img  :src="require('@/assets/ajab/images/user_.png')" class="rounded w-full" />
            </div>
          </div>

          <!-- Primary Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Name</td>
                <td> {{  staff.staff_name }} </td>
              </tr>
              <tr>
                <td class="font-semibold">Phone </td>
                <td>{{  staff.phone_number }} </td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{  staff.email }}</td>
              </tr>
            </table>
          </div>
          <!-- / Primary Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Status</td>
                <td>Active</td>
              </tr>
              <tr>
                <td class="font-semibold">Role</td>
                <td>{{ staff.role_name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Last Seen</td>
                <td>January 7th 2020</td>
              </tr>
            </table>
          </div>

          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button @click="showUserForm()"
              icon-pack="feather" icon="icon-edit" class="mr-4"  >Edit</vs-button>

            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
          </div>

        </div>

      </vx-card>

      <div class="vx-row">
        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Default Depot" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Depot Name</td>
                <td>246bsfgdf</td>
              </tr>
              <tr>
                <td class="font-semibold">Location</td>
                <td>sthsdhgdf</td>
              </tr>
              <tr>
                <td class="font-semibold">Supervisor</td>
                <td>argadgads</td>
              </tr>
            </table>
          </vx-card>
        </div>

        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Assets" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Twitter</td>
                <td>wetdfgdsf</td>
              </tr>
              <tr>
                <td class="font-semibold">Facebook</td>
                <td>dgfhsfghsfg</td>
              </tr>
              <tr>
                <td class="font-semibold">Instagram</td>
                <td>sfgfdbafgd</td>
              </tr>

            </table>
          </vx-card>
        </div>
      </div>

      <!-- Permissions -->
      <vx-card>

        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="flex items-end px-3">
              <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
              <span class="font-medium text-lg leading-none">Permissions</span>
            </div>
            <vs-divider />
          </div>
        </div>

        <div class="block overflow-x-auto">
          <table class="w-full permissions-table">
            <tr>
              <!--
                You can also use `Object.keys(Object.values(data_local.permissions)[0])` this logic if you consider,
                our data structure. You just have to loop over above variable to get table headers.
                Below we made it simple. So, everyone can understand.
               -->
              <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in ['Module', 'Read', 'Write', 'Create', 'Delete']" :key="heading">{{ heading }}</th>
            </tr>


          </table>
        </div>

      </vx-card>


    </div>

    <!-- User form -->
    <vs-popup @close="closeUserForm()"
              fullscreen title="Staff Info" :active.sync="userFormVisible">
      <div >
        <user-form v-bind:userId="userId"></user-form>
      </div>
    </vs-popup>
    <!-- [end] User form -->

  </div>
</template>

<script>

import axios from "@/axios";
import UserForm from './UserForm'

export default {
  components: {
    UserForm,
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
        "staff_name": '',
        "phone_number": '',
        "email": '',
        "created_at": ''
      },

      userFormDialog: false
    }
  },
  computed: {
    userFormVisible(){
      return this.$store.state.views.userFormVisible;
    }
  },

  watch: {
    userFormVisible: function (newValue) {
      this.fetchUserDetails();
    }
  },
  methods: {

    fetchUserDetails() {
      axios.post('/resources/staff/details',{
        id : this.userId
      }).then((response) => {
          this.staff = response.data.payload.staff;
         }).catch((error) => {
        console.log(error)
      })
    },


    deleteStaff() {
      axios.post('/config/staff/user/remove',{
        id : this.userId
      }).then((response) => {
        this.$router.go(-1);
      }).catch((error) => {
        console.log(error)
      })
    },

    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.staff.staff_name}"`,
        accept: this.deleteStaff,
        acceptText: 'Delete'
      })
    },

    showUserForm() {
      this.$store.commit('views/TOGGLE_USER_FORM', true)
    },
    closeUserForm() {
      this.$store.commit('views/TOGGLE_USER_FORM', false)
    },
    navigateToUsers(){
     this.$router.push({ name: 'config-access-user'})
    }

  },
  created () {
    console.log("UserDetails: UserID:"+this.userId);
    if(this.userId){
      this.fetchUserDetails();
    }else{
      this.navigateToUsers();
    }

  }
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

}

</style>
