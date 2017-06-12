<template>
  <div class="carousel_wrap">
    <mu-table :showCheckbox="false">
      <div slot="header" class="table_header">
        <span>幻灯片</span>
      <div  style="float:right; margin-top:10px; margin-right:15px;">
       <div style="position:relative; display:inline-block" ref="addbtn" >
      <mu-float-button icon="add" mini secondary href="#/adminhome/carouseladd"/>
      <mu-tooltip label="添加幻灯片" />
      </div>
    </div>
      </div>

      <mu-thead>
        <mu-tr>
          <mu-th>缩略图</mu-th>
          <mu-th>标题</mu-th>
          <mu-th>操作</mu-th>
        </mu-tr>
      </mu-thead>
       <mu-tbody>
         <mu-tr  v-for="(item,index) in carousels">
          <mu-td><mu-avatar  style="vertical-align:middle;" :src="item.src"/></mu-td>
          <mu-td>{{item.title}}</mu-td>
          <mu-td>
            <mu-raised-button class="demo-raised-button" label="编辑" icon="create"  backgroundColor="blue" :num="index" @click="heditclick" style="vertical-align:middle;"/>
            <mu-raised-button class="demo-raised-button" label="删除" icon="delete" backgroundColor="red"  :num="index" @click="hclick" style="vertical-align:middle;"/>
          </mu-td>
        </mu-tr>
       </mu-tbody>
       <router-view>
       </router-view>
    </mu-table>


</div>
</template>

<script>
export default{
  name:"carousel",
  data:function(){
    return {
      carousels:[]
    }
  },
  created: function() {
    this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/carouselcontroll",this.get);
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
      this.carousels=respon;
      console.log(respon);
    },
    hclick:function(e){
      var num=e.target.parentNode.parentNode.getAttribute("num");
      this.ajax("GET","http://easyhome.applinzi.com/public/index.php/admin/carouselcontroll/delete/num/"+num,this.get);
    },
    heditclick:function(e){
      var num=parseInt(e.target.parentNode.parentNode.getAttribute("num"));
      this.$emit("toedit",this.carousels[num]);
      this.$router.push({ name: 'carouseledit', params: { num: num }});

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
