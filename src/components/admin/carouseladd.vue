<template>
  <div class="carouseladd-wrap">
    <div>
      <span class="secondtitle">添加费用项目</span>
      <div class="head-button">
      <mu-raised-button  label="保存" type="submit" form="carouseladd" backgroundColor="blue" style="vertical-align:middle;"/>
      <mu-raised-button  label="取消" href="#/adminhome/carousel" backgroundColor="rgb(180,180,180)" style="vertical-align:middle;"/>
     </div>
    </div>
    <form action="http://easyhome.applinzi.com/public/index.php/admin/carouselcontroll/add" id="carouseladd" method="post" enctype="multipart/form-data">
      <mu-text-field label="标题" name="title" :fullWidth="true" labelFloat/><br/>
      <mu-text-field label="副标题" name="stitle" :fullWidth="true" labelFloat/><br/>
      <mu-text-field label="链接" name="link" :fullWidth="true" labelFloat/><br/>
      <input type="file" name="file" value="选择图片" /><br/>
    </form>
  </div>
</template>

<script>
export default{
  name:"carouseladd",
  data:function (){
    return {

    }
  }
}
</script>

<style scoped>
.carouseladd-wrap{
  padding: 0 10px;
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
