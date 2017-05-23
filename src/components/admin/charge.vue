<template>
  <mu-table :showCheckbox="false">
    <div slot="header" class="table_header">
      <span>费用管理</span>
    <div  style="float:right; margin-top:10px; margin-right:15px;">
     <div style="position:relative; display:inline-block" ref="addbtn" @mouseenter="hover" @mouseleave="hovere">
    <mu-float-button icon="add" mini secondary href="#/adminhome/chargeadd"/>
    <mu-tooltip label="添加费用" :show="show"  :trigger="trigger" :verticalPosition="bottom" :horizontalPosition="center" />
    </div>
  </div>
    </div>

    <mu-thead>
      <mu-tr>
        <mu-th>费用项目</mu-th>
        <mu-th>价格</mu-th>
        <mu-th>操作</mu-th>
      </mu-tr>
    </mu-thead>
     <mu-tbody>
       <mu-tr v-for="chargeitem in chargeitems" :key="chargeitem.id" >
        <mu-td>{{chargeitem.name}}</mu-td>
        <mu-td>{{chargeitem.price}}</mu-td>
        <mu-td>
          <mu-raised-button class="demo-raised-button" label="编辑" icon="create" @click="editroom" backgroundColor="blue" :id="chargeitem.id" style="vertical-align:middle;"/>
          <mu-raised-button class="demo-raised-button" label="删除" icon="delete" backgroundColor="red" @click="deleteroom" :id="chargeitem.id" style="vertical-align:middle;"/>
        </mu-td>
      </mu-tr>
     </mu-tbody>
     <router-view>
     </router-view>
  </mu-table>
</template>

<script>
export default {
  name: 'charge',
  data () {
    return {
      navopen:true,
      cc:"200",
      show:false,
      trigger:null,
      center:'center',
      bottom:"bottom",
      chargeitems:[]
    }
  },
  mounted () {
  this.trigger = this.$refs.addbtn;
},
created: function() {
  this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/chargecontroll",this.get);
  this.$emit('start',3);
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
    this.chargeitems=respon;
    console.log(respon);
  },
  hover:function(){
    this.show=true;
  },
  hovere:function(){
    this.show=false;
  },
  deleteroom:function(e){
    var id=e.target.parentNode.parentNode.getAttribute("id");
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/chargecontroll/delete/id/"+id,this.get);
  },
  editroom:function(e){
    var id=e.target.parentNode.parentNode.getAttribute("id");
    this.$router.push({ name: 'chargeedit', params: { id: id }});
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
</style>
