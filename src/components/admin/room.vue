<template>
  <div>
  <mu-table :showCheckbox="false">
    <div slot="header" class="table_header">
      <span>租盘管理</span>
    <div  style="float:right; margin-top:10px; margin-right:15px;">
     <div style="position:relative; display:inline-block" ref="addbtn" @mouseenter="hover" @mouseleave="hovere">
    <mu-float-button icon="add" mini secondary href="#/adminhome/roomadd"/>
    <mu-tooltip label="添加租盘" :show="show"  :trigger="trigger" :verticalPosition="bottom" :horizontalPosition="center" />
    </div>
  </div>
    </div>

    <mu-thead>
      <mu-tr>
        <mu-th>房号</mu-th>
        <mu-th>户型</mu-th>
        <mu-th>地址</mu-th>
        <mu-th>用电记录</mu-th>
        <mu-th>用水记录</mu-th>
        <mu-th>注册码</mu-th>
        <mu-th>操作</mu-th>
      </mu-tr>
    </mu-thead>
     <mu-tbody>
       <mu-tr v-for="room in rooms" :key="room.rid" >
        <mu-td>{{room.number}}</mu-td>
        <mu-td>{{room.type}}</mu-td>
        <mu-td>{{room.address}}</mu-td>
        <mu-td>
            <mu-raised-button label="查看" @click="viewelectric" backgroundColor="blue" :rid="room.rid" />
        </mu-td>
        <mu-td>
            <mu-raised-button label="查看" @click="viewwater" backgroundColor="blue" :rid="room.rid" />
        </mu-td>
        <mu-td>
            <mu-raised-button label="查看" backgroundColor="blue" @click="viewcode" :rid="room.rid" />
        </mu-td>
        <mu-td>
          <mu-raised-button class="demo-raised-button" label="编辑" icon="create" @click="editroom" backgroundColor="blue" :rid="room.rid" style="vertical-align:middle;"/>
          <mu-raised-button class="demo-raised-button" label="删除" icon="delete" backgroundColor="red" @click="deleteroom" :rid="room.rid" style="vertical-align:middle;"/>
        </mu-td>
      </mu-tr>
     </mu-tbody>
     <router-view>
     </router-view>
  </mu-table>
    <mu-dialog :open="dialogon" title="注册码">
      <mu-content-block>{{code}}</mu-content-block>
      <mu-raised-button label="关闭" backgroundColor="blue" slot="actions" @click="closedialog" />
    </mu-dialog>
</div>
</template>

<script>
export default {
  name: 'room',
  data () {
    return {
      navopen:true,
      cc:"200",
      show:false,
      trigger:null,
      center:'center',
      bottom:"bottom",
      rooms:[],
      dialogon:false,
      code:""
    }
  },
  mounted () {
  this.trigger = this.$refs.addbtn;
},
created: function() {
  this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll",this.get);
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
    this.rooms=respon;
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
  viewelectric:function(e){
    var rid=e.target.parentNode.parentNode.getAttribute("rid");
    this.$router.push({ name: 'roomrecord', params: { rid: rid, type:"e"}});

  },
  viewwater:function(e){
    var rid=e.target.parentNode.parentNode.getAttribute("rid");
    this.$router.push({ name: 'roomrecord', params: { rid: rid, type:"w" }});

  },
  viewcode:function(e){
    var rid=e.target.parentNode.parentNode.getAttribute("rid");
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/getcode/rid/"+rid,this.CbGetcode);

  },
  CbGetcode:function(xhr){
    var respon=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
    this.code=respon.code;
    this.dialogon=true;
  },
  closedialog:function(){
    this.dialogon=false;
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
