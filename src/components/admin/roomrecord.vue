<template>
  <div>
    <div class="table_header">
      <span>{{pagetitle}}</span>
      <div class="roominfo-wrap">
        <span class="room-num">{{datas[0]}}</span>
        <span>{{datas[1]}}</span>

    <div  style="float:right; margin-top:0px; margin-right:15px;">
     <div style="position:relative; display:inline-block" ref="addbtn" @mouseenter="hover" @mouseleave="hovere" v-if="showall">
    <mu-float-button icon="add" mini secondary  @click="hadd"/>
    <mu-tooltip label="添加租盘" :show="show"  :trigger="trigger" :verticalPosition="bottom" :horizontalPosition="center" />
    </div>
    <mu-raised-button  label="保存" v-if="!showall" type="submit" form="roomform" backgroundColor="blue" style="vertical-align:middle;"/>
    <mu-raised-button  label="取消" v-if="!showall" @click="cancellink" backgroundColor="rgb(180,180,180)"  style="vertical-align:middle;"/>
  </div>
  </div>
    </div>
  <mu-table :showCheckbox="false" v-if="showall">
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
          <mu-raised-button class="demo-raised-button" label="删除" icon="delete" backgroundColor="red" @click="deleteroom" :id="record.id" style="vertical-align:middle;"/>
        </mu-td>
      </mu-tr>
     </mu-tbody>
  </mu-table>

  <form style="padding-left:15px; padding-right:15px;" id="roomform" :action="addhlink" method="POST" v-if="!showall">
  <mu-text-field label="读数" name="value" fullWidth="true" labelFloat/></br>
  <input name="time"  :value="time"  style="display:none;" />
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
      trigger:null,
      center:'center',
      bottom:"bottom",
      pagetitle:"",
      theadtitle:"",
      showall:true,
      time:"",
      datas:[]
    }
  },
  computed:{
     addhlink:function(){
       return "http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/add/type/"+this.$route.params.type+"/rid/"+this.$route.params.rid;
     }
  },
  created: function () {
    this.$route.params.type==="e"?(this.pagetitle="用电记录",this.theadtitle="电表读数"):(this.pagetitle="用水记录",this.theadtitle="水表读数")
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/index/type/"+this.$route.params.type+"/rid/"+this.$route.params.rid,this.get);
  },
  mounted () {
  this.trigger = this.$refs.addbtn;
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
    hover:function(){
      this.show=true;
    },
    hovere:function(){
      this.show=false;
    },
    deleteroom:function(e){
      var rid=e.target.parentNode.parentNode.getAttribute("rid");
      this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/delete/rid/"+rid,this.get);
    },
    editroom:function(e){
      var rid=e.target.parentNode.parentNode.getAttribute("rid");
      this.$router.push({ name: 'roomedit', params: { rid: rid }});
    },
    hadd:function(){
      this.showall=false;
    },
    cancellink:function(){
      this.showall=true;
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
