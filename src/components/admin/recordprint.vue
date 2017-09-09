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
  <div style="text-align:center; min-height:600px; background-color:white; padding-top:10px;">
    <div style="display:inline-block;">
    <div style="text-align:left;margin-top:30px; color:#d1c4e9;">末次电表行码 {{elast.value}}</br>日期 {{elast.time}}</div>
   <mu-text-field label="电表读数"  v-model="evalue" labelFloat @input="ti"/> <mu-raised-button label="上传" primary :disabled="eletricupload" @click="uploadsingle"/>
   <div style="text-align:left;margin-top:15px; color:#d1c4e9;">末次水表行码 {{wlast.value}}</br>日期 {{wlast.time}}</div>
   <mu-text-field label="水表读数" v-model="wvalue"labelFloat @input="ti"/> <mu-raised-button label="上传" primary :disabled="waterupload" @click="uploadsingle"/>
   </div>
   <mu-table :showCheckbox="false" v-if="billliston">
     <mu-thead>
       <mu-tr>
          <mu-th colspan="2">{{date.getFullYear()}}年{{date.getMonth()+1}}月 账单</mu-th>
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
       <mu-tr v-for="(item,index) in billdatas[rid].chargeitems" v-if="item!==eletric&&item!==water" :key="index">
         <mu-td>{{item.name}}</mu-td>
         <mu-td>{{item.price}}</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>租金</mu-td>
         <mu-td>{{billdatas[rid].price}}元/月</mu-td>
       </mu-tr>
       <mu-tr>
         <mu-td>合计</mu-td>
         <mu-td>{{totalfee}}元</mu-td>
       </mu-tr>

     </mu-tbody>
   </mu-table>
   <mu-raised-button v-if="billliston" label="打印账单" :href="'mprint://myprint.ciwi/easyhome?'+printurl.substring(1)" secondary/>
</div>

<mu-dialog :open="confirmopen" :title="dialogt" @close="confirmclose">
  <div v-show="!billing">
   <div v-show="evalue!=''">电表读数{{evalue}}</div>
    <div v-show="wvalue!=''">水表读数{{wvalue}}</div>
  </div>
  <div v-show="billing" style="text-align:center;">
    <mu-circular-progress :size="50" />
  </div>
   <mu-flat-button slot="actions" @click="confirmclose" primary  v-show="!billing&&addtype!='error'" label="取消"/>
   <mu-flat-button slot="actions" primary @click="sumbitrecord" v-show="!billing&&addtype!='error'" label="确定上传"/>
   <div v-show="addtype=='error'">
     <div>水电表数据记录有误，请检查</div>
   </div>
   <mu-flat-button slot="actions" primary @click="redirect"  v-show="addtype=='error'" label="确定"/>
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
      rid:'',
      eletricon:false,
      wateron:false,
      billliston:false,
      date:{},
      printurl:'',
      wlast:{},
      elast:{},
      addtype:'',
      caddtime:''
    }
  },

  created: function () {
    this.rid=this.$route.params.rid;
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/recordcontroll/getlastestrecord/rid/"+this.$route.params.rid,this.get);
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
     var reg=/[\d\.]+/;
    var price=this.eletric.price.match(reg)[0];

    return (this.billdatas.eletric.current.value-this.billdatas.eletric.last.value)*price;
  },
  waterfee:function(){
    var reg=/[\d\.]+/;
    var price=this.water.price.match(reg)[0];

    return (this.billdatas.water.current.value-this.billdatas.water.last.value)*price;
  },
  totalfee:function(){
    var reg=/[\d\.]+/;
    var totalprice=0;
    var that=this;
    this.billdatas[this.rid].chargeitems.forEach(function(element){
      switch(element.name){
        case "水费":totalprice=totalprice+that.waterfee;break;
        case "电费":totalprice=totalprice+that.eletricfee;break;
        default:totalprice=totalprice+parseInt(element.price.match(reg)[0]);
      }
    });
    return totalprice+this.billdatas[this.rid].price;
  },
  waterupload:function(){
    if(this.wvalue!=""&&this.evalue==""&&this.addtype=="both"){
      return false;
    }else{
      return true;
    }
  },
  eletricupload:function () {
    if(this.evalue!=""&&this.wvalue==""&&this.addtype=="both"){
      return false;
    }else{
      return true;
    }
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
      this.elast=respon[2];
      this.wlast=respon[3];
      switch(this.getaddtype()){
        case 'both':this.addbothui();break;
        case 'water':this.wateraddui();break;
        case 'eletric':this.eletricaddui();break;
        case 'error':this.errorui();break;
      }
    },
    errorui:function () {
      this.dialogt="错误";
      this.confirmopen=true;
    },
    redirect:function () {
      location="/#/adminhome/room";
    },
    getaddtype:function () {
      if(this.addtype!=''){return this.addtype;}
      switch(this.elast.length-this.wlast.length){
        case 0:this.addtype='both';break;
        case 1:this.addtype='water';break;
        case -1:this.addtype='eletric';break;
        default:this.addtype="error";
      }
      return this.addtype;
    },
    wateraddui:function () {
      this.evalue=this.elast[0].value;
      this.caddtime=this.elast[0].time;
      this.elast=this.elast[1];
      this.wlast=this.wlast[0];
    },
    eletricaddui:function () {
      this.wvalue=this.wlast[0].value;
      this.caddtime=this.wlast[0].time;
      this.wlast=this.wlast[1];
      this.elast=this.elast[0];
    },
    addbothui:function () {
      this.wlast=this.wlast[0];
      this.elast=this.elast[0];
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
      if(this.getaddtype()=='both'){
      var tdate=this.date=new Date();
      var month=tdate.getMonth()+1;
      var formatdate=tdate.getFullYear()+'-'+this.toolformatmonth(month)+'-'+this.toolformatmonth(tdate.getDate());
      if(!this.waterupload){
        var mrevice=new this.myrevice();
        mrevice.setcontroller("recordcontroll").setmethod("addsingle").setparams([{k:"type",v:'w'},{k:"rid",v:this.$route.params.rid}]);
        var data={
          value:this.wvalue,
          time:formatdate,
        };
        mrevice.prequestadmin(this.Cbnone,data);
        return;
      }
      if(!this.eletricupload){
        var mrevice=new this.myrevice();
        mrevice.setcontroller("recordcontroll").setmethod("addsingle").setparams([{k:"type",v:'e'},{k:"rid",v:this.$route.params.rid}]);
        var data={
          value:this.evalue,
          time:formatdate,
        };
        mrevice.prequestadmin(this.Cbnone,data);
        return;
      }
      this.dialogt="账单生成中";
      this.billing=true;
      var mrevice=new this.myrevice();
      mrevice.setcontroller("recordcontroll").setmethod("addboth");
      var data={
        evalue:this.evalue,
        wvalue:this.wvalue,
        time:formatdate,
        eletric:true,
        water:true,
        rid:this.$route.params.rid
      };
      mrevice.prequestadmin(this.Cbgetbill,data);
    }
    if(this.getaddtype()=='water'){
      this.date=new Date();
      this.dialogt="账单生成中";
      this.billing=true;
      var mrevice=new this.myrevice();
      mrevice.setcontroller("recordcontroll").setmethod("addboth");
      var data={
        wvalue:this.wvalue,
        time:this.caddtime,
        eletric:true,
        water:true,
        rid:this.$route.params.rid
      };
      mrevice.prequestadmin(this.Cbgetbill,data);

    }
    if(this.getaddtype()=='eletric'){
      this.date=new Date();
      this.dialogt="账单生成中";
      this.billing=true;
      var mrevice=new this.myrevice();
      mrevice.setcontroller("recordcontroll").setmethod("addboth");
      var data={
        evalue:this.evalue,
        time:this.caddtime,
        eletric:true,
        water:true,
        rid:this.$route.params.rid
      };
      mrevice.prequestadmin(this.Cbgetbill,data);

    }
    },
    Cbgetbill:function(xhr){
      this.billdatas=JSON.parse(this.saedata(xhr.responseText));
      var that=this;
        this.billdatas[this.rid].chargeitems.forEach(function(element){
          switch(element.name){
            case '电费':that.printurl=that.printurl+"&ef=l"+that.billdatas.eletric.last.value+"c"+that.billdatas.eletric.current.value+"p"+element.price;element.price=element.price+"元/KWH";that.eletricon=true;that.eletric=element;break;
            case '水费':that.printurl=that.printurl+"&wf=l"+that.billdatas.water.last.value+"c"+that.billdatas.water.current.value+"p"+element.price;element.price=element.price+"元/m³";that.wateron=true;that.water=element;break;
            default:that.printurl=that.printurl+"&"+element.name+"="+element.price;element.price=element.price+"元/月";
          }
        });
        this.printurl=this.printurl+"&租金="+this.billdatas[this.rid].price+"&number="+this.billdatas[this.rid].number;
        this.confirmopen=false;
        this.billliston=true;

    },
    Cbnone:function (xhr) {
      var type='e';
      if(!this.waterupload){
          type='w';
      }
        location="/#/adminhome/roomrecord/"+this.$route.params.rid+'/'+type;
    },
    uploadsingle:function () {
      this.confirmopen=true;
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
