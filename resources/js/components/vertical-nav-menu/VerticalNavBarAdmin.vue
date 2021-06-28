<template>
  <v-navigation-drawer app v-model="drawer" light>
    <!-- <div align="right"> <v-app-bar-nav-icon color="#FFA726" @click.stop="drawer = !drawer" /></div> -->
    <v-row class="mt-10">
      <v-card-text>
        <h2 style="text-align: center; color: #ffa726">Adminstrator</h2>
      </v-card-text>
    </v-row>
    <v-divider></v-divider>
    <v-col>
      <v-hover v-slot="{ hover }">
        <v-btn
          class="menu"
          rounded
          :style="{
            boxShadow: hover ? '0px 0px 8px #778899' : '0px 0px 8px #FFA726',
          }"
          block
          @click="dashboard()"
          :color="
            hover
              ? '#FFA726'
              : active_button == 'dashboard'
              ? '#FFA726'
              : 'white'
          "
        >
          <span
            :style="{
              color: hover
                ? 'white'
                : active_button == 'dashboard'
                ? 'white'
                : '#FFA726',
            }"
          >
            Dashboard</span
          ><v-spacer></v-spacer
        ></v-btn>
      </v-hover>
    </v-col>
    <v-divider></v-divider>
    <!--Menu Buttons -->
    <v-col>
      <v-hover v-slot="{ hover }">
        <v-btn
          class="menu mb-5"
          rounded
          :style="{
            boxShadow: hover ? '0px 0px 8px #778899' : '0px 0px 8px #FFA726',
          }"
          block
          @click="users()"
          :color="
            hover ? '#FFA726' : active_button == 'users' ? '#FFA726' : 'white'
          "
        >
          <span
            :style="{
              color: hover
                ? 'white'
                : active_button == 'users'
                ? 'white'
                : '#FFA726',
            }"
          >
            User Management</span
          ><v-spacer></v-spacer
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'users' ? 'white' : '#FFA726'
            "
            v-if="usermanage"
            >mdi-chevron-up</v-icon
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'users' ? 'white' : '#FFA726'
            "
            v-else
            >mdi-chevron-down</v-icon
          ></v-btn
        >
      </v-hover>
      <transition name="slide-fade">
        <v-row v-if="usermanage" justify="center" class="mb-4">
          <v-card width="90%" elevation="0" tile>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="registerNewUser()"
              >Register User <v-spacer></v-spacer
            ></v-btn>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="updateUser()"
              >Update User <v-spacer></v-spacer
            ></v-btn>
          </v-card>
        </v-row>
      </transition>
      <v-hover v-slot="{ hover }">
        <v-btn
          class="menu mb-5"
          rounded
          :style="{
            boxShadow: hover ? '0px 0px 8px #778899' : '0px 0px 8px #FFA726',
          }"
          block
          @click="product()"
          :color="
            hover ? '#FFA726' : active_button == 'product' ? '#FFA726' : 'white'
          "
        >
          <span
            :style="{
              color: hover
                ? 'white'
                : active_button == 'product'
                ? 'white'
                : '#FFA726',
            }"
          >
            Product Management</span
          ><v-spacer></v-spacer
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'product' ? 'white' : '#FFA726'
            "
            v-if="productmanage"
            >mdi-chevron-up</v-icon
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'product' ? 'white' : '#FFA726'
            "
            v-else
            >mdi-chevron-down</v-icon
          ></v-btn
        >
      </v-hover>
      <transition name="slide-fade">
        <v-row v-if="productmanage" justify="center" class="mb-4">
          <v-card width="90%" elevation="0" tile>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="addNewProduct"
              >Add New Product<v-spacer></v-spacer
            ></v-btn>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="updateProduct"
              >Update Product <v-spacer></v-spacer
            ></v-btn>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="productCategory"
              >Product Categories <v-spacer></v-spacer
            ></v-btn>
          </v-card>
        </v-row>
      </transition>
      <v-hover v-slot="{ hover }">
        <v-btn
          class="menu mb-5"
          rounded
          :style="{
            boxShadow: hover ? '0px 0px 8px #778899' : '0px 0px 8px #FFA726',
          }"
          block
          @click="branch()"
          :color="
            hover ? '#FFA726' : active_button == 'branch' ? '#FFA726' : 'white'
          "
        >
          <span
            :style="{
              color: hover
                ? 'white'
                : active_button == 'branch'
                ? 'white'
                : '#FFA726',
            }"
          >
            Branch Management</span
          ><v-spacer></v-spacer
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'branch' ? 'white' : '#FFA726'
            "
            v-if="branchmanage"
            >mdi-chevron-up</v-icon
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'branch' ? 'white' : '#FFA726'
            "
            v-else
            >mdi-chevron-down</v-icon
          ></v-btn
        >
      </v-hover>
      <transition name="slide-fade">
        <v-row v-if="branchmanage" justify="center" class="mb-4">
          <v-card width="90%" elevation="0" tile>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="branches"
              >Add New Branch<v-spacer></v-spacer
            ></v-btn>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              >Update Branch <v-spacer></v-spacer
            ></v-btn>
          </v-card>
        </v-row>
      </transition>
       <v-hover v-slot="{ hover }">
          <v-btn
            class="menu mb-5"
            rounded
            :style="{
              boxShadow: hover ? '0px 0px 8px #778899' : '0px 0px 8px #FFA726',
            }"
            block
            @click="expences()"
            :color="hover ? '#FFA726' :active_button=='expenses'?'#FFA726': 'white'"
          >
            <span :style="{ color: hover ? 'white' :active_button=='expenses'?'white': '#FFA726' }"> Expenses</span
            ><v-spacer></v-spacer
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'expenses' ? 'white' : '#FFA726'
            "
            v-if="expensemanage"
            >mdi-chevron-up</v-icon
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'expenses' ? 'white' : '#FFA726'
            "
            v-else
            >mdi-chevron-down</v-icon
          ></v-btn>
        </v-hover>
           <transition name="slide-fade">
        <v-row v-if="expensemanage" justify="center" class="mb-4">
          <v-card width="90%" elevation="0" tile>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="createExpense"
              >Record Expense<v-spacer></v-spacer
            ></v-btn>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="expensesReport"
              >Expenses Report <v-spacer></v-spacer
            ></v-btn>
           
          </v-card>
        </v-row>
      </transition>
    </v-col>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    usermanage: false,
    productmanage: false,
    branchmanage: false,
    expensemanage:false,

  }),
  props: {
    active_button: String,
  },
  methods: {
    users() {
      this.usermanage = !this.usermanage;

      //this.$router.push("users-panel").catch((e) => {});
    },
    product() {
      this.productmanage = !this.productmanage;
    },
    branch() {
      this.branchmanage = !this.branchmanage;
      
    },
    dashboard() {
      this.$router.push("admin-dashboard").catch((e) => {});
    },
    registerNewUser() {
      this.$router.push("add-new-user").catch((e) => {});
    },
    updateUser() {
      this.$router.push("update-user").catch((e) => {});
    },
    addNewProduct() {
      this.$router.push("add-new-product").catch((e) => {});
    },
    updateProduct(){
      this.$router.push("update-product").catch((e) => {});
    },
    productCategory(){
      this.$router.push("product-category").catch((e) => {});
    },
    branches(){
this.$router.push("branches").catch((e) => {});
    },
     createExpense(){
this.$router.push("record-expenses").catch((e) => {});
  },
  expensesReport(){

  },
  expences(){
    this.expensemanage = !this.expensemanage;
  },
  },
  created() {},
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
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
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