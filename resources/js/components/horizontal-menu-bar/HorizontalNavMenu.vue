<template>
  <v-app-bar
    
    light
    elevation="1"
    color="white"
    clipped-right
    app
   
  >
    <v-spacer></v-spacer>
    <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-bind="attrs"
          v-on="on"
          size="35"
          style="margin: 10px; background-color: white"
          ><img :src="profile_photo" />
        </v-avatar>
      </template>
      <v-list dense nav>
        <p style="color: #ffa726; text-align: center" class="pt-2">{{ user_name }}</p>
        <v-divider ></v-divider>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon color="#FFA726">mdi-saw-blade</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="color: #ffa726"
              >Account Settings</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link @click="signOut">
          <v-list-item-icon>
            <v-icon color="#FFA726">mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="color: #ffa726"
              >Sign out</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    component: null,
    profile_photo: 'assets/images/profiles/profile.png',
    user_name: null,
  }),
  methods:{
    signOut(){
      this.$router.push("/").catch((e) => {});
    }
  },
  created() {
    if (localStorage.getItem("loged_in") == "true") {
      this.user_name = localStorage.getItem("loged_name");
    }
  },
};
</script>

<style scoped>
.menu {
  text-transform: none !important;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
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