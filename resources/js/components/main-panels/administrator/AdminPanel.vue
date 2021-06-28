<template>
  <v-app>
    <HorizontalNavMenuVue />
    <VerticalNavBarAdminVue :active_button="'dashboard'" />
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
          <v-row v-if="show">
            <div class="col-12 col-md-6 col-lg-6 col-sm-6">
              <v-card elevation="1">
                <v-card-text>
                  <v-row>
                    <v-card-title> Sales per week</v-card-title
                    ><v-spacer></v-spacer>
                    <v-card-title style="color: #ffa726; font-weight: bold">
                      Tsh:
                      {{
                        String(totalCash).substring(1).length >= 3 &&
                        String(totalCash).substring(1).length < 6
                          ? String(totalCash / 1000) + "K"
                          : String(totalCash).substring(1).length >= 6
                          ? String(totalCash / 1000000) + "M"
                          : totalCash
                      }}
                    </v-card-title></v-row
                  ></v-card-text
                >
                <v-card-text>
                  <v-sparkline
                    :fill="fill"
                    :gradient="selectedGradient"
                    :line-width="width"
                    :padding="padding"
                    :smooth="radius || false"
                    :value="value"
                    color="#FFA726"
                    auto-draw
                  >
                    <template v-slot:label="item">
                      {{
                        String(item.value).substring(1).length >= 3 &&
                        String(item.value).substring(1).length < 6
                          ? String(item.value / 1000) + "K"
                          : String(item.value).substring(1).length >= 6
                          ? String(item.value / 1000000) + "M"
                          : item.value
                      }}
                    </template>
                  </v-sparkline>
                </v-card-text>
              </v-card>
              <v-card-text></v-card-text>
              <v-row>
                <div class="col-6">
                  <v-card elevation="1">
                    <v-card-text>
                      <h4>Total sales (Tsh)</h4>

                      <strong>
                        <h1>
                          {{
                            String(totalCash).substring(1).length >= 3 &&
                            String(totalCash).substring(1).length < 6
                              ? String(totalCash / 1000) + "K"
                              : String(totalCash).substring(1).length >= 6
                              ? String(totalCash / 1000000) + "M"
                              : totalCash
                          }}
                        </h1></strong
                      >
                    </v-card-text>
                  </v-card>
                </div>
                <div class="col-6">
                  <v-card elevation="1">
                    <v-card-text>
                      <h4>Total Item sold</h4>

                      <strong>
                        <h1>
                          {{
                            String(total_item_sold).substring(1).length >= 3 &&
                            String(total_item_sold).substring(1).length < 6
                              ? String(total_item_sold / 1000) + "K"
                              : String(total_item_sold).substring(1).length >= 6
                              ? String(total_item_sold / 1000000) + "M"
                              : total_item_sold
                          }}
                        </h1></strong
                      >
                    </v-card-text>
                  </v-card>
                </div>
              </v-row>
            </div>
            <div class="col-12 col-md-6 col-lg-6 col-sm-6">
              <v-card elevation="1">
                <v-card-text>
                  <v-row>
                    <v-card-title>
                      Best selling products of the week
                    </v-card-title></v-row
                  ></v-card-text
                >
                <v-card-text>
                  <v-row>
                    <template v-for="(product, index) in best_selling_products">
                      <div :key="index" class="col-6">
                        <v-row>
                          <div class="col-1">
                            <v-avatar :color="product.color" size="10">
                            </v-avatar>
                          </div>
                          <div class="col-10">
                            <label>{{ product.name }}</label
                            ><br />
                            <label
                              >Sales:
                              {{
                                String(product.sales).substring(1).length >=
                                  3 &&
                                String(product.sales).substring(1).length < 6
                                  ? String(product.sales / 1000) + "K"
                                  : String(product.sales).substring(1).length >=
                                    6
                                  ? String(product.sales / 1000000) + "M"
                                  : product.sales
                              }}</label
                            ><br />
                            <label>Counts: {{ product.sales_count }}</label>
                          </div>
                        </v-row>
                      </div>
                    </template>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>
            <div class="col-12 col-md-6 col-lg-6 col-sm-6">
              <v-card elevation="1">
                <v-card-text>
                  <v-row>
                    <v-card-title>
                      Today Branches sales (Tsh)
                    </v-card-title></v-row
                  ></v-card-text
                >
                <v-card-text>
                  <v-data-table
                    :headers="branch_sales_headers"
                    :items="branch_sales"
                  >
                    <template v-slot:[`item.sales`]="{ item }">
                      {{
                        String(item.sales).substring(1).length >= 3 &&
                        String(item.sales).substring(1).length < 6
                          ? String(item.sales / 1000) + "K"
                          : String(item.sales).substring(1).length >= 6
                          ? String(item.sales / 1000000) + "M"
                          : item.sales
                      }}
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </div>
            <div class="col-12 col-md-6 col-lg-6 col-sm-6">
              <v-card elevation="1">
                <v-card-text>
                  <v-row>
                    <v-card-title> Expenses per week</v-card-title
                    ><v-spacer></v-spacer>
                    <v-card-title style="color: #ffa726; font-weight: bold">
                      Tsh:
                      {{
                        String(totalExpenses).substring(1).length >= 3 &&
                        String(totalExpenses).substring(1).length < 6
                          ? String(totalExpenses / 1000) + "K"
                          : String(totalExpenses).substring(1).length >= 6
                          ? String(totalExpenses / 1000000) + "M"
                          : totalExpenses
                      }}
                    </v-card-title></v-row
                  ></v-card-text
                >
                <v-card-text>
                  <v-sparkline
                    :fill="true"
                    :gradient="selectedGradient2"
                    :line-width="2"
                    :padding="8"
                    :smooth="5 || false"
                    :value="expenses_value"
                    color="#FFA726"
                    auto-draw
                  >
                    <template v-slot:label="item">
                      {{
                        String(item.value).substring(1).length >= 3 &&
                        String(item.value).substring(1).length < 6
                          ? String(item.value / 1000) + "K"
                          : String(item.value).substring(1).length >= 6
                          ? String(item.value / 1000000) + "M"
                          : item.value
                      }}
                    </template>
                  </v-sparkline>
                </v-card-text>
              </v-card>
            </div>
          </v-row>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["red", "#FFA726","green"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
import HorizontalNavMenuVue from "../../horizontal-menu-bar/HorizontalNavMenu.vue";
import VerticalNavBarAdminVue from "../../vertical-nav-menu/VerticalNavBarAdmin.vue";

export default {
  data: () => ({
    show: true,
    fill: true,
    totalCash: 0,
    totalExpenses: 0,
    total_item_sold: 2300,
    selectedGradient: gradients[4],
    selectedGradient2:gradients[2],
    gradients,
    padding: 8,
    radius: 5,
    value: [200000, 250000, 500000, 900000, 500000, 1000000, 100000],
    expenses_value: [50000, 25000, 100000, 80000, 20000, 0, 30000],
    width: 1,
    best_selling_products: [
      {
        name: "Best Product 1",
        sales: 1000000,
        sales_count: 10,
        color: "#8CBF1C",
      },
      {
        name: "Best Product 2",
        sales: 800000,
        sales_count: 8,
        color: "#ADCF1A",
      },
      {
        name: "Best Product 3",
        sales: 600000,
        sales_count: 30,
        color: "#CCE00E",
      },
      {
        name: "Best Product 4",
        sales: 400000,
        sales_count: 20,
        color: "#F4EA3D",
      },
      {
        name: "Best Product 5",
        sales: 300000,
        sales_count: 10,
        color: "#FFF700",
      },
    ],

    branch_sales_headers: [
      { text: "Branch name", value: "branch_name", align: "start" },
      { text: "Branch Sales", value: "sales" },
    ],

    branch_sales: [
      { branch_name: "Mbezi", sales: 1000000 },
      { branch_name: "Oysterbay", sales: 2000000 },
      { branch_name: "Karia koo", sales: 500000 },
    ],
  }),
  components: {
    VerticalNavBarAdminVue,
    HorizontalNavMenuVue,
  },
  created() {
    this.value.forEach((element) => {
      this.totalCash += element;
    });

    this.expenses_value.forEach((value)=>{
this.totalExpenses += value;
    });
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