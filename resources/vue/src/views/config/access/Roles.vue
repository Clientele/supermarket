<!-- =========================================================================================
    File Name: CardStatistics.vue
    Description: Statistics Card
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Charden Daxicen
========================================================================================== -->


<template>
  <div>

    <div class="vx-row pb-6">

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 ">
        <h2 class="font-bold"
            style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
          <vs-icon class="inline pt-2 mr-4" size="32px" icon="verified_user"></vs-icon>
          Roles & Permissions
        </h2>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <vs-button @click="showRoleNameDialog()" color="#c38e70" icon="add_circle" type="filled">Add Role</vs-button>
      </div>
    </div>

    <!-- Roles -->
    <div class="good-outlined-card px-6 py-6">
      <div class="vx-row">
        <div @click="viewRoleDetails(role)" class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-6"
             v-for="(role, index) in roles" :key="index">
          <vx-card class="overflow-hidden">
            <div slot="no-body">
              <div class="p-6" :class="{
              'flex justify-between flex-row-reverse items-center': true,
              'text-center': false,
              'pb-0': false
            }">
                <feather-icon :icon="`UsersIcon`" class="p-3 inline-flex rounded-full"
                              :class="[`text-success`, {'mb-4': false}]"
                              :style="{background: `rgba(var(--vs-success),.15)`}"></feather-icon>
                <div class="truncate">
                  <h3 class="mb-1 ">{{ role.name }}</h3>
                  <span>{{ role.member_count }} Users</span> <br/>
                  <span>{{ role.role_permissions.length }} Permissions</span>
                </div>
              </div>

            </div>
          </vx-card>
        </div>

      </div>
    </div>


    <!-- Role Form -->
    <vs-prompt :title="`Role Name`" :accept-text="`Save`" :cancel-text="`Cancel`"
               @cancel="selectedRole.name=''" :color="`#118ab2`"
               @accept="addNewRole()"
               :active.sync="roleNameForm">
      <div class="con-exemple-prompt">
        <vs-input placeholder="Role" vs-placeholder="Role" v-model="selectedRole.name" class="mt-3 w-full"/>
      </div>
    </vs-prompt>
    <!-- [end] Role Form -->

    <!-- Role Details -->
    <vs-popup @close="closeRole()" fullscreen :title="selectedRole.name" :active.sync="roleDetailsDialog">
      <div>

        <!-- Permissions -->
        <vx-card class="mt-base" no-shadow card-border>

          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="flex items-end px-3">
                <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2"/>
                <span class="font-medium text-lg leading-none">Permissions</span>
              </div>
              <vs-divider/>
            </div>
          </div>

          <div class="block overflow-x-auto">
            <table class="w-full">
              <tr>
                <!--
                  You can also use `Object.keys(Object.values(data_local.permissions)[0])` this logic if you consider,
                  our data structure. You just have to loop over above variable to get table headers.
                  Below we made it simple. So, everyone can understand.
                 -->
                <th class="font-semibold text-base text-left px-3 py-2"
                    v-for="heading in ['Module', 'View', 'Create', 'Update', 'Delete']" :key="heading">{{ heading }}
                </th>
              </tr>

              <tr v-for="(values, permissionsName) in permissionsDataModel" :key="permissionsName">
                <td class="px-3 py-2">{{ permissionsName }}</td>
                <td v-for="(permission, name) in values" class="px-3 py-2" :key="name+permission">
                  <vs-checkbox v-model="values[name]"/>
                </td>
              </tr>
            </table>
          </div>

        </vx-card>

        <!-- Save & Reset Button -->
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="mt-8 flex flex-wrap items-center justify-between">
              <vs-button @click="removeRole()" type="border" color="danger">Delete Role</vs-button>
              <vs-button color="success" class="ml-auto mt-2" @click="updateRolePermissions()">Save Changes</vs-button>
             </div>
          </div>
        </div>
      </div>
    </vs-popup>
    <!-- [end] Role Details -->


  </div>
</template>

<script>
import axios from '../../../axios';

export default {
  components: {},
  data() {
    return {
      roleNameForm: false,

      roles: [],

      roleDetailsDialog: false,
      selectedRole: {
        id: '',
        name: '',
        role_permissions: []
      },

      permissionsDataModel: {},


      statusOptions: [
        {label: 'Active', value: 'active'},
        {label: 'Blocked', value: 'blocked'},
        {label: 'Deactivated', value: 'deactivated'}
      ],
      roleOptions: [
        {label: 'Admin', value: 'admin'},
        {label: 'User', value: 'user'},
        {label: 'Staff', value: 'staff'}
      ]


    }
  },
  methods: {
    showRoleNameDialog() {
      this.roleNameForm = true;
      this.selectedRole.role_permissions = [];
    },

    viewRoleDetails(role) {
      this.selectedRole = role;
      this.roleDetailsDialog = true;

      console.log(JSON.stringify(this.selectedRole.role_permissions));
      this.permissionsDataModel = {
        users: {
          view: this.selectedRole.role_permissions.includes('View Users'),
          create: this.selectedRole.role_permissions.includes('Create Users'),
          update: this.selectedRole.role_permissions.includes('Update Users'),
          delete: this.selectedRole.role_permissions.includes('Delete Users')
        },
        posts: {
          view: false,
          create: false,
          update: false,
          delete: false
        },
        comments: {
          view: false,
          create: false,
          update: false,
          delete: false
        }
      }

    },

    closeRole() {
      this.roleDetailsDialog = false;
    },

    addNewRole() {
      axios.post('/config/staff/role/add', {
        name: this.selectedRole.name,
        permissions: this.selectedRole.role_permissions
      }).then((response) => {
        console.log(JSON.stringify(response.data));
        this.roles = response.data.payload.roles;

        this.selectedRole.name = '';
        this.selectedRole.role_permissions = [];
        this.fetchRoles();
      }).catch((error) => {
        console.log(error)
      })

    },

    updateRolePermissions() {
      let newPermissions = [];
      newPermissions.push(this.permissionsDataModel.users.view ? "View Users" : null);
      newPermissions.push(this.permissionsDataModel.users.create ? "Create Users" : null);
      newPermissions.push(this.permissionsDataModel.users.update ? "Update Users" : null);
      newPermissions.push(this.permissionsDataModel.users.delete ? "Delete Users" : null);

      //remove nullified permissions
      newPermissions = newPermissions.filter( permission => permission != null)
      console.log(JSON.stringify(newPermissions))

      axios.post('/config/staff/role/update', {
        role_name: this.selectedRole.name,
        permissions: newPermissions
      }).then((response) => {
          this.roleDetailsDialog = false;
          this.fetchRoles();
       }).catch((error) => {
        console.log(error)
      })
      this.$vs.notify({
        color: 'success',
        title: 'Success',
        text: 'Role Updated'
      })


    },

    removeRole(){

      axios.post('/config/staff/role/remove', {
        name: this.selectedRole.name
      }).then((response) => {
        this.fetchRoles();
        this.roleDetailsDialog = false;
      }).catch((error) => {
        console.log(error)
      })
      this.$vs.notify({
        color: 'success',
        title: 'Success',
        text: 'Role Removed'
      })
    },


    fetchRoles() {
      axios.get('/resources/staff/roles/full')
        .then((response) => {
          this.roles = response.data.payload.roles;
        }).catch((error) => {
        console.log(error)
      })
    }


  },
  created() {
    this.fetchRoles();
  }
}
</script>

<style scoped>
.good-outlined-card {
  border: 1px solid #e5e5e5;
  border-radius: 8px;

}
</style>
