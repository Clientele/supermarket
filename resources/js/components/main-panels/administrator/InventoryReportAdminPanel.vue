<template>
  <v-app>
    <HorizontalNavMenuVue />
    <VerticalNavBarAdminVue :active_button="'report'" />
    <v-main>
      <v-container class="components">
        <transition name="bounce">
          <v-row
            v-if="!show"
            class="components"
            justify="center"
            align="center"
          >
            <v-progress-circular
              indeterminate
              color="#FFA726"
            ></v-progress-circular>
          </v-row>
          <v-row v-if="show" justify="center">
            <v-col cols="12" align="center">
              <h2>Inventory Report</h2>
            </v-col>
          
            <v-card-text>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-text>
              <v-row>
                <div class="col-12 col-md-6 col-lg-6 col-sm-4">
                  <!-- <h4>Branch name: <strong><span style="color:#FFA726" class="ml-2">{{branch_name}}</span></strong> </h4> -->
    
                </div>
                <div class="col-12 col-md-6 col-lg-6 col-sm-8">
                  <v-text-field
                    dense
                    outlined
                    placeholder="Search"
                    v-model="search"
                    color="#FFA726"
                  >
                  </v-text-field>
                </div>
              </v-row>
              <v-data-table
                :headers="inventory_headers"
                :items="inventory"
                :search="search"
              >
              </v-data-table>
            </v-card-text>
          </v-row>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HorizontalNavMenuVue from "../../horizontal-menu-bar/HorizontalNavMenu.vue";
import VerticalNavBarAdminVue from "../../vertical-nav-menu/VerticalNavBarAdmin.vue";

export default {
  data: () => ({
    show: false,
    isLoading: false,
   
    search: null,
  
    inventory: [],
    inventory_headers: [
      { text: "Product name", value: "product_name" },
      { text: "Remaining Quantity", value: "remaining_quantity" },
    ],
  }),
  components: {
    VerticalNavBarAdminVue,
    HorizontalNavMenuVue,
  },
  methods: {
 
    getInventory() {
      this.show = false;

      let url = window.base_url + "reports/stock/available?branch_id="+localStorage.getItem("branch_id");
      let access_token = localStorage.getItem("token");

      this.$axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          this.inventory = response.data.payload["products"]["data"];
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getInventory();
   
  },
};
</script>

<style scoped>
.menu {
  text-transform: none !important;
}
.components {
  height: 90vh;
  overflow: scroll;
  overflow-x: hidden;
}
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-in 0.8s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>