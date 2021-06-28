<template>
  <v-app>
    <HorizontalNavMenuVue />
    <VerticalNavMenu :active_button="'inventory'" />
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
              <h2>Products Inventory</h2>
            </v-col>

            <v-card-text>
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
                    color="#FFA726"
                    @click="update(item)"
                    >Update</v-btn
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
                    <h4>Inventory for <strong><span class="ml-2" style="color:#FFA726">{{product.product_name}}</span></strong> </h4>
                    <v-text-field
                      dense
                      outlined
                      label="Quantity"
                      color="#FFA726"
                      type="number"
                      :rules="valueRules"
                      v-model="product.quantity"
                    >
                    </v-text-field>

                    <v-text-field
                      dense
                      outlined
                      label="Batch number"
                      color="#FFA726"
                      :rules="valueRules"
                      type="number"
                      v-model="product.batch_number"
                    >
                    </v-text-field>

                    <v-menu
                      ref="date_menu"
                      v-model="product.date_dialogue"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          outlined
                          dense
                          v-model="product.expiry_date"
                          label="Expiry date"
                          readonly
                          color="#FFA726"
                          v-on="on"
                          :rules="valueRules"
                        ></v-text-field>
                      </template>

                      <v-date-picker
                        v-model="product.expiry_date"
                        no-title
                        scrollable
                        :min="mindate"
                        @input="product.date_dialogue = false"
                      >
                      </v-date-picker>
                    </v-menu>

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
                      >Update Inventory</v-btn
                    >
                  </v-card-text>
                </v-card>
              </v-form>
            </v-dialog>
          </v-row>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HorizontalNavMenuVue from "../../horizontal-menu-bar/HorizontalNavMenu.vue";
import VerticalNavMenu from "../../vertical-nav-menu/VerticalNavMenu.vue";

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
    mindate: new Date().toISOString().slice(0, 10),
    maxwidth: "40%",
    remomaxwidth: "40%",
    update_dialog: false,
    valueRules: [(v) => !!v || "Value is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    product: {
      product_id: null,
      quantity: null,
      batch_number: null,
      expiry_date: null,
      product_name: null,
      date_dialogue: null,
    },

    products: [],
    product_headers: [
      { text: "Product Name", value: "product_name" },
      { text: "Remain Quantity", value: "remaining_quantity" },
      { text: "Update", value: "update" },
    ],
  }),
  components: {
    VerticalNavMenu,
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
      this.product.product_id = item.id;
      this.product.product_name = item.product_name;
      this.update_dialog = true;
    },

    updateProduct() {
      this.isLoading = true;
      this.success = false;
      this.failed = false;
      if (this.validate()) {
        let url = window.base_url + "inventory/add";
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
              this.getProductInventory();
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

    getProductInventory() {
      this.show = false;

      let url = window.base_url + "inventory/available";
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
    this.getProductInventory();
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