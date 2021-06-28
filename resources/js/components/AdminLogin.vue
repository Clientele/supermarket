<template>
  <v-app>
    <v-main >
      <div class="main"></div>
      <div class="login col-12">
        <v-container fluid>
          <v-form
            ref="form"
            
            @submit.prevent="onLogin"
          >
            <v-row justify="center" align="center">
              <div class="col-12 col-md-6 col-sm-6 col-lg-4" align="center">
                <v-card elevation="10" style="border-radius: 20px">
                  <v-card-text>
                    <h1 style="text-align: center; color: #FFA726">Supermarket</h1>
                    <h2 style="text-align: center">Login</h2>
                    <v-text-field
                      v-model="user.username"
                      label="Email"
                      outlined
                      color="#FFA726"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="user.password"
                      label="Password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="() => (show1 = !show1)"
                     
                      :type="show1 ? 'text' : 'password'"
                      color="#FFA726"
                     
                      outlined
                      dense
                      required
                    >
                    
                    </v-text-field>

                    <v-alert
                      dense
                      text
                      type="error"
                    
                      v-if="wrongpass"
                      >Wrong password or username</v-alert
                    >

                    <v-btn
                      v-if="!isLoading"
                      color="#FFA726"
                      dark
                      class="mr-4 menu"
                      block
                      elevation="0"
                      type="submit"
                      >Sign in
                    </v-btn>
                    <v-progress-circular indeterminate v-else color="#FFA726">
                    </v-progress-circular>
                    <p class="mt-3">
                      Forgot password?
                      <a style="text-decoration: none; color: #FFA726"
                        >Inform administrator.</a
                      >
                    </p>
                  </v-card-text>
                </v-card>
              </div>
            </v-row>
          </v-form>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    show1: false,
    isLoading: false,
    wrongpass: false,
    user: {
      username: null,
      password: null,
    },
  }),
  methods: {
    onLogin() {
      this.isLoading = true;

      let url = window.base_url + "auth/login";
      let formData = new FormData();
      formData.append("email", this.user.username);
      formData.append("password", this.user.password);
      this.$axios
        .post(url, formData)
        .then((response) => {
          if (response.data.success) {
            
            this.wrongpass = false;
            localStorage.setItem("token", response.data.payload["accessToken"]);
            localStorage.setItem("loged_name", response.data.payload["user"]["name"]);
            
            localStorage.setItem("loged_in", "true");
            this.isLoading = false;
            //this.$router.push("sales-panel").catch((e) => {});
            this.$router.push("admin-dashboard").catch((e) => {});
          }
          else{
            this.wrongpass = true;
            this.isLoading = false;
          }
           
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },
  },
  created() {
    // if (localStorage.getItem("loged_in") == "true") {
    //   if (localStorage.getItem("role") == 2)
    //     this.$router.push("reception").catch((e) => {});
    //   else if (localStorage.getItem("role") == 6)
    //     this.$router.push("pharmacy").catch((e) => {});
    //   else if (localStorage.getItem("role") == 4)
    //     this.$router.push("doctor").catch((e) => {});
    //   else if (localStorage.getItem("role") == 3)
    //     this.$router.push("cashier").catch((e) => {});
    //     else if (localStorage.getItem("role") == 1)
    //     this.$router.push("admin").catch((e) => {});
    // } else {
    //    this.$router.push("/").catch((e) => {});
    // }
  },
};
</script>

<style scoped>
.main {
  background-image: url("/assets/images/background/background.jpg");
  background-size: cover;
  filter: blur(2px);
  -webkit-filter: blur(2px);
  height: 100%;
  position: relative;
  /*box-shadow: inset 0 0 0 1000px rgba(144,19,254,0.5);

/* 
 background: rgb(176,113,238);
background: radial-gradient(circle, rgba(176,113,238,0.49343487394957986) 0%, rgba(144,19,254,1) 60%); */
}
.login {
  position: absolute;
  top: 20%;
}

.menu {
  text-transform: none !important;
  
}
</style>