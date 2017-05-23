<template>
  <div>
    <div class="table_header">
      <span>{{pagetitle}}</span>
      <div class="roominfo-wrap">
        <span class="room-num">{{datas[0]}}</span>
        <span>{{datas[1]}}</span>

    <div  style="float:right; margin-top:0px; margin-right:15px;">
     <div style="position:relative; display:inline-block" ref="addbtn" @mouseenter="hover" @mouseleave="hovere" v-if="showview">
    <mu-float-button icon="add" mini secondary  @click="hadd"/>
    <mu-tooltip label="添加记录" :show="show"  :trigger="trigger" :verticalPosition="bottom" :horizontalPosition="center" />
    </div>
    <div style="position:relative; display:inline-block" ref="returnbtn" @mouseenter="hoverr" @mouseleave="hoverre" v-if="showview">
   <mu-float-button icon="keyboard_arrow_left"  href="#/adminhome/room" mini secondary backgroundColor="#9e9e9e" />
   <mu-tooltip label="返回" :show="showr"  :trigger="triggerr" :verticalPosition="bottom" :horizontalPosition="center" />
   </div>
    <mu-raised-button  label="保存" v-if="showadd|showedit" type="submit" :form="roomform" backgroundColor="blue" style="vertical-align:middle;"/>
    <mu-raised-button  label="取消" v-if="showadd|showedit" @click="cancellink" backgroundColor="rgb(180,180,180)"  style="vertical-align:middle;"/>
  </div>
  </div>
    </div>
  <mu-table :showCheckbox="false" v-if="showview">
    <mu-thead>
      <mu-tr>
        <mu-th>{{theadtitle}}</mu-th>
        <mu-th>抄表日期</mu-th>
        <mu-th>操作</mu-th>
      </mu-tr>
    </mu-thead>
     <mu-tbody>
       <mu-tr v-for="record in datas[2]" :key="record.id" >
        <mu-td>{{record.value}}</mu-td>
        <mu-td>{{record.time}}</mu-td>
        <mu-td>
          <mu-raised-button class="demo-raised-button" label="编辑" icon="create" @click="editroom" backgroundColor="blue" :id="record.id" style="vertical-align:middle;"/>
          <mu-raised-button class="demo-raised-button" label="删除" icon="delete" backgroundColor="red" @click="deleterecord" :id="record.id" style="vertical-align:middle;"/>
        </mu-td>
      </mu-tr>
     </mu-tbody>
  </mu-table>

  <form style="padding-left:15px; padding-right:15px;" id="roomform" :action="addhlink" method="POST" v-if="showadd">
  <mu-text-field label="读数" name="value" fullWidth="true" labelFloat/></br>
  <input name="time"  :value="time"  style="display:none;" />
  <mu-date-picker v-model="time"  hintText="日期"/>
 </form>

 <form style="padding-left:15px; padding-right:15px;" id="edit" :action="edithlink" method="POST" v-if="showedit">
 <mu-text-field label="读数" name="value" v-model="value" fullWidth="true" /></br>
 <input name="time"  :value="time"  style="display:none;" />
  <div style="color:#bdbdbd;">日期</div>
 <mu-date-picker v-model="time"  hintText="日期"/>
</form>

</div>
</template>

<script>
export default{
  name:"roomrecord",
  data:function(){
    return{
      show:false,
      showr:false,
      trigger:null,
      triggerr:null,
      center:'right',
      bottom:"bottom",
      pagetitle:"",
      theadtitle:"",
      showstatus:4,
      roomform:"roomform",
      time:"",
      value:"",
      edithlink:"",
      datas:[]
    }
  },
  computed:{
     addhlink:function(){
       return "http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/add/type/"+this.$route.params.type+"/rid/"+this.$route.params.rid;
     },
     showview:function(){
       return (this.showstatus>>2)&1;
     },
     showadd:function(){
       return (this.showstatus>>1)&1;
     },
     showedit:function(){
       return this.showstatus&1;
     }
  },
  created: function () {
    this.$route.params.type==="e"?(this.pagetitle="用电记录",this.theadtitle="电表读数"):(this.pagetitle="用水记录",this.theadtitle="水表读数")
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/index/type/"+this.$route.params.type+"/rid/"+this.$route.params.rid,this.get);
  },
  mounted () {
  this.trigger = this.$refs.addbtn;
  this.triggerr = this.$refs.returnbtn;
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
      xhr.send(null);
    },
    get:function(xhr){
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.datas=respon;
      console.log(respon);
    },
    deleteget:function(xhr){
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.datas.splice(2,1,respon);
    },
    editget:function(xhr){
      var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.value=respon.value;
      this.time=respon.time;
    },
    hover:function(){
      this.show=true;
    },
    hovere:function(){
      this.show=false;
    },
    hoverr:function(){
      this.showr=true;
    },
    hoverre:function(){
      this.showr=false;
    },
    deleterecord:function(e){
      var id=e.target.parentNode.parentNode.getAttribute("id");
      this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/delete/type/"+this.$route.params.type+"/id/"+id+"/rid/"+this.$route.params.rid,this.deleteget);
    },
    editroom:function(e){
      this.showstatus=1;
      var id=e.target.parentNode.parentNode.getAttribute("id");
      this.edithlink="http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/editsave/type/"+this.$route.params.type+"/id/"+id+"/rid/"+this.$route.params.rid;
      this.roomform="edit";
      this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/edit/type/"+this.$route.params.type+"/id/"+id,this.editget);
    },
    hadd:function(){
      this.showstatus=2;
      this.roomform="roomform";
      this.time="";
    },
    cancellink:function(){
      this.showstatus=4;
    }
  }
}
</script>

<style scoped>
.table_header>span{
  display: inline-block;
  font-size: 18px;
  margin-top:20px;
  margin-left: 10px;
}
.room-num{
  font-size: 24px;
}
.roominfo-wrap{
  margin-top: 25px;
}
.roominfo-wrap>span{
  margin-left: 25px;
  margin-top: 10px;
  color:#673ab7;
}
</style>
