<template>
  <div>
  <mu-table :showCheckbox="false">
    <mu-thead>
      <mu-tr>
        <mu-th colspan="4" style="text-align:center;">
          横潭大街32号
        </mu-th>
      </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr>
        <mu-td></mu-td>
        <mu-td>数量</mu-td>
        <mu-td>已出租</mu-td>
        <mu-td>剩余</mu-td>
      </mu-tr>
      <mu-tr v-for="(value,index,key) in buliding0.sum" :key="index">
        <mu-td>{{key}}</mu-td>
        <mu-td>{{value}}</mu-td>
        <mu-td>{{buliding0.rented[key]}}</mu-td>
        <mu-td>{{value-buliding0.rented[key]}}</mu-td>
      </mu-tr>
        <mu-tr>
          <mu-td>合计</mu-td>
          <mu-td>{{buliding0.sums}}</mu-td>
          <mu-td>{{buliding0.renteds}}</mu-td>
          <mu-td>{{buliding0.sums-buliding0.renteds}}</mu-td>
        </mu-tr>
  </mu-tbody>
  </mu-table>

  <mu-table :showCheckbox="false">
    <mu-thead>
      <mu-tr>
        <mu-th colspan="4" style="text-align:center;">
          朝阳巷5号
        </mu-th>
      </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr>
        <mu-td></mu-td>
        <mu-td>数量</mu-td>
        <mu-td>已出租</mu-td>
        <mu-td>剩余</mu-td>
      </mu-tr>
      <mu-tr v-for="(value,index,key) in buliding1.sum" :key="index">
        <mu-td>{{key}}</mu-td>
        <mu-td>{{value}}</mu-td>
        <mu-td>{{buliding1.rented[key]}}</mu-td>
        <mu-td>{{value-buliding1.rented[key]}}</mu-td>
      </mu-tr>
        <mu-tr>
          <mu-td>合计</mu-td>
          <mu-td>{{buliding1.sums}}</mu-td>
          <mu-td>{{buliding1.renteds}}</mu-td>
          <mu-td>{{buliding1.sums-buliding1.renteds}}</mu-td>
        </mu-tr>
  </mu-tbody>
  </mu-table>

  <mu-table :showCheckbox="false">
    <mu-thead>
      <mu-tr>
        <mu-th colspan="4" style="text-align:center;">
          横潭市场
        </mu-th>
      </mu-tr>
    </mu-thead>
    <mu-tbody>
      <mu-tr>
        <mu-td></mu-td>
        <mu-td>数量</mu-td>
        <mu-td>已出租</mu-td>
        <mu-td>剩余</mu-td>
      </mu-tr>
      <mu-tr v-for="(value,index,key) in buliding2.sum" :key="index">
        <mu-td>{{key}}</mu-td>
        <mu-td>{{value}}</mu-td>
        <mu-td>{{buliding2.rented[key]}}</mu-td>
        <mu-td>{{value-buliding2.rented[key]}}</mu-td>
      </mu-tr>
        <mu-tr>
          <mu-td>合计</mu-td>
          <mu-td>{{buliding2.sums}}</mu-td>
          <mu-td>{{buliding2.renteds}}</mu-td>
          <mu-td>{{buliding2.sums-buliding2.renteds}}</mu-td>
        </mu-tr>
  </mu-tbody>
  </mu-table>
</div>
</template>

<script>
export default{
  name:'datacenter',
  data:function(){
    return{
      datas:[],
      buliding0:{},
      buliding1:{},
      buliding2:{}
    }
  },
  created:function(){
    var revice=new this.myrevice();
    revice.setcontroller('roomcontroll').setmethod('getcenterdata');
    revice.grequestadmin(this.CbSetdatas);
  },
  methods:{
    CbSetdatas:function(xhr){
      this.datas=JSON.parse(this.saedata(xhr.responseText));
      var that=this;
      var sum,rented;
      for(var i=0;i<3;i++){
        sum={};rented={};
        this.datas[i].forEach(function(e){
          (sum[e.type]===undefined)&&(sum[e.type]=0);
          sum[e.type]=sum[e.type]+1;
          (rented[e.type]===undefined)&&(rented[e.type]=0);
          (e.customer!="")&&(rented[e.type]=rented[e.type]+1);
        });
        var temp,ss=0,rs=0;
        for(temp in sum){
          ss=ss+sum[temp];
        }
        for(temp in rented){
          rs=rs+rented[temp];
        }
        this["buliding"+i]={
          sum:sum,
          rented:rented,
          sums:ss,
          renteds:rs
        };
      }


    }
  }
}
</script>

<style scoped>
</style>
