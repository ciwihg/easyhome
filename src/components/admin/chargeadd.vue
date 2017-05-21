<template>
  <div class="roomaddwrap">

  <div>
    <span class="secondtitle">添加费用项目</span>
    <div class="head-button">
    <mu-raised-button  label="保存" type="submit" form="roomform" backgroundColor="blue" style="vertical-align:middle;"/>
    <mu-raised-button  label="取消" href="#/adminhome/charge" backgroundColor="rgb(180,180,180)" style="vertical-align:middle;"/>
   </div>
  </div>
  <form id="roomform" action="http://easyhome.applinzi.com/public/index.php/admin/chargecontroll/add" method="POST">
  <mu-text-field label="费用项目" name="name" fullWidth="true" labelFloat/></br>
  <mu-text-field label="价格" name="price" fullWidth="true" labelFloat/></br>
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
