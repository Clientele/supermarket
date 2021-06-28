<template>
  <v-app>
    <HorizontalNavMenuVue />
    <VerticalNavBarAdminVue :active_button="'users'" />
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
              <h2>Register User</h2>
            </v-col>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="registerUser()"
            >
              <v-card-text>
                <v-row>
                  <div class="col-12 col-md-6 col-sm-6 col-lg-6">
                    <v-text-field
                      dense
                      outlined
                      label="Name"
                      color="#FFA726"
                      :rules="valueRules"
                      v-model="user.name"
                    >
                    </v-text-field>
                  </div>
                  <div class="col-12 col-md-6 col-sm-6 col-lg-6">
                    <v-text-field
                      dense
                      outlined
                      color="#FFA726"
                      :rules="emailRules"
                      label="Email"
                      v-model="user.email"
                    >
                    </v-text-field>
                  </div>
                </v-row>
                <v-row>
                  <div class="col-12 col-md-6 col-sm-6 col-lg-6">
                    <v-text-field
                      v-model="user.password"
                      label="Password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="() => (show1 = !show1)"
                      :type="show1 ? 'text' : 'password'"
                      color="#FFA726"
                      :rules="valueRules"
                      outlined
                      dense
                      required
                    >
                    </v-text-field>
                  </div>
                  <div class="col-12 col-md-6 col-sm-6 col-lg-6">
                    <v-text-field
                      v-model="user.repeat_password"
                      label="Repeat password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="() => (show1 = !show1)"
                      :type="show1 ? 'text' : 'password'"
                      color="#FFA726"
                      :rules="valueRules"
                      outlined
                      dense
                      required
                    >
                    </v-text-field>
                  </div>
                  <div class="col-12 col-md-6 col-sm-6 col-lg-6">
                    <v-select
                      outlined
                      dense
                      :rules="valueRules"
                      v-model="user.branch_id"
                      :items="branches"
                      label="Branch"
                    >
                    </v-select>
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
                    >Register User</v-btn
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
                  <h3>Registered users</h3>
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
                :headers="users_headers"
                :items="users"
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
    success:false,
    failed:false,
    show1: false,
    search: null,
    valid: true,
    valueRules: [(v) => !!v || "Value is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    user: {
      name: null,
      email: null,
      password: null,
      branch_id: null,
      repeat_password: null,
    },
    branches: [],
    users: [],
    users_headers: [
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
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

    registerUser() {
        this.isLoading = true;
        this.success = false;
      this.failed = false;
      if (this.validate()) {
          if(this.user.password == this.user.repeat_password){
              let url = window.base_url + "config/staff/user/add";
      let access_token = localStorage.getItem("token");

      this.$axios
        .post(url, this.user, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.success = true;
            this.message = response.data.message+" 😃";
            this.reset();
            this.getRegisteredUser();
          } else {
            this.isLoading = false;
            this.failed = true;
            this.message = response.data.message+" 😢";
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.failed = true;
            this.message = "😢 Something went wrong please refresh page and try again. 😢";
          console.log(error);
        });
          }
          else{
              this.isLoading = false;
              this.failed = true;
              this.message = "Password mismatch. Please repeat the password correctly."
          }
      }
    },
    getBranches() {
      let url = window.base_url + "resources/branches/get";
      let access_token = localStorage.getItem("token");

      this.$axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          response.data.payload["branches"]["data"].forEach((element) => {
            this.branches.push({
              text: element.branch_name,
              value: element.id,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRegisteredUser() {
      this.show = false;

      let url = window.base_url + "config/staff/users/get";
      let access_token = localStorage.getItem("token");

      this.$axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          this.users = response.data.payload["users"];
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getRegisteredUser();
    this.getBranches();
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