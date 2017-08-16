<template>
  <div>
    <div class="table_header">
      <span>租盘管理</span>
    <div  style="float:right; margin-top:10px; margin-right:15px;">
     <div style="position:relative; display:inline-block" ref="addbtn" @mouseenter="hover" @mouseleave="hovere">
    <mu-float-button icon="add" mini secondary href="#/adminhome/roomadd"/>
    <mu-tooltip label="添加租盘" :show="show"  :trigger="trigger" :verticalPosition="bottom" :horizontalPosition="center" />
    </div>
  </div>
    </div>
    <div  class="filter_wrap">
      <div >筛选</div>
     <div>
      <mu-text-field hintText="房号" v-model="froomnum" style="vertical-align:middle;"/>
    <mu-select-field hintText="地址" v-model="froomaddr" style="vertical-align:middle;">
      <mu-menu-item value="横潭大街32号" title="横潭大街32号"/>
      <mu-menu-item value="朝阳巷5号" title="朝阳巷5号"/>
      <mu-menu-item value="横潭市场" title="横潭市场"/>
    </mu-select-field>
   </div>
    <div>
    <mu-raised-button label="确认" secondary @click="filterrooms"/>
    <mu-raised-button label="重置" secondary @click="resetfilter"/>
  </div>
  </div>
  <mu-table :showCheckbox="false">

   <mu-thead>
      <mu-tr>
        <mu-th>房号</mu-th>
        <mu-th>户型</mu-th>
        <mu-th>地址</mu-th>
        <mu-th class="wclass">注册码</mu-th>
        <mu-th>更多</mu-th>
        <mu-th class="wclass">操作</mu-th>
      </mu-tr>
    </mu-thead>
     <mu-tbody>
       <mu-tr v-for="room in rooms" :key="room.rid" >
        <mu-td>{{room.number}}</mu-td>
        <mu-td>{{room.type}}</mu-td>
        <mu-td>{{room.address}}</mu-td>
        <!--<mu-td>
            <mu-raised-button label="查看" @click="viewelectric" backgroundColor="blue" :rid="room.rid" />
        </mu-td>
        <mu-td>
            <mu-raised-button label="查看" @click="viewwater" backgroundColor="blue" :rid="room.rid" />
        </mu-td>-->
        <mu-td class="wclass">
            <mu-raised-button label="查看" backgroundColor="blue" @click="viewcode" :rid="room.rid" />
        </mu-td>
        <mu-td>
          <mu-icon-menu
      icon="more_vert"
      :anchorOrigin="{vertical: 'top',horizontal: 'left'}"
      :targetOrigin="{vertical: 'top',horizontal: 'left'}"
    @itemClick="Ehmenuclick">
      <mu-menu-item title="抄表及打印" :href="'#/adminhome/recordprint/'+room.rid" />
      <mu-menu-item title="电费记录" :href="'#/adminhome/roomrecord/'+room.rid+'/e'" />
      <mu-menu-item title="水费记录" :href="'#/adminhome/roomrecord/'+room.rid+'/w'" />
      <mu-menu-item class="menuclass" title="注册码" :cid="room.rid"/>
      <mu-menu-item class="menuclass" title="编辑" :href="'#/adminhome/roomedit/'+room.rid"/>
      <mu-menu-item class="menuclass" title="删除" :did="room.rid"/>
      <mu-menu-item title="出租历史" :rid="room.rid" />
    </mu-icon-menu>
        </mu-td>
        <mu-td class="wclass">
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
    <mu-dialog :open="historyon" title="出租历史" >
    <mu-content-block>
        <mu-table :showCheckbox="false" @cellClick="popcinfo">
          <mu-thead>
            <mu-tr>
              <mu-th>客户</mu-th>
              <mu-th>出租时间</mu-th>
              <mu-th>退租时间</mu-th>
              <mu-th>操作</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="(item,index) in historydata" :key="index">
              <mu-td :name="item.customer">{{item.customer}}</mu-td>
              <mu-td><mu-date-picker inputClass="dateclass" style="vertical-align:middle;" underlineClass="underlinec" v-model="item.start"/></mu-td>
              <mu-td><mu-date-picker inputClass="dateclass" underlineClass="underlinec" v-model="item.end"/></mu-td>
              <mu-td><mu-raised-button label="保存" :cid="item.customer" :index="index" @click="savedate" primary/></mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
    </mu-content-block>
    <mu-flat-button slot="actions" @click="historyclose" primary label="关闭"/>
  </mu-dialog>
  <mu-dialog :open="customerinfo" :title="customerdatas[0].cid" >
    <mu-content-block>
      <mu-content-block>
          <mu-table :showCheckbox="false" >
            <mu-tbody>
              <mu-tr >
                <mu-td>姓名</mu-td>
                <mu-td>{{customerdatas[0].name}}</mu-td>
              </mu-tr>
              <mu-tr >
                <mu-td>身份证号码</mu-td>
                <mu-td>{{customerdatas[0].idnum}}</mu-td>
              </mu-tr>
              <mu-tr >
                <mu-td>联系电话</mu-td>
                <mu-td>{{customerdatas[0].phone_number}}</mu-td>
              </mu-tr>
            </mu-tbody>
          </mu-table>
      </mu-content-block>
      </mu-content-block>
      <mu-flat-button slot="actions" @click="closeinfo" primary label="关闭"/>
  </mu-dialog>
  <mu-toast v-if="toast" message="保存成功" @close="hideToast"/>
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
      historyon:false,
      historydata:[],
      code:"",
      customerinfo:false,
      customerdatas:[{}],
      crid:'',
      toast:false,
      froomnum:'',
      froomaddr:'',
      orooms:[]
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
    this.orooms=respon;
    this.rooms=respon;

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
  },
  CbGethistory:function(xhr){
    this.historydata=JSON.parse(this.saedata(xhr.responseText));
    this.historyon=true;
  },
  Ehmenuclick:function(e){
    var rid;
    if(rid=e.$el.getAttribute("rid"))
    {
      this.crid=rid;
      var revice=new this.myrevice();
      revice.setcontroller("roomcontroll").setmethod('gethistory').setparam('rid').setparamvalue(rid);
      revice.grequestadmin(this.CbGethistory);
    }


    if(rid=e.$el.getAttribute("cid"))
    {
      this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/getcode/rid/"+rid,this.CbGetcode);
    }


    if(rid=e.$el.getAttribute("did"))
    {
      this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/roomcontroll/delete/rid/"+rid,this.get);
    }
    else{
      return;
    }

  },
  historyclose:function(){
    this.historyon=false;
  },
  popcinfo:function(a,b,c,d){
    if(b)
    {  var revice=new this.myrevice();
      revice.setcontroller("customercontroll").setmethod('getcustomer');
      revice.prequestadmin(this.CbSetcustomerdatas,{userid:b});}
  },
  CbSetcustomerdatas:function(xhr){
    this.customerdatas=JSON.parse(this.saedata(xhr.responseText));
    this.customerinfo=true;
  },
  closeinfo:function(){
    this.customerinfo=false;
  },
  savedate:function(e){
    var temp=e.target.parentNode.parentNode;
    var cid=temp.getAttribute('cid');
    var index=temp.getAttribute('index');
    var revice=new this.myrevice();
      revice.setcontroller("roomcontroll").setmethod('edithistory');
      var data={
        rid:this.crid,
        userid:cid,
        start:this.historydata[index].start,
        end:this.historydata[index].end
      }
    revice.prequestadmin(this.Cbflashh,data);

  },
  Cbflashh:function(xhr){
   this.toast=true;
 },
 hideToast:function(){
   this.toast=false;
 },
 filterrooms:function(){
   var that=this;
   this.rooms=this.orooms.filter(function(element){
     return element.address==this.froomaddr&&element.number==this.froomnum;
   },this);
 },
 resetfilter:function(){
   this.froomaddr='';
   this.froomnum='';
   this.rooms=this.orooms;

 }
}
}
</script>

<style>
.table_header{
  background-color: white;
}
.table_header>span{
  display: inline-block;
  font-size: 18px;
  margin-top:20px;
  margin-left: 10px;
}
.underlinec{
  width:80px;
}
.menuclass{
    display: none;
}
.filter_wrap{
  background-color:white;
  padding:10px 15px;
}
@media screen and (max-width:767px){
  .wclass{
    display: none !important;
  }
  .menuclass{
      display: block !important;
  }
  .filter_wrap{
    background-color:white;
    text-align:center;
    padding-top:10px;
  }
}

</style>
