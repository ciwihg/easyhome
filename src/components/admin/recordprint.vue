<template>
  <div>
    <div class="table_header">
      <span>抄表及打印</span>
      <div class="roominfo-wrap">
        <span class="room-num">{{datas[0]}}</span>
        <span>{{datas[1]}}</span>

    <div  style="float:right; margin-top:0px; margin-right:15px;">
   <mu-float-button icon="keyboard_arrow_left"  href="#/adminhome/room" mini secondary backgroundColor="#9e9e9e" />
   </div>
  </div>
  </div>
  <div style="text-align:center;">
    <div style="display:inline-block;">
   <mu-text-field label="电表读数"  v-model="evalue" labelFloat @input="ti"/>
   <mu-text-field label="水表读数" v-model="wvalue"labelFloat @input="ti"/>
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
         <mu-td>上月抄表数{{billdatas.eletric.last.value}}</br>本月抄表数{{billdatas.eletric.current.value}}</mu-td>
       </mu-tr>
       <mu-tr v-if="eletricon">
         <mu-td>用电量{{eletriced}}</br>{{eletric.price}}</mu-td>
       </mu-tr>
       <mu-tr v-if="eletricon">
         <mu-td>金额{{eletricfee}}元</mu-td>
       </mu-tr>
       <mu-tr v-if="wateron">
         <mu-td rowspan="3">水费</mu-td>
         <mu-td>上月抄表数{{billdatas.water.last.value}}</br>本月抄表数{{billdatas.water.current.value}}</mu-td>
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

<mu-dialog :open="confirmopen" :title="dialogt" @close="confirmclose">
  <div v-show="!billing">
   <div>电表读数{{evalue}}</div>
    <div>水表读数{{wvalue}}</div>
  </div>
  <div v-show="billing" style="text-align:center;">
    <mu-circular-progress :size="50" />
  </div>
   <mu-flat-button slot="actions" @click="confirmclose" primary  v-show="!billing" label="取消"/>
   <mu-flat-button slot="actions" primary @click="sumbitrecord" v-show="!billing" label="确定上传"/>
 </mu-dialog>
</div>
</template>

<script>
export default{
  name:"recordprint",
  data:function(){
    return{
      wvalue:'',
      evalue:'',
      datas:[],
      checktimer:null,
      confirmopen:false,
      dialogt:'数据确认',
      billing:false,
      billdatas:{},
      oinfodatas:'',
      water:{},
      eletric:{},
      billliston:false
    }
  },

  created: function () {
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/index/type/"+this.$route.params.type+"/rid/"+this.$route.params.rid,this.get);
  },
  mounted () {

},
computed:{
  eletriced:function(){
    return this.billdatas.eletric.current.value-this.billdatas.eletric.last.value;
  },
  watered:function(){
    return this.billdatas.water.current.value-this.billdatas.water.last.value;
  },
  eletricfee:function(){
    var oo=JSON.parse(this.oinfodatas);
    var price;
    oo.chargeitems.forEach(function(element){
      if(element.name=="电费"){
        price=element.price;
      }
    });
    return (this.billdatas.eletric.current.value-this.billdatas.eletric.last.value)*price;
  },
  waterfee:function(){
    var oo=JSON.parse(this.oinfodatas);
    var price;
    oo.chargeitems.forEach(function(element){
      if(element.name=="水费"){
        price=element.price;
      }
    });
    return (this.billdatas.water.current.value-this.billdatas.water.last.value)*price;
  },
  totalfee:function(){
    var oo=JSON.parse(this.oinfodatas);
    var totalprice=0;
    var that=this;
    oo.chargeitems.forEach(function(element){
      switch(element.name){
        case "水费":totalprice=totalprice+that.waterfee;break;
        case "电费":totalprice=totalprice+that.eletricfee;break;
        default:totalprice=totalprice+element.price;
      }
    });
    return totalprice+this.billdatas.price;
  }
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
    },
    ti:function(v){

        clearTimeout(this.checktimer);

      var that=this;
      this.checktimer=setTimeout(function(){
        if((that.evalue==v||that.wvalue==v)&&(that.evalue!=''&&that.wvalue!='')){
          that.confirmopen=true;
        }
      },1000);
    },
    confirmclose:function(){
      this.confirmopen=false;
    },
    toolformatmonth:function(m){
      var s=new String(m);
      (s.length==2)?(s):(s='0'+s)
      return s;
    },
    sumbitrecord:function(){
      this.dialogt="账单生成中";
      this.billing=true;
      var mrevice=new this.myrevice();
      mrevice.setcontroller("recordcontroll").setmethod("addboth");
      var tdate=new Date();
      var month=tdate.getMonth()+1;
      var formatdate=tdate.getFullYear()+'-'+this.toolformatmonth(month)+'-'+tdate.getDate();
      var data={
        evalue:this.evalue,
        wvalue:this.wvalue,
        time:formatdate,
        eletric:true,
        water:true,
        rid:this.$route.params.rid
      };
      mrevice.prequestadmin(this.Cbgetbill,data);
    },
    Cbgetbill:function(xhr){
      this.oinfodatas=this.saedata(xhr.responseText);
      this.billdatas=JSON.parse(this.saedata(xhr.responseText));
        this.billdatas.chargeitems.forEach(function(element){
          switch(element.name){
            case '电费':element.price=element.price+"元/KWH";this.eletric=element;break;
            case '水费':element.price=element.price+"元/m³";this.water=element;break;
            default:element.price=element.price+"元/月";
          }
        });
       this.billliston=true;
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
