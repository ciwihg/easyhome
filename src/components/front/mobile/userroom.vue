<template>
  <div>
  <mu-tabs  :value="tabsvalue" @change="Ehchage">
   <mu-tab value="1" title="我租的房"/>
   <mu-tab value="2" title="账单查询"/>
   <mu-tab value="4" title="租房登记"/>
 </mu-tabs>
 <div v-if="infoon" class="infotab">
 <m-markdown :head="info.number+'房'" v-for="info in infodatas">
 <mu-table :showCheckbox="false">
   <mu-thead>
     <mu-tr>
        <mu-th colspan="2">房屋信息</mu-th>
      </mu-tr>
   </mu-thead>
   <mu-tbody>
     <mu-tr>
       <mu-td>房号</mu-td>
       <mu-td>{{info.number}}</mu-td>
     </mu-tr>
     <mu-tr>
       <mu-td>地址</mu-td>
       <mu-td>{{info.address}}</mu-td>
     </mu-tr>
     <mu-tr>
       <mu-td>房型</mu-td>
       <mu-td>{{info.type}}</mu-td>
     </mu-tr>
     <mu-tr>
       <mu-td>租金</mu-td>
       <mu-td>{{info.price}}</mu-td>
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
     <mu-tr v-for="item in info.chargeitems">
       <mu-td>{{item.name}}</mu-td>
       <mu-td>{{item.price}}</mu-td>
     </mu-tr>
   </mu-tbody>
 </mu-table>
 </m-markdown>

 </div>
 <div v-if="billon">
   <mu-select-field label="选择查询的房屋" :fullWidth="true" @change="Ehroomchage">
   <mu-menu-item v-for="info in infodatas" :key="info.rid" :value="info.rid"  :title="info.number+'房'" />
   </mu-select-field>
   <mu-picker :slots="yearmonthSlots" :visible-item-count="3"  @change="Ehdatechange"/>
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

 <div v-if="roomregison">
      <mu-text-field label="请输入登记码" name="regiscode" labelFloat :fullWidth="true"/>
      <mu-raised-button label="登记" :fullWidth="true" secondary/>
 </div>
 </div>
</template>

<script>
import markdown from "@/components/front/mobile/markdown"
export default{
  name:"userroom",
  data:function(){
    return {
     tabsvalue:'1',
     yearmonthSlots:[
       {
         width: '100%',
         textAlign: 'right',
         values: []
       },
       {
         width: '100%',
         textAlign: 'left',
         values: []
       }
     ],
     infodatas:{},
     yearmonth:{}
    }
  },
  components:{
    "m-markdown":markdown
  },
  computed:{
    infoon:function(){
      return parseInt(this.tabsvalue)&1;
    },
    billon:function(){
      return (parseInt(this.tabsvalue)>>1)&1;
    },
    roomregison:function(){
      return (parseInt(this.tabsvalue)>>2)&1;
    }
  },
  created:function(){
    var revice= new this.myrevice();
    revice.setcontroller('userroom');
    revice.grequestfront(this.CbSetinfodatas);
  },
  methods:{
    Ehchage:function(v){
      this.tabsvalue=v;
    },
    CbSetinfodatas:function(xhr){
      var reponse=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.infodatas=reponse;
    },
    CbSetyearmonth:function(xhr){
      this.yearmonth=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      var years=Object.keys(this.yearmonth);
      this.yearmonthSlots[0].values=years;
      this.yearmonthSlots[1].values=this.yearmonth[years[0]];
    },
    Ehroomchage:function(v){
      var revice= new this.myrevice();
      revice.setcontroller('userroom').setmethod('getyear').setparam('rid').setparamvalue(v);
      revice.grequestfront(this.CbSetyearmonth);

    },
    Ehdatechange:function(value, index){
      if(index==0){
        this.yearmonthSlots[1].values=this.yearmonth[value];
      }
    }
  }
}
</script>

<style scoped>
.infotab{
  margin-top: 2px;
}
</style>
