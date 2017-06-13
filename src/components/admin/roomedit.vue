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
    <mu-text-field label="按金" name="sub_price" :value="roominfo[0].sub_price" :fullWidth="true" />
   </div>

   <mu-select-field name="chargeitems" v-model="chargeitems" :fullWidth="true" multiple label="选择收费项目" v-show="showchareitem">
    <mu-menu-item :value="citem.id" :title="citem.name" v-for="citem in roominfo[2]"/>
  </mu-select-field>

  <mu-table v-show="showimgs" :showCheckbox="false"  >
    <mu-tbody ref="tbody">
      <mu-tr v-for="n in imgs">
        <mu-td><img class="review" src="static/t2.jpg" style="width:100px;" @click="selectimg"/></mu-td>
        <mu-td style="text-align:right;">
          <mu-raised-button class="demo-raised-button" label="删除" icon="delete" @click="deleteimg" backgroundColor="red"  style="vertical-align:middle;"/>
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

 </form>
 <div class="filewindow-wrap" v-if="openwindow">
  <mu-paper class="filewindow" :zDepth="2" >
    <div class="windowtitle">选择图片</div>
     <div class="windowcontent" @click="selecteimg">
        <img class="review" src="static/t2.jpg" style="width:100px;"/>
        <img class="review" src="static/t2.jpg" style="width:100px;"/>
        <img class="review" src="static/t2.jpg" style="width:100px;"/>
        <img class="review" src="static/t2.jpg" style="width:100px;"/>
        <img class="review" src="static/t2.jpg" style="width:100px;"/>
     </div>
     <div style="text-align:right;">
        <a href="javascript:;" class="upload-btn">
           上传<input type="file" name="file" id="file" v-on:change="uploadfile" />
        </a>
       </mu-raised-button>
      <mu-raised-button class="demo-raised-button" label="确认"   backgroundColor="blue"  />
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
       imgs:1,
       openwindow:false,
       selectedimg:{},
       myfile:1
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
    },
    addimg:function(){
      this.imgs++
    },
    deleteimg:function(e){
      this.imgs--
    },
    selectimg:function(){
      this.openwindow=true;
    },
    closewindow:function(e){
      this.openwindow=false;
    },
    selecteimg:function(e){
      if(e.target.nodeName==="IMG"){
        if(this.selectedimg.style){
          this.selectedimg.style.border="none";
        }
        e.target.style.border="2px solid rgb(200,200,200)";
        this.selectedimg=e.target;
      }

    },
    ttt:function(xhr){
      //var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      console.log(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
    },
    uploadfile:function(){
      var file=document.getElementById("file").files[0];
      var formdata=new FormData();
      formdata.append("file",file);
      this.ajax("POST","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/get/rid/"+this.$route.params.rid,this.ttt,formdata)
    }
  }
}
</script>

<style scoped>
.roomaddwrap{
  padding:0px 10px;
  position: relative;
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
  vertical-align: middle;
  margin: 10px 0px;
  cursor: pointer;
}
.filewindow{
margin-left: -50%;
position: relative;
width: 100%;
padding: 15px 15px;
}
.filewindow-wrap{
  display: inline-block;
  position: absolute;
  left: 50%;
  top:10%;
  z-index: 12;
  width:80%;
}
.windowtitle{
 font-size: 16px;
 border-bottom: 1px solid rgba(0,0,0,.12);
}
.windowcontent{
  background-color: rgb(250,250,250);
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
</style>
