<template>
  <div class="carouseladd-wrap">
    <div>
      <span class="secondtitle">修改幻灯片</span>
      <div class="head-button">
      <mu-raised-button  label="保存" type="submit" form="carouseledit" backgroundColor="blue" style="vertical-align:middle;"/>
      <mu-raised-button  label="取消" href="#/adminhome/carousel" backgroundColor="rgb(180,180,180)" style="vertical-align:middle;"/>
     </div>
    </div>
    <form :action="editurl" id="carouseledit" method="post" enctype="multipart/form-data">
      <mu-text-field label="标题" name="title" :fullWidth="true"  :value="carouselinfos.title" labelFloat/><br/>
      <mu-text-field label="副标题" name="stitle" :fullWidth="true" :value="carouselinfos.stitle" labelFloat/><br/>
      <mu-text-field label="链接" name="link" :fullWidth="true" :value="carouselinfos.link" labelFloat/><br/>
      <input type="file" name="file"/><br/>
    </form>
  </div>
</template>

<script>
export default{
  name:"carouseladd",
  props:['carouselinfos'],
  data:function (){
    return {
    }
  },
  computed:{
    editurl:function(){
      return "http://easyhome.applinzi.com/public/index.php/admin/carouselcontroll/edit/num/"+this.$route.params.num;
    }
  },
  methods:{

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
