<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">

      <vs-button  :to="{ name: 'config-access-user-details', params: { userId: this.params.data.id  }}"   type="flat"   >
         View
      </vs-button>
    </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  data () {

  },
  methods: {
    openUserDetails () {
      console.log(JSON.stringify(this.params.data));
      //this.$router.push(`/config/access/user?userId=5`).catch(() => {})
    }
  }
}
</script>
