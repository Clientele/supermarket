<template>
  <v-app>
    <HorizontalNavMenu />
    <VerticalNavMenuVue :active_button="'sales'"/>

    <v-main>
      <v-container class="components">
        <transition name="bounce">
          <v-row v-if="!show" class="components" justify="center" align="center">
              <v-progress-circular indeterminate color="#FFA726"></v-progress-circular>
            </v-row>
            <v-row v-if="show">
              <div class="col-12 col-md-8 col-sm-7 col-lg-8">
                <v-text-field
                  v-model="search"
                  dense
                  outlined
                  placeholder="Search"
                  rounded
                  color="#FFA726"
                >
                </v-text-field>
                <v-data-iterator
                  hide-default-footer
                  :items="allProduct"
                  :search="search"
                  :items-per-page.sync="itemsPerPage"
                  :page.sync="page"
                  @page-count="pageCount = $event"
                >
                  <template v-slot:default="{ items }">
                    <v-row justify="center">
                      <div
                        class="col-6 col-md-3 col-sm-6 col-lg-3"
                        v-for="item in items"
                        :key="item.id"
                      >
                        <v-hover v-slot="{ hover }" open-delay="100">
                          <v-card
                            light
                            :elevation="hover ? '6' : '1'"
                            align="center"
                            style="
                              padding: 10px;
                              cursor: pointer;
                              border-radius: 10px;
                            "
                            @click="pressOrder(item)"
                          >
                            <v-img
                              width="100%"
                              contain
                              :src="item.thumbnail_img"
                            ></v-img>

                            <p
                              class="mt-3"
                              :style="{
                                color: hover ? '#FFA726' : 'black',
                              }"
                            >
                              {{ item.product_name }}
                            </p>

                            <strong>
                              <p>
                                {{ Number(item.price).toLocaleString() }} Tsh
                              </p></strong
                            >
                            <v-btn
                              rounded
                              elevation="0"
                              dark
                              block
                              class="menu"
                              color="#FFA726"
                              @click="sale(item)"
                              >Add +</v-btn
                            >
                          </v-card>
                        </v-hover>
                      </div>
                    </v-row>
                  </template>
                  <template v-slot:footer>
                    <v-pagination
                      class="mt-10"
                      v-model="page"
                      circle
                      :length="pageCount"
                      prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right"
                      color="#FFA726"
                    >
                    </v-pagination>
                  </template>
                </v-data-iterator>
              </div>
              <div class="col-12 col-md-4 col-lg-4 col-sm-5 sale-list-card" align="center">
              
                  <v-card elevation="1">
                    <v-row justify="center">
                      <v-card-title>Sale List</v-card-title>
                    </v-row>
                    <v-card-text>
                      <h5 v-if="products_to_sale.length > 0"> Total: <strong><span style="color: #ffa726" class="ml-2">Tsh {{Number(totalAMountDue).toLocaleString()}}</span></strong></h5>
                      <p v-if="products_to_sale.length == 0">
                        No product in list 😊
                      </p>

                      <v-card
                        v-else
                        v-for="(product, index) in products_to_sale"
                        :key="index"
                        dark
                        align="left"
                        class="mb-3"
                        elevation="0"
                        style="padding: 10px; border-radius: 10px"
                      >
                        <v-row
                          ><v-spacer></v-spacer
                          ><v-icon color="#FFA726" @click="removeProduct(index)"
                            >mdi-delete</v-icon
                          ></v-row
                        >
                        Product:
                        <strong>
                          <span style="color: #ffa726" class="ml-2">
                            {{ product.product_name }}</span
                          ></strong
                        ><br />
                        Price @:
                        <strong>
                          <span style="color: #ffa726" class="ml-2">
                            {{ product.price }}</span
                          ></strong
                        ><br />
                        Quantity:
                        <strong>
                          <span style="color: #ffa726" class="ml-2">
                            {{ product.quantity }}</span
                          ></strong
                        ><br />
                        Amount due:
                        <strong>
                          <span style="color: #ffa726" class="ml-2">
                            Tsh
                            {{
                              Number(
                                product.quantity * product.price
                              ).toLocaleString()
                            }}</span
                          ></strong
                        ><br />
                      </v-card>
                      <v-alert type="success" text v-if="success">{{
                        message
                      }}</v-alert>
                      <v-alert type="error" text v-if="failed">{{
                        message
                      }}</v-alert>
                      <v-btn
                        rounded
                        elevation="0"
                        v-if="
                          products_to_sale.length > 0 && isSubmiting == false
                        "
                        min-width="100"
                        dark
                        class="menu"
                        color="#FFA726"
                        @click="submitOrder"
                        >Submit Sale</v-btn
                      >
                     
                      <v-progress-circular
                        indeterminate
                        color="#FFA726"
                        v-if="
                          products_to_sale.length > 0 && isSubmiting == true
                        "
                      ></v-progress-circular>
                    </v-card-text>
                  </v-card>
               
              </div>
            </v-row>
        
        </transition>
        <v-dialog v-model="sale_dialog" persistent :max-width="maxwidth">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="addTosaleList()"
          >
            <v-card-text>
              <v-card align="center">
                <v-card-text>
                  <v-row
                    ><v-spacer></v-spacer
                    ><v-icon color="#FFA726" @click="sale_dialog = false"
                      >mdi-close-circle</v-icon
                    ></v-row
                  >
                  <h4>{{ product_name }}</h4>

                  <v-text-field
                    type="number"
                    :rules="valueRules"
                    outlined
                    dense
                    label="Quantity"
                    color="#FFA726"
                    v-model="quantity"
                    rounded
                  ></v-text-field>

                  <v-btn
                    rounded
                    elevation="0"
                    :disabled="!valid"
                    min-width="100"
                    dark
                    class="menu"
                    type="submit"
                    color="#FFA726"
                    >Add to sale list</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-form>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HorizontalNavMenu from "../../horizontal-menu-bar/HorizontalNavMenu.vue";
import VerticalNavMenuVue from "../../vertical-nav-menu/VerticalNavMenu.vue";

export default {
  data: () => ({
    sale_dialog: false,
    valid: true,
    valueRules: [
      (v) => (!!v && v > 0) || "Value is required and must be greater than 0",
    ],
    product_name: null,
    product_id: null,
    product_price: null,
    maxwidth: "40%",
    total_amount_due:0,
    success: false,
    failed: false,
    message: null,
    products_to_sale: [],
    products: [],
    quantity: 1,
    search: null,
    allProduct: [],
    page: 1,
    pageCount: 0,
    itemsPerPage: 8,
    show: false,
    isSubmiting: false,
  }),
  components: {
    HorizontalNavMenu,
    VerticalNavMenuVue,
  },
  computed: {
    totalAMountDue: function () {
      let totalAmount = 0;
      
      this.products_to_sale.forEach(element => {
        totalAmount+= element.price * element.quantity
      });
      
      return totalAmount
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
      
    },
    pressOrder(item) {},
    sale(item) {
      this.success = false;
      this.failed = false;
      this.message = null;
      this.sale_dialog = true;
      this.product_name = item.product_name;
      this.product_id = item.id;
      this.product_price = item.price;
    },

    addTosaleList() {
      if (this.validate()) {
        this.products_to_sale.push({
          id: this.product_id,
          price: this.product_price,
          quantity: this.quantity,
          product_name: this.product_name,
        });
        localStorage.setItem(
          "product_to_sale",
          JSON.stringify(this.products_to_sale)
        );
        this.sale_dialog = false;
      }
    },
    removeProduct(index) {
      this.products_to_sale.splice(index, 1);
      localStorage.setItem(
        "product_to_sale",
        JSON.stringify(this.products_to_sale)
      );
    },
    submitOrder() {
      this.success = false;
      this.failed = false;
      let saleproducts = { products: this.products_to_sale };

      this.isSubmiting = true;

      let url = window.base_url + "sales/add";
      let access_token = localStorage.getItem("token");

      this.$axios
        .post(url, saleproducts, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.isSubmiting = false;
            this.success = true;
            this.message = response.data.message+" 😃";
            this.products_to_sale = [];
            localStorage.setItem(
          "product_to_sale",
          this.products_to_sale
        );

          } else {
            this.isSubmiting = false;
            this.failed = true;
            this.message = response.data.message+" 😢";
          }
        })
        .catch((error) => {
          this.isSubmiting = false;
          this.failed = true;
            this.message = "😢 Something went wrong please refresh page and try again. 😢";
          console.log(error);
        });
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
          this.allProduct = response.data.payload["products"]["data"];
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    if (localStorage.getItem("loged_in") == "true") {
      this.user_name = localStorage.getItem("loged_name");
      this.profile_photo = localStorage.getItem("profile_photo");
      this.getProducts();

      if (JSON.parse(localStorage.getItem("product_to_sale")) == null) {
      } else {
        try{
this.products_to_sale = JSON.parse(
          localStorage.getItem("product_to_sale")
        );
        }
        catch{

        }
        
      }
    }
  },
};
</script>

<style scoped>
.menu {
  text-transform: none !important;
}
.components {
  height: 95vh;
  overflow: scroll;
  overflow-x: hidden;
}
.sale-list-card {
  height: 95vh;
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