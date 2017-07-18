<template>

<div style="margin:50px 50px; width:60%;position:relative; overflow:hidden;">
<div style="width:200%;" ref="moveframework" v-if="!roomregison">
  <transition name="fadeleft" mode="out-in">
  <mu-paper style="width: 50%;display:inline-block; min-width:300px;" v-if="liston">
  <mu-list @itemClick="listclick">
    <mu-list-item :title="info.number+'房'" v-for="(info,key) in infodatas" :afterText="info.address" afterTextClass="aftertext" @click="detailopen" :index="key">
    </mu-list-item>
  </mu-list>
</mu-paper>
</transition><transition name="faderight">
  <mu-paper style="width: 50%; display:inline-block;min-width:300px;" v-if="!liston">
    <mu-appbar :title="cinfodata.number+'房'" style="height:50px;" titleClass="tclass">
    <mu-flat-button label="返回" slot="right" @click="detailopen"/>
</mu-appbar>
  <mu-table :showCheckbox="false" >
    <mu-thead>
      <mu-tr>
         <mu-th colspan="2">房屋信息</mu-th>
       </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr>
        <mu-td>房号</mu-td>
        <mu-td>{{cinfodata.number}}</mu-td>
      </mu-tr>
      <mu-tr>
        <mu-td>地址</mu-td>
        <mu-td>{{cinfodata.address}}</mu-td>
      </mu-tr>
      <mu-tr>
        <mu-td>房型</mu-td>
        <mu-td>{{cinfodata.type}}</mu-td>
      </mu-tr>
      <mu-tr>
        <mu-td>租金</mu-td>
        <mu-td>{{cinfodata.price}}</mu-td>
      </mu-tr>
    </mu-tbody>
  </mu-table>
  <mu-table :showCheckbox="false" >
    <mu-thead>
      <mu-tr>
         <mu-th colspan="2">费用项目</mu-th>
       </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr v-for="(item,index) in cinfodata.chargeitems" :key="index">
        <mu-td>{{item.name}}</mu-td>
        <mu-td>{{item.price}}</mu-td>
      </mu-tr>
    </mu-tbody>
  </mu-table>
  <div style=" padding-left:24px;">
    <div class="billtitle">账单查询</div>
    <div>
  <mu-select-field   hintText="年" v-model="year" style="vertical-align: middle;" @change="yearchange">
  <mu-menu-item :value="key" :title="String(key)" v-for="(m,key) in yearmonth"/>

</mu-select-field>
<mu-select-field   hintText="月" v-model="month" style="vertical-align: middle;" >
  <mu-menu-item :value="m" :title="String(m)" v-for="m in months"/>
</mu-select-field>
<mu-flat-button label="查询" style="vertical-align: middle;" @click="billquery" primary/>
</div>
  </div>
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
</mu-paper>
</transition>
</div>
<div v-if="roomregison" style="width:300px;">
     <mu-text-field label="请输入登记码" name="regiscode" v-model="code" labelFloat :fullWidth="true"/>
     <mu-raised-button label="登记" :fullWidth="true" @click="Ehregisroom" secondary/>
</div>
<mu-toast v-if="toast" :message="msg" @close="Ehhidetoast"/>
</div>
</div>
</template>

<script>
import markdown from "@/components/front/mobile/markdown"
export default{
  name:"userroom",
  props:['loginstatus','subpage'],
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
     cinfodata:{},
     billdatas:{},
     eletric:{},
     water:{},
     eletricon:false,
     wateron:false,
     yearmonth:{},
     date:[],
     year:'',
     month:'',
     months:[],
     records:{},
     billliston:false,
     toast:false,
     code:'',
     liston:true,
     roomregison:false
    }
  },
  components:{
    "m-markdown":markdown
  },
  computed:{

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
    this.$watch(function(){return this.subpage},function(n,o){
      var reg=/^[^tf]+/;
      switch(n.match(reg)[0]){
        case '房屋列表':this.roomregison=false;console.log(2);this.$emit("loadfinsh");break;
        case '租房登记':this.roomregison=true;console.log(1);this.$emit("loadfinsh");break;
        default:this.$emit("loadfinsh");break;
      }

      this.$emit('loadfinsh');});
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
       for(item in reponse){
         reponse[item].open=false;
        reponse[item].chargeitems.forEach(function(element){
          switch(element.name){
            case '电费':element.price=element.price+"元/KWH";break;
            case '水费':element.price=element.price+"元/m³";break;
            default:element.price=element.price+"元/月";
          }
        });
      }
      this.infodatas=reponse;
      this.$emit('roomtype',"我租的房");
      this.$emit('loadfinsh');
    },
    CbSetyearmonth:function(xhr){
      this.yearmonth=JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
      this.year='';
      this.month='';
      this.months=[];
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
   },
   detailopen:function(){
     this.liston=!this.liston;
   },
   listclick:function(item){
     var key=item.$el.getAttribute('index');
     this.billdatas=JSON.parse(this.oinfodatas)[key];
     var that=this;
     this.billdatas.chargeitems.forEach(function(element){
       switch(element.name){
         case '电费':element.price=element.price+"元/KWH";that.eletric=element;that.eletricon=true;break;
         case '水费':element.price=element.price+"元/m³";that.water=element;that.wateron=true;break;
         default:element.price=element.price+"元/月";
       }
     });
     this.cinfodata=this.infodatas[key];
     var revice= new this.myrevice();
     revice.setcontroller('userroom').setmethod('getyear').setparam('rid').setparamvalue(key);
     revice.grequestfront(this.CbSetyearmonth);
     this.billliston=false;
   },
   yearchange:function(year){
     this.months=this.yearmonth[year];
   },
   billquery:function(){
     this.date=[this.year,this.month];
     var revice= new this.myrevice();
     revice.setcontroller('userroom').setmethod('getrecord');
     var data={
       rid:this.billdatas.rid,
       eletric:this.eletricon,
       water:this.wateron,
       date:this.date[0]+'-'+this.toolformatmonth(this.date[1])
     }
      revice.prequestfront(this.CbSetrecords,data);
   }
  }
}
</script>
<style>
.aftertext{
  color:white !important;
  background-color: #7c4dff;
  padding: 5px;
  border-radius: 3px;
}
.tclass{
  line-height: 50px !important;
}
</style>
<style scoped>
.infotab{
  margin-top: 2px;

}
.fadeleft-enter-active{
  transition: all .5s;
  transform: translate3d(0%,0,0);
  opacity: 1;
}
.fadeleft-leave-active {
  transition: all .5s;
  opacity: 0;
  position: absolute;
  transform: translate3d(-100%,0,0);
}
.fadeleft-enter{
  opacity: 0;
  transform: translate3d(-100%,0,0);
}
.fadeleft-leave{
  opacity: 1;
  transform: translate3d(0,0,0);
}

.faderight-enter-active{
  transition: all .5s;
  transform: translate3d(0%,0,0);
  opacity: 1;
}
.faderight-leave-active {
  transition: all .5s;
  opacity: 0;
  position: absolute;
  transform: translate3d(100%,0,0);
}
.faderight-enter{
  opacity: 0;
  transform: translate3d(100%,0,0);
}
.faderight-leave{
  opacity: 1;
  transform: translate3d(0%,0,0);
}
.billtitle{
  color:rgba(0,0,0,.54);
  padding: 13px 0px;
  font-size: 12px;

}
</style>
