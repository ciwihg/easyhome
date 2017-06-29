<template>
  <div class="roomaddwrap">

  <div>
    <span class="secondtitle">修改租盘</span>
    <div class="head-button">
    <mu-raised-button  label="保存" type="submit" form="roomform" backgroundColor="blue" style="vertical-align:middle;"/>
    <mu-raised-button  label="取消" href="#/adminhome/room" backgroundColor="rgb(180,180,180)"  style="vertical-align:middle;"/>
   </div>
  </div>
 <mu-tabs :value="activetab" @change="htabschage">
    <mu-tab value="2" title="租盘信息"/>
    <mu-tab value="4" title="租盘图片"/>
    <mu-tab value="1" title="收费项目"/>
 </mu-tabs>
  <form id="roomform" :action="urlmix" method="POST">
    <div v-show="showinfo">
    <mu-text-field label="房号" name="number" :value="roominfo[0].number" :fullWidth="true" /></br>
    <mu-text-field label="地址" name="address" :value="roominfo[0].address" :fullWidth="true" /></br>
    <mu-text-field label="租金" name="price" :value="roominfo[0].price" :fullWidth="true" /></br>
    <mu-text-field label="户型" name="type" :value="roominfo[0].type" :fullWidth="true" /></br>
    <mu-text-field label="光线" name="sunshine" :value="roominfo[0].sunshine" fullWidth="true" labelFloat/></br>
    <mu-text-field label="按金" name="sub_price" :value="roominfo[0].sub_price" :fullWidth="true" />
   </div>

   <mu-select-field name="chargeitems" v-model="chargeitems" :fullWidth="true" multiple label="选择收费项目" v-show="showchareitem">
    <mu-menu-item :value="citem.id" :title="citem.name" v-for="citem in roominfo[2]"/>
  </mu-select-field>

  <mu-table v-show="showimgs" :showCheckbox="false"  >
    <mu-tbody ref="tbody">
      <mu-tr v-for="(item,index) in imgs">
        <mu-td><img :src="item.src" :index="index" style="width:100px;" @click="selectimg"/></mu-td>
        <mu-td style="text-align:right;">
          <mu-raised-button class="demo-raised-button" label="删除" icon="delete" @click="deleteimg" :index="index" backgroundColor="red"  style="vertical-align:middle;"/>
        </mu-td>
      </mu-tr>
    </mu-tbody>
    <mu-tfoot>
      <mu-tr style="">
        <mu-th></mu-th>
        <mu-th style="text-align:right;">
        <mu-float-button icon="add" mini secondary style="vertical-align:middle;" @click="addimg" />
        </mu-th>
      </mu-tr>
    </mu-tfoot>
  </mu-table>
   <input name="imgs" :value="JSON.stringify(imgs)" style="display:none;" />
 </form>
 <div class="filewindow-wrap" v-if="openwindow">
  <mu-paper class="filewindow" :zDepth="2" >
    <div class="windowtitle">选择图片</div>
     <div class="windowcontent" @click="selecteimg" ref="filewindow">
        <div class="file-imgwrap"v-for="item in roomimgs">
          <div style="width:100px; height:100px; display:inline-block;" class="square">
          <img class="review" :src="item.src" @load="resetimgstyle"/>
        </div>
        </div>
        <div v-if="loading" class="forbitmask"><mu-circular-progress  style="vertical-align:middle;" :size="60" :strokeWidth="5"/></div>
     </div>
     <div style="text-align:right;">
        <a href="javascript:;" class="upload-btn">
           上传<input type="file" name="file" id="file" v-on:change="uploadfile" />
        </a>
       </mu-raised-button>
      <mu-raised-button class="demo-raised-button" label="确认" @click="imgconfirm"  backgroundColor="blue"  />
      <mu-raised-button class="demo-raised-button" label="取消" @click="closewindow"   backgroundColor="rgb(180,180,180)"  />
    </div>
  </mu-paper>
 </div>
</div>
</template>

<script>
export default{
  name:"roomedit",
  data:function(){
     return{
       roominfo:[{}],
       actionurl:"http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/editsave/rid/",
       activetab:"2",
       chargeitems:[],
       imgs:[],//现时所选用的图片集
       openwindow:false,
       selectedimg:{},//文件夹中被选中的图片
       roomimgs:[], //文件夹中图片集
       editimg:0, //被编辑图片的索引
       loading:false
     }
  },
  computed:{
    urlmix:function(){
      return this.actionurl+this.$route.params.rid;
    },
    showinfo:function(){
      return (parseInt(this.activetab)>>1)&1;
    },
    showchareitem:function(){
      return parseInt(this.activetab)&1;
    }
    ,
    showimgs:function(){
      return parseInt(this.activetab>>2)&1;
    }

  },
  created: function() {
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/edit/rid/"+this.$route.params.rid,this.get)
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/getcurrentimgs/rid/"+this.$route.params.rid,this.CbGetcurrentimgs)
  },
  mounted:function(){

  },
  methods:{
    ajax:function(method,url,fun){
      var xhr=new XMLHttpRequest();
      var that=this;
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
          if(xhr.status==200){
            fun(xhr);
          }
          else{
            alert("ajax失败");
          }
        }
      };
      xhr.open(method,url,true);
      if(arguments[3])
      {
        xhr.send(arguments[3]);
      }else{
        xhr.send(null);
      }
    },
    get:function(xhr){
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.roominfo=respon;
      for(var i=0;i<this.roominfo[1].length;i++)
      {
        this.chargeitems.push(this.roominfo[1][i].id);
        console.log(this.chargeitems);
      }
      console.log(respon);
    },
    htabschage:function(v){
      this.activetab=v;
      if(v==4)
      {
        (this.imgs.length==0)&&(this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/getcurrentimgs/rid/"+this.$route.params.rid,this.CbGetcurrentimgs))
      }
    },
    addimg:function(){
      this.imgs.push({
        src:"static/t2.jpg",
      })
    },
    deleteimg:function(e){
    var index=parseInt ( e.target.parentNode.parentNode.getAttribute("index"));
      this.imgs.splice(index,1);
    },
    selectimg:function(e){
      this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/getimgs/rid/"+this.$route.params.rid,this.CbGetimgs);
      this.editimg=parseInt(e.target.getAttribute("index"));
      this.openwindow=true;
    },
    closewindow:function(e){
      this.openwindow=false;
    },
    selecteimg:function(e){
      if(e.target.nodeName==="IMG"||e.target.className==="file-imgwrap"){
        var selecteditem;
        (e.target.className==="file-imgwrap")?(selecteditem=e.target):(selecteditem=e.target.parentNode);
        if(this.selectedimg.style){
          this.selectedimg.style.backgroundColor="";
        }
        selecteditem.style.backgroundColor="rgb(200,200,200)";
        this.selectedimg=selecteditem;
      }

    },
    imgconfirm:function(){
      this.imgs[this.editimg].src=this.selectedimg.firstElementChild.src;
      this.openwindow=false;
    }
    ,
    CbGetimgs:function(xhr){
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.roomimgs=respon;
      //(this.$refs.filewindow.style.height==this.$refs.filewindow.offsetWidth/2+"px")||(this.$refs.filewindow.style.height=this.$refs.filewindow.offsetWidth/2+"px")
    },
    CbReflash:function(xhr){
      this.loading=false;
      this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/getimgs/rid/"+this.$route.params.rid,this.CbGetimgs);
    },
    CbGetcurrentimgs:function(xhr){
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.imgs=respon;
    },
    uploadfile:function(){
      this.loading=true;
      var file=document.getElementById("file").files[0];
      var formdata=new FormData();
      formdata.append("file",file);
      this.ajax("POST","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/get/rid/"+this.$route.params.rid,this.CbReflash,formdata)
    },
    resetimgstyle:function(e){
      (e.target.width<e.target.height)&&(e.target.style.height="100%",e.target.style.width="auto")
    //  e.target.style.opacity=1;
    }
  }
}
</script>

<style scoped>
.roomaddwrap{
  padding:0px 10px;
  position: relative;
  height: 100%;
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
.review{
  vertical-align: bottom;
  cursor: pointer;
  width:100%;

}
.filewindow{
position: relative;
width: 100%;
padding: 15px 15px;
}
.filewindow-wrap{
  display: inline-block;
  position: fixed;
  right: 10px;
  top:50px;
  z-index: 12;
  width:50%;
  min-width: 480px;
}
.windowtitle{
 font-size: 16px;
 border-bottom: 1px solid rgba(0,0,0,.12);
}
.windowcontent{
  background-color: rgb(250,250,250);
}
.windowcontent::after{
  content: "";
  display: block;
  clear: both;
}
.upload-btn{
  line-height: 36px;
  display: inline-block;
  height: 36px;
  width:88px;
  text-align: center;
  color: white;
  background-color: rgb(126,87,194);
  position: relative;
}
.upload-btn input{
  opacity: 0;
  width:100%;
  position: absolute;
  left: 0px;
  top:0px;
  cursor: pointer;
}
.file-imgwrap{
  width:23%;
  margin:1% 1%;
  padding: 10px 0px;
  float: left;
  text-align: center;
  cursor: pointer;
}
.file-imgwrap:hover{
  background-color: rgb(200,200,200);
}
.square::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: bottom;
}
.forbitmask{
  position: absolute;
  left:0px;
  top:0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  text-align: center;
}
.forbitmask::before{
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>
