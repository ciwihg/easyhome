<template>
  <div class="wraper">
    <div class="head_active_wrap">
      <div class="head_active" v-for="(data,index) in datas" :style="{backgroundColor:data.color}" :ref="'he'+index">
        <a :href="data.link">
        <div class="itemhead" :style="{backgroundColor:data.color,textAlign:'right',paddingRight:'10px'}"><i class="material-icons" style="color:white;line-height:50px;">{{data.icon}}</i></div>
        <span>{{data.content}}</span>
        </a>
      </div>

    </div>
    <div class="sub_wrap" :style="{height:cheight}">


        <div class="sub_slidbar" :style="{height:cheight}" @mouseenter="hsh">&lt;</div>


        <ul class="nav_ul nav_ul_n" ref="navul" @transitionend="hre" >
          <li class="nav_item" :class="{'hidden':hidden}" :ref="'li'+(index+1)" :index="index+2" v-for="(data,index) in listdatas" @click="t" @mouseenter="hcolorc" @mouseleave="ehcolorc" hstatus="0">
            <a :href="data.link" :index="index+2">
            <div class="itemhead" :index="index+2" :style="{backgroundColor:data.color,textAlign:'right',paddingRight:'10px'}"><i  :index="index+2" class="material-icons" style="color:white;line-height:50px;">{{data.icon}}</i></div>
            <span :index="index+2">{{data.content}}</span>
            </a>
          </li>

          <li class="nav_item" :class="{'hidden':hidden}" :ref="'li'+0" index="1" @click="t" @mouseenter="hcolorc" @mouseleave="ehcolorc" hstatus="0">
            <a href="#" index="1">
            <div class="itemhead" index="1" :style="{backgroundColor:datas[0].color,textAlign:'right',paddingRight:'10px'}"><i class="material-icons" index="1" style="color:white;line-height:50px;">{{datas[0].icon}}</i></div>
            <span index="1">{{datas[0].content}}</span>
            </a>
          </li>
        </ul>





      <ul class="sub_menu" v-for="(data,index) in listdatas" :ref="'submenu'+index">
        <li v-for="item in data.submenu" @click="submclick"><a :href="item.link">{{item.content}}</a></li>
      </ul>


  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default{
  name:"stacknavbar",
  props:["color","width","datas","typeindex"],
  data:function(){
    return{
      active:0,
      lastactive:1,
      heads:[],
      lis:[],
      submenus:[],
      lastsubitem:null,
      ver:true,
      stabar:{},
      hidden:false
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
    },
    ...mapState(
      {
        navindex:state => state.active,
        typemap:state => state.typemap
      }
  )
  },
  methods:{
    t:function(e){
      this.$emit("itemclick");
      this.stabar.tolistitem(parseInt(e.target.getAttribute("index")));

    },
    hre:function(e){
     if(e.propertyName=="top"){
       this.stabar.displayhead(this.stabar.active);
       this.stabar.hidelistitem(this.stabar.active);
       (this.stabar.active==1)?this.stabar.showlist():this.stabar.hidelist()
       this.stabar.showsubmenu(this.stabar.active);
       this.stabar.lastactive=this.stabar.active;
      }
    },
  hsh:function(e){
    this.$refs.navul.style.transition="all .5s"; //开启过渡效果
    this.$refs.navul.className="nav_ul nav_ul_n";//应用hover弹出样式
  },
  hcolorc:function(e){
    var index=parseInt(e.target.getAttribute("index"));
    e.target.style.backgroundColor=this.datas[index-1].color;
    e.target.getElementsByTagName("span")[0].style.color="white";
  },
  ehcolorc:function(e){
    var status=e.target.getAttribute("hstatus");
    (status=="0")&&(e.target.style.backgroundColor="white",e.target.getElementsByTagName("span")[0].style.color="black")
  },
  submclick:function(e){
    if(this.lastsubitem){
      this.lastsubitem.style.color="";
    }
    var address;
    switch(e.target.nodeName){
      case "A":e.target.style.color=this.datas[this.stabar.active-1].color;address=e.target.innerHTML;this.lastsubitem=e.target;break;
      case "LI":e.target.firstElementChild.style.color=this.datas[this.stabar.active-1].color;address=e.target.firstElementChild.innerHTML;this.lastsubitem=e.target.firstElementChild;break;
    }
    this.ver=!this.ver;
    this.$emit("smenuclick",address+this.ver);
  }
  },
  created:function(){
    this.$watch(function(){
     return  this.navindex;
    },function(n,o){
      if (this.stabar.active!=this.navindex) {
        this.stabar.active=this.navindex;
        this.stabar.tolistitem(this.navindex);
      }

    });

    this.$watch(function(){
     return  this.datas;
    },function(n,o){
      this.$nextTick(function () {
        this.stabar.init();
       (this.stabar.lastactive==6)?(this.stabar.setstartstatus()):(this.stabar.showsubmenu(this.stabar.active))

      })
  });

  },
  mounted: function() {
   function stacknavbar(vuecomponent){
      this.vuecomponent=vuecomponent;
      this.active=0;
      this.lastactive=1;
      this.heads=[];
      this.lis=[];
      this.submenus=[];
      var vthis=this.vuecomponent;

      this.init=function(){
        for(var i=0; i<vthis.datas.length;i++){
          this.heads[i]=vthis.$refs["he"+i][0];
          this.lis[i]=vthis.$refs["li"+i][0]?vthis.$refs["li"+i][0]:vthis.$refs["li"+i];
          this.submenus[i]=vthis.$refs["submenu"+i]?vthis.$refs["submenu"+i][0]:vthis.$refs["submenu"+i];
        }
      };

      this.setstartstatus=function(){
        this.active=this.lastactive=1;
        this.displayhead(1);
        this.hidelistitem(1);
        this.showlist();
      };


      this.resetlistitem=function(index){
        if(!this.lis[index-1]){return}
        this.lis[index-1].style.backgroundColor="white"; //取消hover时颜色
        this.lis[index-1].getElementsByTagName("span")[0].style.color="black"
        this.lis[index-1].setAttribute("hstatus","0"); //启动hover变色
        this.lis[index-1].style.top="0px";//返回原来的栏目位置
        this.lis[index-1].style.opacity='';
        this.lis[index-1].className="nav_item";// 设置栏目类名
      };


      this.setactivelistitem=function(index){
        if(!this.lis[index-1]){return}
        this.lis[index-1].style.backgroundColor=vthis.datas[index-1].color;
        this.lis[index-1].getElementsByTagName("span")[0].style.color="white";
        this.lis[index-1].setAttribute("hstatus","1");
        this.lis[index-1].className="nav_item nav_itemfh";
        this.lis[index-1].style.opacity="1"; //显示需要向上浮动的栏目
      };


      this.displayhead=function(index){
        this.hidehead(this.lastactive);
        this.heads[index-1].style.display="block"
      };


      this.hidehead=function(index){
        this.heads[index-1].style.display="none";
      };

      this.hidelistitem=function(index){
        this.lis[this.lastactive-1].style.display="block";
        this.lis[index-1].style.display="none"
        this.resetlistitem(index);
        vthis.hidden=false;
      };


      this.showlistitem=function(index){
        this.setactivelistitem(index);
        this.showlist();
        vthis.hidden=true;
      };


      this.flowlistitem=function(index){
        var top;
        if(this.lastactive==1){    //初始状态转换到其他状态
           top=0-(index-1)*50+"px";
        }
        else if(index==1){  //其他状态转换到初始状态

           top=0-(this.lis.length-1)*50+"px";

      }else{ //其他状态之间的转换
           (index>this.lastactive)?(top=0-(index-2)*50+"px"):(top=0-(index-1)*50+"px")

      }
         this.lis[index-1].style.top=top;

      };


      this.showlist=function(){
        vthis.$refs.navul.className="nav_ul nav_ul_ostatus";
      };


      this.hoverlist=function(){
         vthis.$refs.navul.className="nav_ul nav_ul_n";
      };


      this.hidelist=function(){
        vthis.$refs.navul.style.transition="none";
         vthis.$refs.navul.className="nav_ul";
      };


      this.hidesubmenu=function(index) {
          if(index<2){
            return;
          }
          this.submenus[index-2].style.display="none";
          if(vthis.lastsubitem){
              vthis.lastsubitem.style.color="";
          }
          this.submenus[index-2].style.marginTop="35px";
          this.submenus[index-2].style.height="0px";
      };


      this.showsubmenu=function(index){
        if(index<2){
          return;
        }
        this.submenus[index-2].style.display="inline-block";
        this.submenus[index-2].offsetWidth
        this.submenus[index-2].style.marginTop="50px";
        this.submenus[index-2].style.height=(vthis.datas.length-1)*50+"px";
      };


      this.tolistitem=function(index){
         this.active=index;
         vthis.$store.commit('setactive',index);
         this.hidehead(this.lastactive);
         this.hidesubmenu(this.lastactive);
         this.showlistitem(index);
         this.flowlistitem(index);
      };

    };
    this.stabar=new stacknavbar(this);
    this.stabar.init();
    this.stabar.setstartstatus();


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
   background-color:rgb(255,255,255);
   width:200px;
}
.head_active_wrap{
  width:100%;
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
  font-size: 18px;
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
.hidden{
  opacity: 0;
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
  font-size: 18px;
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
  margin-bottom: 0px;
}
.sub_menu>li{
  height: 40px;
  width:175px;
  line-height: 40px;

}
.sub_menu>li>a{
  height: 40px;
  color: rgb(106,108,106);
  font-size: 17px;
  display: inline-block;
  text-indent: 25px;
  width:100%;
  height:100%;
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
