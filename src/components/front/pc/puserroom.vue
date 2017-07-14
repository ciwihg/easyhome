<template>
  <div style="text-align:center; padding:50px 0px;">
  <mu-paper style=" width:60%;margin:0 auto;" :zDepth="2">
    <div style=" ">
    <mu-tabs  :value="tabsvalue" @change="Ehchage">
     <mu-tab value="1" title="我租的房"/>
     <mu-tab value="2" title="账单查询"/>
     <mu-tab value="4" title="租房登记"/>
   </mu-tabs>
   <div v-if="infoon" class="infotab">
   <m-markdown :head="info.number+'房'" v-for="(info,index) in infodatas" :key="index">
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
       <mu-tr v-for="(item,index) in info.chargeitems" :key="index">
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
     <mu-picker :slots="yearmonthSlots" :visible-item-count="3"  @change="Ehdatechange" :values="date"/>
     <mu-raised-button label="查询" @click="Ehgetrecord" :fullWidth="true" secondary/>
     <mu-table :showCheckbox="false" v-if="billliston">
       <mu-thead>
         <mu-tr>
            <mu-th colspan="2">2017年3月 账单</mu-th>
          </mu-tr>
       </mu-thead>
       <mu-tbody>
         <mu-tr v-if="eletricon">
           <mu-td rowspan="3" >电费</mu-td>
           <mu-td>上月抄表数{{records.eletric.last.value}}</br>本月抄表数{{records.eletric.current.value}}</mu-td>
         </mu-tr>
         <mu-tr v-if="eletricon">
           <mu-td>用电量{{eletriced}}</br>{{eletric.price}}</mu-td>
         </mu-tr>
         <mu-tr v-if="eletricon">
           <mu-td>金额{{eletricfee}}元</mu-td>
         </mu-tr>
         <mu-tr v-if="wateron">
           <mu-td rowspan="3">水费</mu-td>
           <mu-td>上月抄表数{{records.water.last.value}}</br>本月抄表数{{records.water.current.value}}</mu-td>
         </mu-tr>
         <mu-tr v-if="wateron">
           <mu-td>用水量{{watered}}</br>{{water.price}}</mu-td>
         </mu-tr>
         <mu-tr v-if="wateron">
           <mu-td>金额{{waterfee}}元</mu-td>
         </mu-tr>
         <mu-tr v-for="(item,index) in billdatas.chargeitems" v-if="item!==eletric&&item!==water" :key="index">
           <mu-td>{{item.name}}</mu-td>
           <mu-td>{{item.price}}</mu-td>
         </mu-tr>
         <mu-tr>
           <mu-td>租金</mu-td>
           <mu-td>{{billdatas.price}}元/月</mu-td>
         </mu-tr>
         <mu-tr>
           <mu-td>合计</mu-td>
           <mu-td>{{totalfee}}元</mu-td>
         </mu-tr>

       </mu-tbody>
     </mu-table>
   </div>

   <div v-if="roomregison">
        <mu-text-field label="请输入登记码" name="regiscode" v-model="code" labelFloat :fullWidth="true"/>
        <mu-raised-button label="登记" :fullWidth="true" @click="Ehregisroom" secondary/>
   </div>
   <mu-toast v-if="toast" :message="msg" @close="Ehhidetoast"/>
   </div>
  </mu-paper>
</div>
</template>

<script>
import markdown from "@/components/front/mobile/markdown"
export default{
  name:"userroom",
  props:['loginstatus'],
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
     oinfodatas:'',
     infodatas:{},
     billdatas:{},
     eletric:{},
     water:{},
     eletricon:false,
     wateron:false,
     yearmonth:{},
     date:[],
     year:'',
     month:'',
     records:{},
     billliston:false,
     toast:false,
     code:''
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
    },
    eletriced:function(){
      return this.records.eletric.current.value-this.records.eletric.last.value;
    },
    watered:function(){
      return this.records.water.current.value-this.records.water.last.value;
    },
    eletricfee:function(){
      var oo=JSON.parse(this.oinfodatas);
      var price;
      oo[this.billdatas.rid].chargeitems.forEach(function(element){
        if(element.name=="电费"){
          price=element.price;
        }
      });
      return (this.records.eletric.current.value-this.records.eletric.last.value)*price;
    },
    waterfee:function(){
      var oo=JSON.parse(this.oinfodatas);
      var price;
      oo[this.billdatas.rid].chargeitems.forEach(function(element){
        if(element.name=="水费"){
          price=element.price;
        }
      });
      return (this.records.water.current.value-this.records.water.last.value)*price;
    },
    totalfee:function(){
      var oo=JSON.parse(this.oinfodatas);
      var totalprice=0;
      var that=this;
      oo[this.billdatas.rid].chargeitems.forEach(function(element){
        switch(element.name){
          case "水费":totalprice=totalprice+that.waterfee;break;
          case "电费":totalprice=totalprice+that.eletricfee;break;
          default:totalprice=totalprice+element.price;
        }
      });
      return totalprice+this.billdatas.price;
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
      this.oinfodatas=xhr.responseText.substring(0,xhr.responseText.indexOf("<"));
      var reponse=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      var item;
      var that=this;
     /*for(item in reponse){
        reponse[item].chargeitems.forEach(function(element){
          switch(element.name){
            case '电费':element.price=element.price+"元/KWH";break;
            case '水费':element.price=element.price+"元/m³";break;
            default:element.price=element.price+"元/月";
          }
        });
      }*/
      this.infodatas=reponse;
    },
    CbSetyearmonth:function(xhr){
      this.yearmonth=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      var years=Object.keys(this.yearmonth);
      this.yearmonthSlots[0].values=years;
      this.year=years[0];
      this.yearmonthSlots[1].values=this.yearmonth[years[0]];
      this.date=[years[0],this.yearmonth[years[0]][0]];
    },
    Ehroomchage:function(v){
      this.billdatas=JSON.parse(this.oinfodatas)[v];
      var that=this;
      this.billdatas.chargeitems.forEach(function(element){
        switch(element.name){
          case '电费':element.price=element.price+"元/KWH";that.eletric=element;that.eletricon=true;break;
          case '水费':element.price=element.price+"元/m³";that.water=element;that.wateron=true;break;
          default:element.price=element.price+"元/月";
        }
      });
      var revice= new this.myrevice();
      revice.setcontroller('userroom').setmethod('getyear').setparam('rid').setparamvalue(v);
      revice.grequestfront(this.CbSetyearmonth);
      this.billliston=false;
    },
    Ehdatechange:function(value, index){
      switch (index) {
       case 0:
         this.year = value;
         this.yearmonthSlots[1].values=this.yearmonth[value];
         this.month = this.yearmonth[value][0];
         break;
       case 1:
         this.month = value;
         break;
     }
     this.date = [this.year, this.month];
     this.billliston=false;
   },
   toolformatmonth:function(m){
     var s=new String(m);
     (s.length==2)?(s):(s='0'+s)
     return s;
   },
   CbSetrecords:function(xhr){
      this.records=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.billliston=true;
   },
   Ehgetrecord:function(){
     var revice= new this.myrevice();
     revice.setcontroller('userroom').setmethod('getrecord');
     var data={
       rid:this.billdatas.rid,
       eletric:this.eletricon,
       water:this.wateron,
       date:this.date[0]+'-'+this.toolformatmonth(this.date[1])
     }
      revice.prequestfront(this.CbSetrecords,data);
   },
   Cbpoptoast:function(xhr){
     var status=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<"))).status;
     (status=="ok")?(this.msg="登记成功",this.reflash()):(this.msg=status)
     this.toast=true;
   },
   Ehregisroom:function(){
     var revice= new this.myrevice();
     revice.setcontroller('userroom').setmethod('regisroom');
     var data={
       code:this.code
     }
     revice.prequestfront(this.Cbpoptoast,data);
   },
   Ehhidetoast:function(){
     this.toast=false;
   },
   reflash:function(){
     var revice= new this.myrevice();
     revice.setcontroller('userroom');
     revice.grequestfront(this.CbSetinfodatas);
   }
  }
}
</script>

<style scoped>
.infotab{
  margin-top: 2px;
}
</style>
