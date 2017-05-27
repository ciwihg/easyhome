<template>
<div>
  <div class="header">
    <span class="logotext">EasyHome</span>
    <form class="searchbox">
    <div style="height:100%">
    <input class="search_text" type="text"/><button type="submit" value="" class="search_btn"></button>
    </div>
    </form>
    <div  class="header_right"style="display:inline-block; float:right; height:100%;">
    <span class="more">
    </span>
    <span class="user">
      C
    </span>
   </div>
  </div>
  <m-slider :datas="tdatas"></m-slider>
</div>
</template>

<script>
import slidbanner from '@/components/slidbanner'
export default{
  name:"slider",
  components:{
    "m-slider":slidbanner
  },
  data:function(){
    return {
      tdatas:[
        {src:"static/t1.jpg",
         title:"细节图1"},
         {src:"static/t2.jpg",
          title:"细节图2"},
          {src:"static/t3.jpg",
           title:"细节图3"},
           {src:"static/t4.jpg",
            title:"细节图4"},
            {src:"static/t5.jpg",
             title:"细节图5"},
             {src:"static/t6.jpg",
              title:"细节图6"},
              {src:"static/t7.jpg",
               title:"细节图7"},
               {src:"static/t8.jpg",
                title:"细节图8"}
    ]

    }
  }
}
</script>

<style scoped>
.header{
  width:100%;
  height:60px;
  background-color: #ede7f6;
}
.header::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.logotext{
  font-size: 27px;
  margin-left: 10px;
  color:rgb(111,111,111);
  vertical-align: middle;
}
.searchbox{
  display: inline-block;
  vertical-align: middle;
  margin-left: 40px;
}
.search_text{
  height:30px;
  vertical-align: middle;
  width:590px;
  border:1px solid rgb(205,205,205);
}
.search_text:focus{
  outline:none;
  border: #7c4dff solid 1px;
}
.search_btn{
  height:30px;
  width:60px;
  vertical-align: middle;
  border: none;
  background-color: #7c4dff;
}
.more{
    display: inline-block;
    width:16px;
    height:16px;
    background-color: rgb(109,109,109);
    vertical-align: middle;
    margin-right: 30px;
}
.user{
  display: inline-block;
  width:32px;
  height:32px;
  border-radius: 50%;
  background-color: #2196f3;
  color:white;
  vertical-align: middle;
  text-align: center;
  line-height: 32px;
  margin-right: 30px;
}
.header_right::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>
