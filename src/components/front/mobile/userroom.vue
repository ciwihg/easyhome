<template>
  <div>
  <mu-tabs  :value="tabsvalue" @change="Ehchage">
   <mu-tab value="1" title="我租的房"/>
   <mu-tab value="2" title="账单查询"/>
 </mu-tabs>
 <div v-if="infoon">
 <mu-table :showCheckbox="false">
   <mu-thead>
     <mu-tr>
        <mu-th colspan="2">房屋信息</mu-th>
      </mu-tr>
   </mu-thead>
   <mu-tbody>
     <mu-tr>
       <mu-td>房号</mu-td>
       <mu-td>301</mu-td>
     </mu-tr>
     <mu-tr>
       <mu-td>地址</mu-td>
       <mu-td>朝阳巷5号</mu-td>
     </mu-tr>
   </mu-tbody>
 </mu-table>
 <mu-table :showCheckbox="false">
   <mu-thead>
     <mu-tr>
        <mu-th colspan="2">费用项目</mu-th>
      </mu-tr>
   </mu-thead>
   <mu-tbody>
     <mu-tr>
       <mu-td>电费</mu-td>
       <mu-td>1元/KWH</mu-td>
     </mu-tr>
     <mu-tr>
       <mu-td>水费</mu-td>
       <mu-td>3.5元/m³</mu-td>
     </mu-tr>
     <mu-tr>
       <mu-td>楼梯灯</mu-td>
       <mu-td>5元/月</mu-td>
     </mu-tr>
   </mu-tbody>
 </mu-table>
 </div>
 <div v-if="billon">
   <mu-picker :slots="yearmonthSlots" :visible-item-count="3" />
   <mu-raised-button label="查询" :fullWidth="true" secondary/>
   <mu-table :showCheckbox="false">
     <mu-thead>
       <mu-tr>
          <mu-th colspan="2">2017年3月 账单</mu-th>
        </mu-tr>
     </mu-thead>
     <mu-tbody>
       <mu-tr>
         <mu-td rowspan="3">电费</mu-td>
         <mu-td>上月抄表数100</br>本月抄表数130</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>用电量30</br>1元/KWH</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>金额30元</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td rowspan="3">水费</mu-td>
         <mu-td>上月抄表数100</br>本月抄表数130</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>用水量30</br>3.5元/m³</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>金额30元</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>水费损耗</mu-td>
         <mu-td>7元/月</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>楼梯灯</mu-td>
         <mu-td>5元/月</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>有线电视费</mu-td>
         <mu-td>5元/月</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>租金</mu-td>
         <mu-td>300元/月</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>合计</mu-td>
         <mu-td>353元</mu-td>
       </mu-tr>

     </mu-tbody>
   </mu-table>
 </div>
 </div>
</template>

<script>
var month=[1,2,3,4,5,6,7,8,9,10,11,12];
var year=[2013,2014,2015,2016,2017,2018];
export default{
  name:"userroom",
  data:function(){
    return {
     tabsvalue:'1',
     yearmonthSlots:[
       {
         width: '100%',
         textAlign: 'right',
         values: year
       },
       {
         width: '100%',
         textAlign: 'left',
         values: month
       }
     ]
    }
  },
  computed:{
    infoon:function(){
      return parseInt(this.tabsvalue)&1;
    },
    billon:function(){
      return (parseInt(this.tabsvalue)>>1)&1;
    }
  },
  methods:{
    Ehchage:function(v){
      this.tabsvalue=v;
    }
  }
}
</script>

<style scoped>

</style>
