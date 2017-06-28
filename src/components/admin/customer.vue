<template>
  <mu-table :showCheckbox="false">
    <div slot="header" class="table_header">
      <span>客户管理</span>
    </div>

    <mu-thead>
      <mu-tr>
        <mu-th>客户id</mu-th>
        <mu-th>租盘</mu-th>
        <mu-th>操作</mu-th>
      </mu-tr>
    </mu-thead>
     <mu-tbody>
       <mu-tr v-for="item in rooms">
        <mu-td>{{item.userid}}</mu-td>
        <mu-td>
          <mu-icon-menu
      icon="more_vert"
      :anchorOrigin="{vertical: 'top',horizontal: 'left'}"
      :targetOrigin="{vertical: 'top',horizontal: 'left'}"
    >
      <mu-menu-item titleClass="myitemtitle" v-for="room in item.rooms">
        <span slot="title">{{room.number}}房</br><span style="color:rgb(180,180,180)">{{room.address}}</span></span>
        <mu-raised-button  slot="after" label="退租" backgroundColor="red" @click="deleteroom" :rid="room.rid" :userid="item.userid"/>
      </mu-menu-item>
    </mu-icon-menu>
        </mu-td>
        <mu-td>
          <mu-raised-button :href="'#/adminhome/customeredit/'+item.userid" label="编辑" icon="create"  backgroundColor="blue" style="vertical-align:middle;"/>
        </mu-td>
      </mu-tr>
     </mu-tbody>
     <router-view>
     </router-view>
  </mu-table>
</template>

<script>
export default{
  name:'customer',
  data:function(){
    return {
       rooms:[]
    }
  },
  created:function(){
    var revice= new this.myrevice();
    revice.setcontroller('customercontroll');
    revice.grequestadmin(this.CbSetrooms);
  },
  methods:{
    deleteroom:function(e){
        var rid=e.target.parentNode.parentNode.getAttribute("rid");
        var userid=e.target.parentNode.parentNode.getAttribute("userid");
        var data={
          rid:rid,
          userid:userid
        };
        var revice= new this.myrevice();
        revice.setcontroller('customercontroll').setmethod('delete');
        revice.prequestadmin(this.Cb,data);
    },
    CbSetrooms:function(xhr){
      this.rooms=JSON.parse(this.saedata(xhr.responseText));
    },
    reflash:function(){
      var revice= new this.myrevice();
      revice.setcontroller('customercontroll');
      revice.grequestadmin(this.CbSetrooms);
    },
    Cb:function(xhr){
       this.reflash();
    }
  }
}
</script>

<style>
.table_header>span{
  display: inline-block;
  font-size: 18px;
  margin-top:20px;
  margin-left: 10px;
}
.myitemtitle{
  line-height:1;
}
</style>
