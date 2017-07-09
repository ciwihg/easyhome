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
    <div class="loginbtn" @click="openlogin">
      登录
    </div>
   </div>
 </div>
<div style="background-color:rgb(238,238,238);">
<div :class="{'navfixed':navfix}" style="z-index:2;">
    <m-navbar  style="vertical-align:top;" :datas="navdatas"></m-navbar>
</div>
<div style="margin-left:200px; position:relative;top:-250px;">
  <div :class="{'pagenavbar':pnav,'pnavfixed':!pnav}"></div>
  <div :class="{'hiddenbar':pnav,'shiddenbar':!pnav}"></div>
   <router-view></router-view>
</div>

</div>
<div class="whitemask" v-if="maskon">
  <mu-paper class="loginwrap">
    <mu-text-field label="帐号" name="userid"  labelFloat/><br/>
    <mu-text-field label="密码" type="password" name="password" labelFloat/><br/>
    <mu-flat-button primary label="登录" />
    <mu-flat-button primary label="取消"/>
  </mu-paper>
</div>
</div>
</template>

<script>
import slidbanner from '@/components/front/pc/slidbanner'
import stacknavbar from '@/components/front/pc/stacknavbar'
import goodp from '@/components/front/pc/goodp'
export default{
  name:"slider",
  components:{
    "m-slider":slidbanner,
    "m-navbar":stacknavbar,
    "m-goodrow":goodp
  },
  data:function(){
    return {
      pnav:true,
      navfix:false,
      maskon:false,
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
       {content:"横潭大街32号",
       link:""},
       {content:"朝阳巷5号",
       link:""}
     ]
    },
    {content:"一房一厅",
     color:"rgb(239,108,0)",
     link:"",
     submenu:[
       {content:"横潭大街32号",
       link:""},
       {content:"朝阳巷5号",
       link:""}
     ]
    },

    {content:"单房",
     color:"rgb(3,155,229)",
     link:"",
     submenu:[
       {content:"横潭大街32号",
       link:""},
       {content:"朝阳巷5号",
       link:""}
     ]
    },
    {content:"其他",
     color:"rgb(83,109,254)",
     link:"",
     submenu:[
       {content:"横潭大街32号",
       link:""},
       {content:"朝阳巷5号",
       link:""},
       {content:"横潭市场",
       link:""}
     ]
    }
  ]

    }
  },
  created: function created() {
    var reg=/Mobile/;
    var device=navigator.userAgent;
    if(device.search(reg)!=-1){
      this.$router.push({name:'mhome'});
    }else{
      var that=this;
      document.addEventListener("scroll",function(){
        (document.body.scrollTop>=60)?(that.navfix=true,that.pnav=false):(that.navfix=false,that.pnav=true)
    });
    }
  },
  methods:{
     openlogin:function(){
       this.maskon=true;
       document.body.style.overflow='hidden';
       document.all[0].style.overflow='hidden';
     }
  }
}
</script>

<style scoped>
.header{
  width:100%;
  height:60px;
  background-color: rgb(238,238,238);
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
.loginbtn{
  display: inline-block;
  width:55px;
  height:32px;
  border-radius: 2px;
  background-color: #2196f3;
  color:white;
  vertical-align: middle;
  text-align: center;
  line-height: 32px;
  margin-right: 30px;
  cursor: pointer;
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
  background-color: rgb(238,238,238);
}
.navbar{
  position: absolute !important;
  left: 0px;
  top:0px;
}

.navfixed{
  position: fixed;
  left:0px;
  top:0px;

}
.pnavfixed{
  position: fixed;
  top:0px;
  height: 50px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0,0,0,.2);
  width: 100%;
  z-index: 2;
}
.pagenavbar{
  height: 50px;
  background-color: white;
}
.hiddenbar{
  height: 0px;
}
.shiddenbar{
  height: 300px;
}
.whitemask{
  position: fixed;
  left: 0;
  right:0;
  top:0;
  bottom:0;
  z-index: 1;
  background-color: rgb(238,238,238);
  text-align: center;
}
.whitemask::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.loginwrap{
  width:25%;
  min-width: 320px;
  display: inline-block;
  vertical-align: middle;
}
</style>
