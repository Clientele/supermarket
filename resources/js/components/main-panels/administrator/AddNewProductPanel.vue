<template>
  <v-app>
    <HorizontalNavMenuVue />
    <VerticalNavBarAdminVue :active_button="'product'" />
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
              <h2>Add New Product</h2>
            </v-col>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="registerProduct()"
            >
              <v-card-text>
               
                <v-row justify="center">
                     <div class="col-12 col-md-6 col-sm-6 col-lg-6">
                    <v-text-field
                      dense
                      outlined
                      label="Name"
                      color="#FFA726"
                      :rules="valueRules"
                      v-model="product.product_name"
                    >
                    </v-text-field>
                  </div>
                  <div class="col-12 col-md-6 col-sm-6 col-lg-6">
                    <v-text-field
                      dense
                      outlined
                      color="#FFA726"
                      :rules="valueRules"
                      label="Price"
                      type="number"
                      v-model="product.price"
                    >
                    </v-text-field>
                  </div>
                  <div class="col-12">
                    <v-alert type="success" text v-if="success">{{
                      message
                    }}</v-alert>
                    <v-alert type="error" text v-if="failed">{{
                      message
                    }}</v-alert>
                  </div>
                  <v-progress-circular
                    indeterminate
                    color="#FFA726"
                    v-if="isLoading"
                  ></v-progress-circular>
                  <v-btn
                    v-else
                    rounded
                    elevation="0"
                    :disabled="!valid"
                    min-width="200"
                    dark
                    class="menu"
                    type="submit"
                    color="#FFA726"
                    >Register Product</v-btn
                  >
                </v-row>
              </v-card-text>
            </v-form>
            <v-card-text>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-text>
              <v-row>
                <div class="col-12 col-md-6 col-lg-6 col-sm-4">
                  <h3>Registered Products</h3>
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
                :headers="product_headers"
                :items="allProducts"
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
    message: null,
    success: false,
    failed: false,
    show1: false,
    search: null,
    valid: true,
    valueRules: [(v) => !!v || "Value is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    product: {
      product_name: null,
      price: null,
      id: null,
      branch_id: null,
      repeat_password: null,
    },
    branches: [],
    allProducts: [],
    product_headers: [
      { text: "Product Name", value: "product_name" },
      { text: "Price", value: "price" },
    ],
  }),
  components: {
    VerticalNavBarAdminVue,
    HorizontalNavMenuVue,
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },

    registerProduct() {
      this.isLoading = true;
      this.success = false;
      this.failed = false;
      if (this.validate()) {
        let url = window.base_url + "config/product/add";
        let access_token = localStorage.getItem("token");
        this.$axios
          .post(url, this.product, {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          })
          .then((response) => {
            if (response.data.success) {
              this.isLoading = false;
              this.success = true;
              this.message = response.data.message + " 😃";
              this.reset();
              this.getProducts();
            } else {
              this.isLoading = false;
              this.failed = true;
              this.message = response.data.message + " 😢";
            }
          })
          .catch((error) => {
            this.isLoading = false;
            this.failed = true;
            this.message =
              "😢 Something went wrong please refresh page and try again. 😢";
            console.log(error);
          });
      }
    },

    getProducts() {
      this.show = false;

      let url = window.base_url + "resources/products/get";
      let access_token = localStorage.getItem("token");

      this.$axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          this.allProducts = response.data.payload["products"]["data"];
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getProducts();
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