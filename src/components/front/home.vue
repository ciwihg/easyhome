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

  <div class="nb_wrap">
    <m-navbar class="navbar" :color="color" :datas="navdatas"></m-navbar>
    <div style="margin-left:200px; background-color:white;">
     <m-slider :datas="tdatas"  class="banner"></m-slider>
   </div>
  </div>

  <div style="background-color:#ede7f6; height:100%; width:80%; overflow:hidden; height:300px;">
    <div>
      <span style="font-size:23px;">最近出租</span>
    </div>
    <div class="item" v-for="n in 10">
      <a href="#" >
      <img src="static/img.jpg"/>
      <div class="mask"></div>
      </a>
      <div style="padding:10px 12px; background-color:white;">
      <span style="line-height:1;font-size:18px; color:rgb(72,72,72); ">301房</span></br>
      <span style="line-height:1; font-size:14px; color:rgb(133,133,133);">朝阳巷5号</span>
      <div style="margin-top:25px;">
        <i class="material-icons iconsize">star</i>
        <i class="material-icons iconsize">star</i>
        <i class="material-icons iconsize">star</i>
        <i class="material-icons iconsize">star</i>
        <i class="material-icons iconsize">star</i>
        <span style="float:right; display:inline-block; line-height:1; color:#ff5722;">光线</span>
      </div>
      </div>
     </div>


  </div>
</div>
</template>

<script>
import slidbanner from '@/components/slidbanner'
import stacknavbar from '@/components/stacknavbar'
export default{
  name:"slider",
  components:{
    "m-slider":slidbanner,
    "m-navbar":stacknavbar
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
    ],
    color:["rgb(68,68,68)",
    "rgb(104,159,56)",
    "rgb(237,59,59)",
    "rgb(239,108,0)",
    "rgb(3,155,229)",
    "rgb(83,109,254)"
  ],
  navdatas:[
    {content:"首页",
     color:"rgb(68,68,68)",
     link:"",
     submenu:[
     ]
    },
    {content:"二房一厅",
     color:"rgb(104,159,56)",
     link:"",
     submenu:[
       {content:"最新出租",
       link:""},
       {content:"特价出租",
       link:""},
       {content:"热销户型",
       link:""}
     ]
    },
    {content:"一房一厅",
     color:"rgb(237,59,59)",
     link:"",
     submenu:[
       {content:"最新出租",
       link:""},
       {content:"特价出租",
       link:""},
       {content:"热销户型",
       link:""}
     ]
    },

    {content:"优惠活动",
     color:"rgb(3,155,229)",
     link:"",
     submenu:[
       {content:"最新出租",
       link:""},
       {content:"特价出租",
       link:""},
       {content:"热销户型",
       link:""}
     ]
    },
    {content:"促销活动",
     color:"rgb(0,155,29)",
     link:"",
     submenu:[
       {content:"最新出租",
       link:""},
       {content:"特价出租",
       link:""},
       {content:"热销户型",
       link:""}
     ]
    },
    {content:"测试",
     color:"rgb(0,15,29)",
     link:"",
     submenu:[
       {content:"测试1",
       link:""},
       {content:"测试2",
       link:""},
       {content:"测试3",
       link:""}
     ]
    }
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
.nb_wrap{
  position: relative;
  padding-top: 50px;
  background-color: #ede7f6;
}
.navbar{
  position: absolute !important;
  left: 0px;
  top:0px;
}
.banner{

}
.iconsize{
  font-size: 10px;
  color:rgb(115,115,115);
}
.item{
  display:inline-block;
  width:160px;
  margin-left:10px;
  line-height:0;box-shadow:0px 2px 4px rgba(0,0,0,0.1);
  float:left;
}
.item>a{
  display:inline-block;
  position: relative;
}
.mask{
  position: absolute;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
  opacity: 0;
  transition: opacity 400ms cubic-bezier(0.25,0.46,0.45,0.94);
}
.item:hover .mask{
  background-color: rgba(0,0,0,0.3);
  opacity: 1
}
</style>
