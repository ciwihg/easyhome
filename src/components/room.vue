<template>
  <mu-table :showCheckbox="false">
    <div slot="header" class="table_header">
      <span>租盘管理</span>
    <div  style="float:right; margin-top:10px; margin-right:15px;">
     <div style="position:relative; display:inline-block" ref="addbtn" @mouseenter="hover" @mouseleave="hovere">
    <mu-float-button icon="add" mini secondary />
    <mu-tooltip label="添加租盘" :show="show"  :trigger="trigger" :verticalPosition="center" :horizontalPosition="bottom"/>
    </div>
  </div>
    </div>

    <mu-thead>
      <mu-tr>
        <mu-th>房号</mu-th>
        <mu-th>户型</mu-th>
        <mu-th>地址</mu-th>
        <mu-th>操作</mu-th>
      </mu-tr>
    </mu-thead>
     <mu-tbody>
       <mu-tr>
        <mu-td>701</mu-td>
        <mu-td>一房一厅</mu-td>
        <mu-td>朝阳巷5号</mu-td>
        <mu-td>
          <mu-raised-button class="demo-raised-button" label="编辑" icon="create" backgroundColor="blue"/>
          <mu-raised-button class="demo-raised-button" label="删除" icon="delete" backgroundColor="red"/>
        </mu-td>
      </mu-tr>
      <mu-tr>
       <mu-td>701</mu-td>
       <mu-td>一房一厅</mu-td>
       <mu-td>朝阳巷5号</mu-td>
       <mu-td>
         <mu-raised-button class="demo-raised-button" label="编辑" icon="create" backgroundColor="blue"/>
         <mu-raised-button class="demo-raised-button" label="删除" icon="delete" backgroundColor="red"/>
       </mu-td>
     </mu-tr>
     </mu-tbody>
     <router-view>
     </router-view>
  </mu-table>
</template>

<script>
export default {
  name: 'room',
  data () {
    return {
      navopen:true,
      cc:"200",
      show:false,
      trigger:null
    }
  },
  mounted () {
  this.trigger = this.$refs.addbtn;
},
methods:{
  hover:function(){
    this.show=true;
  },
  hovere:function(){
    this.show=false;
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
