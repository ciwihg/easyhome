<template>
  <div class="wraper">
    <div class="head_active_wrap">
      <div class="head_active" v-for="(data,index) in datas" :style="{backgroundColor:data.color}" :ref="'he'+index">
        <a href="#">
        <div class="itemhead" :style="{backgroundColor:data.color}"></div>
        <span>{{data.content}}</span>
        </a>
      </div>

    </div>
    <div class="sub_wrap" :style="{height:cheight}">


        <div class="sub_slidbar" :style="{height:cheight}" @mouseenter="hsh">&lt;</div>


        <ul class="nav_ul nav_ul_n" ref="navul" @transitionend="hre" >
          <li class="nav_item" :ref="'li'+(index+1)" :index="index+2" v-for="(data,index) in listdatas" @click="t" @mouseenter="hcolorc" @mouseleave="ehcolorc" hstatus="0">
            <a href="#" :index="index+2">
            <div class="itemhead" :index="index+2" :style="{backgroundColor:data.color}"></div>
            <span :index="index+2">{{data.content}}</span>
            </a>
          </li>

          <li class="nav_item" :ref="'li'+0" index="1" @click="t" @mouseenter="hcolorc" @mouseleave="ehcolorc">
            <a href="#" index="1">
            <div class="itemhead" index="1" :style="{backgroundColor:datas[0].color}"></div>
            <span index="1">{{datas[0].content}}</span>
            </a>
          </li>
        </ul>





      <ul class="sub_menu" v-for="(data,index) in listdatas" :ref="'submenu'+index">
        <li v-for="item in data.submenu"><a href="#">{{item.content}}</a></li>
      </ul>


  </div>
  </div>
</template>

<script>
export default{
  name:"stacknavbar",
  props:["color","width","datas"],
  data:function(){
    return{
      active:0,
      lastactive:1,
      heads:[],
      lis:[],
      submenus:[]
    }
  },
  computed:{
    cheight:function(){
      return 50*this.datas.length+"px";
    },
    listdatas:function(){
      var listdata=this.datas.slice();
         listdata.shift();
      return listdata;
    }
  },
  methods:{
    t:function(e){
      this.heads[this.lastactive-1].style.display="none";//头部条变空白
      this.active=parseInt(e.target.getAttribute("index"));//获取激活栏目的索引
      for(var i=0;i<this.lis.length;i++){   //只显示激活栏目
        if(i==(this.active-1)){
          this.lis[i].setAttribute("hstatus","1");
          this.lis[i].style.backgroundColor=this.datas[this.active-1].color; //强制hover样式
          this.lis[i].className="nav_item nav_itemfh";
          this.$refs.navul.className="nav_ul nav_ul_fh";
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
        this.submenus[this.lastactive-2].style.display="none";
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
            this.lis[i].style.backgroundColor="white";
            this.lis[i].setAttribute("hstatus","0");
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
  },
  hcolorc:function(e){
    var index=parseInt(e.target.getAttribute("index"));
    e.target.style.backgroundColor=this.datas[index-1].color;
  },
  ehcolorc:function(e){
    var status=e.target.getAttribute("hstatus");
    (status=="0")&&(e.target.style.backgroundColor="white")
  }
  },
  mounted: function() {

    for(var i=0; i<this.datas.length;i++){
      this.heads[i]=this.$refs["he"+i][0];
      this.lis[i]=this.$refs["li"+i][0]?this.$refs["li"+i][0]:this.$refs["li"+i];
      this.submenus[i]=this.$refs["submenu"+i]?this.$refs["submenu"+i][0]:this.$refs["submenu"+i];
    }
  //  this.lis=[this.$refs.li1,this.$refs.li2,this.$refs.li3,this.$refs.li4,this.$refs.li5,this.$refs.li6];
  //  this.heads=[this.$refs.h1,this.$refs.h2,this.$refs.h3,this.$refs.h4,this.$refs.h5,this.$refs.h6];
  //this.submenus=[this.$refs.submenu2,this.$refs.submenu3,this.$refs.submenu4,this.$refs.submenu5,this.$refs.submenu6];
      this.heads[0].style.display="block";
     this.lis[0].style.display="none";
    this.$refs.navul.className="nav_ul nav_ul_n nav_ul_ostatus";
  }
}
</script>

<style scoped>
.sub_wrap{
  position:relative;
  background-color:rgb(245,245,245);
  width:100%;
}
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
.nav_ul_fh{
    left:0px !important;
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

.nav_item:hover a span{
  color:white;
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
   height:250px;
   background-color:white;
   font-size: 15px;
   font-weight: bold;
   text-align: center;
   vertical-align: top;
   line-height: 250px;
   float:left;
}
.sub_slidbar:hover+.nav_ul_n{
  left: 0px ;

}
</style>
