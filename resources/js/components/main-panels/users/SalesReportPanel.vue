<template>
  <v-app>
    <HorizontalNavMenuVue />
    <VerticalNavBarMenu :active_button="'report'" />
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
              <h2>Sales Report</h2>
            </v-col>

            <v-card-text>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-text>
              <v-row>
                <div class="col-12 col-md-6 col-lg-6 col-sm-4">
                  <h4>
                    Branch name:
                    <strong
                      ><span style="color: #ffa726" class="ml-2">{{
                        branch_name
                      }}</span></strong
                    >
                  </h4>
                  <h4>
                    Total sales:
                    <strong
                      ><span style="color: #ffa726" class="ml-2"
                        >Tsh {{ Number(total_sales).toLocaleString() }}/=</span
                      ></strong
                    >
                  </h4>
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
                :headers="sales_header"
                :items="sales"
                :search="search"
              >
                <template v-slot:[`item.selling_price`]="{ item }">
                  {{ Number(item.selling_price).toLocaleString() }}/=
                </template>
                <template v-slot:[`item.created_at`]="{ item }">
                  {{
                    item.created_at.slice(0, 10).split("-").reverse().join("/")
                  }}
                </template>
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
import VerticalNavBarMenu from "../../vertical-nav-menu/VerticalNavMenu.vue";

export default {
  data: () => ({
    show: false,
    isLoading: false,

    search: null,
    branch_name: null,
    total_sales: 0,
    sales: [],
    sales_header: [
      { text: "Product number", value: "product_id" },
      { text: "Quantiry sold", value: "sold_quantity" },
      { text: "Selling Price (Tsh)", value: "selling_price" },
      { text: "Discount Amount", value: "discount_amount" },
      { text: "Date", value: "created_at" },
    ],
  }),
  components: {
    VerticalNavBarMenu,
    HorizontalNavMenuVue,
  },
  methods: {
    getsales() {
      this.show = false;

      let url =
        window.base_url +
        "reports/sales/get?branch_id=" +
        localStorage.getItem("branch_id");
      let access_token = localStorage.getItem("token");

      this.$axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          this.sales = response.data.payload["sales"]["data"];
          this.branch_name =
            response.data.payload["sales"]["data"][0]["branch"]["branch_name"];
          this.total_sales = response.data.payload["total_sales"];
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getsales();
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