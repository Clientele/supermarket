<template lang="html">
  <div class="fill-row-loading">
    <div :class="{'activeLoading':activeLoading}" @click="openLoading(type)" v-for="type in types" :id="[`loading-${type}`]"
         class="vs-con-loading__container loading-example" style="background-color: transparent !important;">
    </div>
  </div>
</template>

<script>
export default {
  data:()=>({
    types:[
      'border'
    ],
    activeLoading:false,
  }),
  mounted(){
    this.types.forEach((type)=>{
      this.$vs.loading({container: `#loading-border`, type});
    })
  },
  methods:{
    openLoading(type){
      this.activeLoading = true
      this.$vs.loading({
        type:type,
      })

    },
  }
}
</script>

<style lang="scss">
.fill-row-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .loading-example {
    width: 120px;
    float: left;
    height: 120px;
     border-radius: 10px;
    margin: 8px;
    transition: all 0.3s ease;
    cursor: pointer;

    h4 {
      z-index: 40000;
      position: relative;
      text-align: center;
      padding: 10px;
    }
    &.activeLoading {
      opacity: 0 !important;
      transform: scale(0.5);
    }
  }
}
</style>
