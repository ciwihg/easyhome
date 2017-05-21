<template>
  <mu-table :showCheckbox="false">
    <div slot="header" class="table_header">
      <span>{{pagetitle}}</span>
      <div class="roominfo-wrap">
        <span class="room-num">{{datas[0]}}</span>
        <span>{{datas[1]}}</span>

    <div  style="float:right; margin-top:0px; margin-right:15px;">
     <div style="position:relative; display:inline-block" ref="addbtn" @mouseenter="hover" @mouseleave="hovere">
    <mu-float-button icon="add" mini secondary href="#/adminhome/roomadd"/>
    <mu-tooltip label="添加租盘" :show="show"  :trigger="trigger" :verticalPosition="bottom" :horizontalPosition="center" />
    </div>
  </div>
  </div>
    </div>

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
     <router-view>
     </router-view>
  </mu-table>
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
      datas:[]
    }
  },
  created: function () {
    this.$route.params.type==="e"?(this.pagetitle="用电记录",this.theadtitle="电表读数"):(this.pagetitle="用水记录",this.theadtitle="水表读数")
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/index/type/e/rid/5",this.get);
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
