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
              <h2>Update Product</h2>
            </v-col>

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
                :items="products"
                :search="search"
              >
                <template v-slot:[`item.update`]="{ item }">
                  <v-btn
                    rounded
                    elevation="0"
                    dark
                    small
                    class="menu"
                    color="success"
                    @click="update(item)"
                    >Update</v-btn
                  >
                </template>
                <template v-slot:[`item.remove`]="{ item }">
                  <v-btn
                    rounded
                    elevation="0"
                    dark
                    small
                    class="menu"
                    color="red"
                    @click="remove(item)"
                    >Remove</v-btn
                  >
                </template>
              </v-data-table>
            </v-card-text>
            <v-dialog v-model="update_dialog" persistent :max-width="maxwidth">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="updateProduct()"
              >
                <v-card align="center">
                  <v-card-text>
                    <v-row class="mb-5"
                      ><v-spacer></v-spacer
                      ><v-icon color="#FFA726" @click="update_dialog = false"
                        >mdi-close-circle</v-icon
                      ></v-row
                    >
                    <h4>Update Product</h4>
                    <v-text-field
                      dense
                      outlined
                      label="Name"
                      color="#FFA726"
                      :rules="valueRules"
                      v-model="product.product_name"
                    >
                    </v-text-field>

                    <v-text-field
                      dense
                      outlined
                      label="Price"
                      color="#FFA726"
                      :rules="valueRules"
                      type="number"
                      v-model="product.price"
                    >
                    </v-text-field>

                    

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
                      min-width="100"
                      dark
                      class="menu"
                      type="submit"
                      color="#FFA726"
                      >Update product</v-btn
                    >
                  </v-card-text>
                </v-card>
              </v-form>
            </v-dialog>

            <v-dialog v-model="remove_dialog" persistent :max-width="remomaxwidth">
              <v-card align="center" style="padding:10px">
                <v-card-text>
                  <p>
                    Are you sure you want to remove 
                    <strong> {{ product.product_name }}?</strong>
                  </p>
                  <v-row >
                    <div class="col-6">
                      <v-btn
                        @click="remove_dialog = false"
                        rounded
                        elevation="0"
                        min-width="100"
                        dark
                        class="menu"
                        color="red"
                        >No</v-btn
                      >
                    </div>
                    <div class="col-6"><v-btn
                        @click="removeproduct"
                        rounded
                        elevation="0"
                        min-width="100"
                        dark
                        class="menu"
                        color="success"
                        >Yes</v-btn
                      ></div>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-dialog>
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
    maxwidth: "40%",
    remomaxwidth: "40%",
    update_dialog: false,
    remove_dialog: false,
    valueRules: [(v) => !!v || "Value is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    product: {
      id: null,
      product_name: null,
      price:null
    },
   
    products: [],
    product_headers: [
      { text: "Product Name", value: "product_name" },
      { text: "Price", value: "price" },
      { text: "Update", value: "update" },
      { text: "Remove", value: "remove" },
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
    update(item) {
        this.success = false;
      this.failed = false;
      if (window.screen.width > 750) this.maxwidth = "40%";
      else this.maxwidth = "95%";
      this.product.id = item.id;
      this.product.price = item.price;
      this.product.product_name = item.product_name;
      this.update_dialog = true;
    },
    remove(item) {
      if (window.screen.width > 750) this.remomaxwidth = "40%";
      else this.remomaxwidth = "95%";

      console.log(item);
      this.product.id = item.id;
      this.product.product_name = item.product_name;
      this.remove_dialog = true;
    },

    removeproduct() {
      let url = window.base_url + "config/product/remove";
      let access_token = localStorage.getItem("token");
      this.$axios
        .post(url, this.product, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          if (response.data.success) {
              this.remove_dialog = false;
            this.getRegisteredproduct();
          } else {
          }
        })
        .catch((error) => {});
    },
    updateProduct() {
      this.isLoading = true;
      this.success = false;
      this.failed = false;
      if (this.validate()) {
        let url = window.base_url + "config/product/update";
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
              this.getRegisteredproduct();
              this.update_dialog = false;
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

    getRegisteredproduct() {
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
          this.products = response.data.payload["products"]["data"];
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getRegisteredproduct();
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