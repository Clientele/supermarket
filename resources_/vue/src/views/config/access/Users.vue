<!-- =========================================================================================
    File Name: CardStatistics.vue
    Description: Statistics Card
========================================================================================== -->


<template>
  <div  >

    <!-- Users list -->
    <div id="page-user-list">

      <div class="vx-card p-6">

        <!-- Filter -->
        <div class="flex flex-wrap items-center">
          <div class="flex-grow">
            <vs-dropdown vs-trigger-click class="cursor-pointer">
              <div  class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">  Role: {{  rolesSelected  }} </span>
                <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
              <vs-dropdown-menu>

                <vs-dropdown-item  @click="fetchUsers()">
                  <span>All Staff</span>
                </vs-dropdown-item>

                <vs-dropdown-item v-for="(role, index) in  rolesAvailable" :key="index" @click="fetchUsers(role)">
                  <span>{{ role  }}</span>
                </vs-dropdown-item>

              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <vs-button @click="showUserForm()">Add User</vs-button>
        </div>
        <!-- [end] Filter -->

        <vs-divider/>
        <!-- AgGrid Table -->
        <ag-grid-vue
          ref="agGridTable"
          :components="components"
          :gridOptions="gridOptions"
          class="ag-theme-material w-100 my-4 ag-grid-table"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="usersData"
          rowSelection="multiple"
          :animateRows="true"
          :paginationPageSize="paginationPageSize"
          :suppressPaginationPanel="true"
          :enableRtl="$vs.rtl">
        </ag-grid-vue>

      </div>
    </div>
    <!-- [end] Users list -->

    <!-- User form -->
    <vs-popup @close="closeUserForm()" fullscreen title="Staff Info" :active.sync="userFormVisible">
      <div >
      <user-form></user-form>
      </div>
    </vs-popup>
    <!-- [end] User form -->

  </div>
</template>

<script>
import {AgGridVue} from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'

// Cell Renderer
import CellRendererLink from './cell-renderer/CellRendererLink.vue'
import CellRendererStatus from './cell-renderer/CellRendererStatus.vue'
import CellRendererVerified from './cell-renderer/CellRendererVerified.vue'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'
import axios from "@/axios";
import UserForm from './UserForm'

export default {
  components: {
    AgGridVue,
    vSelect,
    CellRendererLink,
    CellRendererStatus,
    CellRendererVerified,
    CellRendererActions,
    UserForm,

  },
  data() {
    return {
      colorx:"#4a5153",

      users: [],
      userFormDialog: false,

      // Filter Options
      roleFilter: {label: 'All', value: 'all'},
      roleOptions: [
        {label: 'All', value: 'all'},
        {label: 'Admin', value: 'admin'},
        {label: 'User', value: 'user'},
        {label: 'Staff', value: 'staff'}
      ],

      statusFilter: {label: 'All', value: 'all'},
      statusOptions: [
        {label: 'All', value: 'all'},
        {label: 'Active', value: 'active'},
        {label: 'Deactivated', value: 'deactivated'},
        {label: 'Blocked', value: 'blocked'}
      ],

      isVerifiedFilter: {label: 'All', value: 'all'},
      isVerifiedOptions: [
        {label: 'All', value: 'all'},
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'}
      ],

      searchQuery: '',

      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'Name',
          field: 'staff_name',
          cellRendererFramework: 'CellRendererLink',
          suppressSizeToFit: false
        },
        {
          headerName: 'Email',
          field: 'email',
          suppressSizeToFit: false
        },
        {
          headerName: 'Role',
          field: 'role_name',
          cellRendererFramework: 'CellRendererStatus',
          suppressSizeToFit: false
        },
        {
          headerName: 'Actions',
          field: 'transactions',
          cellRendererFramework: 'CellRendererActions',
          suppressSizeToFit: false
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus,
        CellRendererVerified,
        CellRendererActions
      },

      /***Resources **/
      rolesAvailable: [],
      rolesSelected: "All Staff"
    }
  },
  computed: {
    usersData() {
      return this.users
    },
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
    },
    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    },
    userFormVisible(){
      return this.$store.state.general.userFormVisible;
    }
  },
  watch: {
    userFormVisible: function (newValue) {
      this.fetchUsers();
    }
  },
  methods: {
    closeUserForm() {
      this.$store.commit('general/TOGGLE_USER_FORM', false)
    },
    showUserForm() {
      this.$store.commit('general/TOGGLE_USER_FORM', true)
    },

    fetchUsers(role) {
      this.rolesSelected = role==null? "All Staff" : role;

      axios.post('/resources/staff/get',{
        role_name : role
      }).then((response) => {
          this.users = response.data.payload.staff;
        }).catch((error) => {
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
    }
  },

  created() {
    this.fetchUsers();
    this.fetchAvailableRoles();
  },
  mounted() {
    this.gridApi = this.gridOptions.api
    this.gridApi.sizeColumnsToFit();


  }
}
</script>
