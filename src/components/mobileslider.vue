<template>
  <div>
    <div class="item_wrap">
    <div class="item">
      <a href="#">
        <img src="static/t1.jpg"/>
        <div class="mask"></div>
      </a>
    </div>

    <div class="item">
      <a href="#">
        <img src="static/t1.jpg"/>
        <div class="mask"></div>
      </a>
    </div>

    <div class="item">
      <a href="#">
        <img src="static/t2.jpg"/>
        <div class="mask"></div>
      </a>
    </div>
  </div>
  </div>
</template>

<script>
</script>

<style scoped>
.item_wrap{
  width:1000%;
  overflow: hidden;
}
.item_wrap::after{
  content: "";
  display: block;
  clear: both;
}
.item{
  float:left;
   width:8%;
   margin-left: 0.2%;
   margin-right:0.2%;
}
.item img{
  max-width: 100%;
}
.item>a{
  display: inline-block;
  position: relative;
}
.mask{
   width:100%;
   height:100%;
   position:absolute;
   left:0px;
   top:0px;
}
</style>
