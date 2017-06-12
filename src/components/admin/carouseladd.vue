<template>
  <div class="carouseladd-wrap">
    <div>
      <span class="secondtitle">添加幻灯片</span>
      <div class="head-button">
      <mu-raised-button  label="保存" type="submit" form="carouseladd" backgroundColor="blue" style="vertical-align:middle;"/>
      <mu-raised-button  label="取消" href="#/adminhome/carousel" backgroundColor="rgb(180,180,180)" style="vertical-align:middle;"/>
     </div>
    </div>
    <form action="http://easyhome.applinzi.com/public/index.php/admin/carouselcontroll/add" id="carouseladd" method="post" enctype="multipart/form-data">
      <mu-text-field label="标题" name="title" :fullWidth="true" labelFloat/><br/>
      <mu-text-field label="副标题" name="stitle" :fullWidth="true" labelFloat/><br/>
      <mu-text-field label="链接" name="link" :fullWidth="true" labelFloat/><br/>
      <a href="javascript:;" class="upload-btn">
        <input type="file" name="file"/>
        选择图片
      </a>
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
.upload-btn{
  display:block;
  position: relative;
  text-align: center;
  width:100px;
  height: 35px;
  line-height: 35px;
  border-radius: 2px;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.5);
  background-color: rgb(33,150,243);
  color: white;
}
.upload-btn input{
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top:0px;
  left: 0px;
  cursor: pointer !important;
}
</style>
