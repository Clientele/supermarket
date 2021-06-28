<template>
  <v-app>
    <HorizontalNavMenuVue />
    <VerticalNavBarAdminVue :active_button="'expenses'" />
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
              <h2>Record Expense</h2>
            </v-col>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="registerexpense()"
            >
              <v-card-text>
                <v-row>
                  <div class="col-12 ">
                    <v-text-field
                      dense
                      outlined
                      label="Amount"
                      type="number"
                      color="#FFA726"
                      :rules="valueRules"
                      v-model="expense.amount"
                    >
                    </v-text-field>
                  </div>
                  <div class="col-12 ">
                    <v-textarea
                      rows="3"
                      dense
                      outlined
                      color="#FFA726"
                      :rules="valueRules"
                      label="Description"
                      v-model="expense.description"
                    >
                    </v-textarea>
                  </div>
                </v-row>
                <v-row>
                  <div class="col-12 ">
                    <v-menu
                      ref="date_menu"
                      v-model="expense.date_dialogue"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          outlined
                          dense
                          v-model="expense.date"
                          label="Expense date"
                          readonly
                          v-on="on"
                          :rules="valueRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="expense.date"
                        no-title
                        scrollable
                        min="1900-01-01"
                        @input="expense.date_dialogue = false"
                      >
                      </v-date-picker>
                    </v-menu>
                  </div>
                </v-row>
                <v-row justify="center">
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
                    >Register expense</v-btn
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
                  <h3>Recorded expenses</h3>
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
                :headers="expenses_headers"
                :items="expenses"
                :search="search"
              >
              <template v-slot:[`item.branch`]="{item}">
                  <label>{{item.branch.branch_name}}</label>

              </template>
              <template v-slot:[`item.amount`]="{item}">
                  <label>{{Number(item.amount).toLocaleString()}}</label>

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
    expense: {
      amount: null,
      description: null,
      date: null,
      date_dialogue:null,
    },
    branches: [],
    expenses: [],
    expenses_headers: [
      { text: "Branch name", value: "branch" , align:"start"},
      { text: "Amount", value: "amount" },
      { text: "Description", value: "description" },
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

    registerexpense() {
      this.isLoading = true;
      this.success = false;
      this.failed = false;
      if (this.validate()) {
        
          let url = window.base_url + "expense/add";
          let access_token = localStorage.getItem("token");

          this.$axios
            .post(url, this.expense, {
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
                this. getAllExpenses();
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
    getAllExpenses() {
      let url = window.base_url + "expenses/get";
      let access_token = localStorage.getItem("token");

      this.$axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
         this.expenses  = response.data.payload["expenses"]["data"];
         this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRegisteredexpense() {
      this.show = false;

      let url = window.base_url + "config/staff/expenses/get";
      let access_token = localStorage.getItem("token");

      this.$axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          this.expenses = response.data.payload["expenses"];
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    //this.getRegisteredexpense();
    this.getAllExpenses();
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