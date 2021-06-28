<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Author: Charden daxicen
========================================================================================== -->

<template>
  <div>
    <vs-prompt
      @cancel="clearValMultiple"
      @accept="acceptAlert"
      @close="close"
      :is-valid="validName"
      :active.sync="activePrompt2">
      <div class="con-exemple-prompt">
        Enter your first and last name to <b>continue</b>.
        <vs-input placeholder="Name" v-model="valMultipe.value1" class="mt-4 mb-2 w-full" />
        <vs-input placeholder="Last Name" v-model="valMultipe.value2" class="w-full" />

        <vs-alert :vs-active="!validName" color="danger" vs-icon="new_releases" >
          Fields can not be empty please enter the data
        </vs-alert>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  data(){
    return {
      activePrompt:false,
      activePrompt2:false,
      val:'',
      valMultipe:{
        value1:'',
        value2:''
      },
    }
  },
  computed:{
    validName(){
      return (this.valMultipe.value1.length > 0 && this.valMultipe.value2.length > 0)
    }
  },
  methods:{
    acceptAlert(){
      this.$vs.notify({
        color:'success',
        title:'Accept Selected',
        text:'Lorem ipsum dolor sit amet, consectetur'
      })
    },
    close(){
      this.$vs.notify({
        color:'danger',
        title:'Closed',
        text:'You close a dialog!'
      })
    },
    clearValMultiple() {
      this.valMultipe.value1 = "";
      this.valMultipe.value2 = "";
    }
  }
}
</script>

