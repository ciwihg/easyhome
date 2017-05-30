<template>
  <div class="wraper">
    <div class="head_active_wrap">
      <div class="head_active" ref="h1">
        <a href="#">
        <div class="itemhead"></div>
        <span>item1</span>
        </a>
      </div>
      <div class="head_active" ref="h2">
        <a href="#">
        <div class="itemhead"></div>
        <span>item2</span>
        </a>
      </div>
      <div class="head_active" ref="h3">
        <a href="#">
        <div class="itemhead"></div>
        <span>item3</span>
        </a>
      </div>
      <div class="head_active" ref="h4">
        <a href="#">
        <div class="itemhead"></div>
        <span>item4</span>
        </a>
      </div>
      <div class="head_active" ref="h5">
        <a href="#">
        <div class="itemhead"></div>
        <span>item5</span>
        </a>
      </div>
      <div class="head_active" ref="h6">
        <a href="#">
        <div class="itemhead"></div>
        <span>item6</span>
        </a>
      </div>
    </div>
    <div style="position:relative; height:300px; background-color:rgb(245,245,245); width:100%;">


      <div class="sub_slidbar" @mouseenter="hsh">&lt;</div>


    <ul class="nav_ul nav_ul_n" ref="navul" @transitionend="hre">
      <li class="nav_item" ref="li2" index="2" @click="t">
        <a href="#" index="2">
        <div class="itemhead" index="2"></div>
        <span index="2">item2</span>
        </a>
      </li>
      <li class="nav_item" ref="li3" index="3" @click="t">
        <a href="#" index="3">
        <div class="itemhead" index="3"></div>
        <span index="3">item3</span>
        </a>
      </li>
      <li class="nav_item" ref="li4" index="4" @click="t" >
        <a href="#" index="4">
        <div class="itemhead" index="4"></div>
        <span index="4">item4</span>
        </a>
      </li>
      <li class="nav_item" ref="li5" index="5" @click="t">
        <a href="#" index="5">
        <div class="itemhead" index="5"></div>
        <span index="5">item5</span>
        </a>
      </li>
      <li class="nav_item" ref="li6" index="6" @click="t" >
        <a index="6" href="#">
        <div class="itemhead" index="6"></div>
        <span index="6">item6</span>
        </a>
      </li>
      <li class="nav_item" ref="li1" index="1" @click="t">
        <a href="#" index="1">
        <div class="itemhead" index="1"></div>
        <span index="1">item1</span>
        </a>
      </li>
    </ul>





    <ul class="sub_menu" ref="submenu2">
      <li><a href="#">我的应用2</a></li>
      <li><a href="#">商店</a></li>
      <li><a href="#">市场</a></li>
    </ul>
    <ul class="sub_menu" ref="submenu3">
      <li><a href="#">我的应用3</a></li>
      <li><a href="#">商店</a></li>
      <li><a href="#">市场</a></li>
    </ul>
    <ul class="sub_menu" ref="submenu4">
      <li><a href="#">我的应用4</a></li>
      <li><a href="#">商店</a></li>
      <li><a href="#">市场</a></li>
    </ul>
    <ul class="sub_menu" ref="submenu5">
      <li><a href="#">我的应用5</a></li>
      <li><a href="#">商店</a></li>
      <li><a href="#">市场</a></li>
    </ul>
    <ul class="sub_menu" ref="submenu6">
      <li><a href="#">我的应用6</a></li>
      <li><a href="#">商店</a></li>
      <li><a href="#">市场</a></li>
    </ul>
  </div>
  </div>
</template>

<script>
export default{
  name:"stacknavbar",
  data:function(){
    return{
      active:0,
      lastactive:1,
      heads:[],
      lis:[],
      submenus:[]
    }
  },
  methods:{
    t:function(e){
      this.heads[this.lastactive-1].style.display="none";//头部条变空白
      this.active=parseInt(e.target.getAttribute("index"));//获取激活栏目的索引
      for(var i=0;i<this.lis.length;i++){   //只显示激活栏目
        if(i==(this.active-1)){
          this.lis[i].className="nav_item nav_itemfh"; //强制hover样式
          this.lis[i].style.opacity="1"; //显示需要向上浮动的栏目
        }else{
          this.lis[i].style.opacity="0";//隐藏其他不需要向上浮动的栏目
        }
      }

      var top;
      if(this.lastactive==1){    //初始状态转换到其他状态
         top=0-(this.active-1)*50+"px";
      }
      else if(this.active==1){  //其他状态转换到初始状态
        this.submenus[this.lastactive-2].style.marginTop="35px";
        this.submenus[this.lastactive-2].style.height="0px";
         top=0-(this.lis.length-1)*50+"px";

    }else{ //其他状态之间的转换

      (this.active>this.lastactive)?(top=0-(this.active-2)*50+"px"):(top=0-(this.active-1)*50+"px")
      this.submenus[this.lastactive-2].style.display="none";
      this.submenus[this.lastactive-2].style.marginTop="35px";
      this.submenus[this.lastactive-2].style.height="0px";
    }
       this.lis[this.active-1].style.top=top; //栏目向上浮动
    },
    hre:function(e){
      if(e.propertyName=="top"){
        for(var i=0;i<this.lis.length;i++){
          if(i==(this.active-1)){
            this.heads[i].style.display="block";
            this.lis[i].style.display="none";
            this.lis[i].style.opacity="1";
          }else{
            this.heads[i].style.display="none";
            this.lis[i].style.display="block";
            this.lis[i].style.opacity="1";
          }
        }
        this.$refs.navul.style.transition="none";
        this.$refs.navul.className="nav_ul";//防止动画完成后再触发侧边栏
        this.lis[this.active-1].style.top="0px";
        this.lis[this.active-1].className="nav_item";
        this.lastactive=this.active;


        if(this.active==1){
          this.$refs.navul.className="nav_ul nav_ul_n nav_ul_ostatus";
        }
        else{
          this.submenus[this.lastactive-2].style.display="inline-block";
          this.submenus[this.active-2].offsetWidth
          this.submenus[this.active-2].style.marginTop="50px";
          this.submenus[this.active-2].style.height="200px";
        }
      }
    },
  hsh:function(e){
    this.$refs.navul.style.transition="all .5s"; //开启过渡效果
    this.$refs.navul.className="nav_ul nav_ul_n";//应用hover弹出样式
  }
  },
  mounted: function() {
    this.lis=[this.$refs.li1,this.$refs.li2,this.$refs.li3,this.$refs.li4,this.$refs.li5,this.$refs.li6];
    this.heads=[this.$refs.h1,this.$refs.h2,this.$refs.h3,this.$refs.h4,this.$refs.h5,this.$refs.h6];
    this.submenus=[this.$refs.submenu2,this.$refs.submenu3,this.$refs.submenu4,this.$refs.submenu5,this.$refs.submenu6];
    this.heads[0].style.display="block";
    this.$refs.li1.style.display="none";
    this.$refs.navul.className="nav_ul nav_ul_n nav_ul_ostatus";
  }
}
</script>

<style scoped>
.wraper{
   box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
   display: inline-block;
   position: relative;
   width:200px;
}
.head_active_wrap{
  width:200px;
  height: 50px;
  position: absolute;
  left: 0px;
  top:0px;
}
.head_active{
  height: 50px;
  width:200px;
  line-height: 50px;
  position: absolute;
  left: 0px;
  top:0px;
  display: none;
  background-color: #9c27b0;
  z-index: 1;
}
.head_active span{
  font-size: 20px;
  display: inline-block;
  height: 50px;
  vertical-align: top;
  color: white;
}
.nav_ul{
  list-style: none;
  padding-left: 0px;
  display: inline-block;
  position:absolute;
  left:-200px;
  top:0px;
  margin: 0px;
  transition:left .5s,opacity .5s;
  height:250px;
  margin-top: 50px;
}

.nav_ul_n:hover{
    left:0px;
}
.nav_ul_ostatus{
  left:0px !important;
}
.nav_item{
  width:200px;
  height:50px;
  line-height: 50px;
  top:0px;
  transition: top .5s cubic-bezier(.98,0,.41,.57);
  position: relative;
  background-color: white;
}
.nav_item:hover{
  background-color: #9c27b0;
}
.nav_item:hover a span{
  color:white;
}
.nav_itemfh{
  background-color: #9c27b0 !important;
}
.nav_itemfh span{
  color:white !important;
}
.nav_item>a,.head_active>a{
  display: inline-block;
  width: 100%;
  height:100%;
}
.nav_item span{
  font-size: 20px;
  display: inline-block;
  height: 50px;
  vertical-align: top;
  color:black;
}
.itemhead{
  width:65px;
  height:100%;
  display: inline-block;
  background-color: #9c27b0;
}
.sub_menu{
  margin-top: 35px;
  display: none;
  list-style: none;
  padding-top: 8px;
  padding-left: 0px;
  margin-left: 0px;
  float:left;
  height: 0px;
  overflow: hidden;
  transition: all .5s;
}
.sub_menu>li{
  height: 40px;
  width:175px;
  line-height: 40px;
  text-indent: 25px;
}
.sub_menu>li>a{
  height: 40px;
  color: rgb(106,108,106);
  font-size: 17px;
}
.sub_menu>li:hover{
  background-color: rgb(233,233,233);
}
.sub_slidbar{
  display:inline-block;
   width:25px;
   height:300px;
   background-color:white;
   font-size: 15px;
   font-weight: bold;
   text-align: center;
   vertical-align: top;
   line-height: 300px;
   float:left;
}
.sub_slidbar:hover+.nav_ul_n{
  left: 0px ;

}
</style>
