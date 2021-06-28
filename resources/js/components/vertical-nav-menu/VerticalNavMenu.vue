<template>
  <v-navigation-drawer app v-model="drawer"  light >
   <!-- <div align="right"> <v-app-bar-nav-icon color="#FFA726" @click.stop="drawer = !drawer" /></div> -->
      <v-row class="mt-10">
        <v-card-text>
          <h2 style="text-align: center; color: #ffa726">Sales</h2>
        </v-card-text>
      </v-row>
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
            @click="sales()"
            :color="hover ? '#FFA726' :active_button=='sales'?'#FFA726': 'white'"
          >
            <span :style="{ color: hover ? 'white' :active_button=='sales'?'white': '#FFA726' }"> Sale</span
            ><v-spacer></v-spacer
          ></v-btn>
        </v-hover>
      
        <v-hover v-slot="{ hover }">
          <v-btn
            class="menu mb-5"
            rounded
            :style="{
              boxShadow: hover ? '0px 0px 8px #778899' : '0px 0px 8px #FFA726',
            }"
            block
            @click="inventory()"
            :color="hover ? '#FFA726' :active_button=='inventory'?'#FFA726': 'white'"
          >
            <span :style="{ color: hover ? 'white' :active_button=='inventory'?'white': '#FFA726' }"> Products Inventory</span
            ><v-spacer></v-spacer
          ></v-btn>
        </v-hover>
   
     
        <v-hover v-slot="{ hover }">
          <v-btn
            class="menu mb-5"
            rounded
            :style="{
              boxShadow: hover ? '0px 0px 8px #778899' : '0px 0px 8px #FFA726',
            }"
            block
            @click="report()"
            :color="hover ? '#FFA726' :active_button=='report'?'#FFA726': 'white'"
          >
            <span :style="{ color: hover ? 'white' :active_button=='report'?'white': '#FFA726' }"> Reports</span
            ><v-spacer></v-spacer
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'report' ? 'white' : '#FFA726'
            "
            v-if="reportmanage"
            >mdi-chevron-up</v-icon
          ><v-icon
            :color="
              hover ? 'white' : active_button == 'report' ? 'white' : '#FFA726'
            "
            v-else
            >mdi-chevron-down</v-icon
          ></v-btn>
        </v-hover>
           <transition name="slide-fade">
        <v-row v-if="reportmanage" justify="center" class="mb-4">
          <v-card width="90%" elevation="0" tile>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="salesReport"
              >Sales Report<v-spacer></v-spacer
            ></v-btn>
            <v-btn
              tile
              block
              elevation="0"
              light
              color="#FFA726"
              text
              class="menu"
              @click="inventoryReport"
              >Inventory Report <v-spacer></v-spacer
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
data:()=>({
drawer:true,
reportmanage:false,
expensemanage:false,

}),
props:{
active_button:String
},
methods:{
  sales(){
    
    this.$router.push("sales-panel").catch((e) => {});
  },
  inventory(){
   
    this.$router.push("product-inventory").catch((e) => {});
  },
  createExpense(){
this.$router.push("user-record-expenses").catch((e) => {});


  },
  expensesReport(){

  },
  expences(){
    this.expensemanage = !this.expensemanage;
  },
  report(){
    this.reportmanage = !this.reportmanage;
    
  },
  

  salesReport(){
    this.$router.push("sales-report-panel").catch((e) => {});
  },

  inventoryReport(){
this.$router.push("inventory-report-panel").catch((e) => {});
  }


}


}
</script>

<style scoped>
.menu {
  text-transform: none !important;
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