<template>
  <div class="roomaddwrap">

  <div>
    <span class="secondtitle">添加租盘</span>
    <div class="head-button">
    <mu-raised-button  label="保存" type="submit" form="roomform" backgroundColor="blue" style="vertical-align:middle;"/>
    <mu-raised-button  label="取消" href="#/adminhome/room" backgroundColor="rgb(180,180,180)" style="vertical-align:middle;"/>
   </div>
  </div>
  <form id="roomform" action="http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/add" method="POST">
  <mu-text-field label="房号" name="number" fullWidth="true" labelFloat/></br>
  <mu-text-field label="地址" name="address" fullWidth="true" labelFloat/></br>
  <mu-text-field label="租金" name="price" fullWidth="true" labelFloat/></br>
  <mu-text-field label="户型" name="type" fullWidth="true" labelFloat/></br>
  <mu-text-field label="光线" name="sunshine" fullWidth="true" labelFloat/></br>
  <mu-text-field label="按金" name="sub_price" fullWidth="true" labelFloat/>
 </form>
</div>
</template>

<script>
</script>

<style scoped>
.roomaddwrap{
  padding:0px 10px;
}
.secondtitle{
  display: inline-block;
  font-size: 18px;
  margin: 20px 0px;
}
.head-button{
  float:right;
  margin: 15px 10px;
}
</style>
