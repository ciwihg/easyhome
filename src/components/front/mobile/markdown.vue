<template>
  <div class="wrap">
    <div class="head" @click="Ehhclick">{{head}}</div>
    <div class="content" ref="content">
    <div class="slot" ref="slot">
    <slot></slot>
  </div>
   </div>
  </div>
</template>

<script>
export default{
  name:'markdown',
  props:['head'],
  data:function(){
    return {
      oheight:0
    }
  },
  mounted:function(){
    this.oheight=this.$refs.content.offsetHeight+'px';
    this.$refs.content.style.height="0px";
  },
  methods:{
    Ehhclick:function(){
      (this.$refs.content.style.height=='0px')?(this.$refs.content.style.height=this.oheight,this.$refs.slot.style.opacity=1,this.$refs.slot.style.top="0px"):(this.$refs.content.style.height="0px",
       this.$refs.slot.style.opacity=0,this.$refs.slot.style.top="50px")
    }
  }
}
</script>

<style scoped>
.wrap{
  background-color: white;
}
.content{
  overflow: hidden;
  transition: height 500ms cubic-bezier(0.25,0.46,0.45,0.94);
}
.slot{
  position: relative;
  opacity: 0;
  top:50px;
  transition: all 400ms cubic-bezier(0.25,0.46,0.45,0.94);
}
.head{
  padding: 10px 15px;
  color: white;
  font-size: 20px;
  background-color: #ff4081;
}
</style>
