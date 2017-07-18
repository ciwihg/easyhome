<template>
  <div style="padding:50px 50px;;">
    <div  class="itemwrap" v-for="result in results">
      <a style="display:block; " :href="'#/proom/'+result.rid">
      <div class="imgwrap">
        <img style="width:100%; vertical-align:top;" :src="JSON.parse(result.imgs)[0].src"/>
      </div>
      <div class="infowrap">
        <div style="color:rgba(0,0,0,.7);">{{result.number}}房</div>
        <div>{{result.address}}</div>
        <div>{{result.type}}</div>
      </div>
    </a>
    </div>
    <div  v-if="noresult" style="text-align:center; margin-top:50px;color:#d1c4e9; font-size:30px;">找不到{{$route.params.key}}相关结果</div>
  </div>
</template>

<script>
export default{
  name:'searchresult',
  data:function(){
    return {
      results:[],
      noresult:false
    }
  },
  created:function(){



  },
  mounted:function(){
    this.$watch(function(){return this.$route.params.key},function(n,o){
      this.noresult=false;
      var revice=new this.myrevice();
      revice.setcontroller('Mhome').setmethod('search').setparam('key').setparamvalue(this.$route.params.key);
      revice.grequestfront(this.CbSetresults);

    });
    var revice=new this.myrevice();
    revice.setcontroller('Mhome').setmethod('search').setparam('key').setparamvalue(this.$route.params.key);
    revice.grequestfront(this.CbSetresults);
  },
  methods:{
    CbSetresults:function(xhr){

      this.results=JSON.parse(this.saedata(xhr.responseText));
        (this.results.length==0)&&(this.noresult=true)
    }
  }
}
</script>

<style scoped>
.imgwrap{
  display: inline-block;
  vertical-align:top;
 width:45%;
}
.infowrap{
  display: inline-block;
  vertical-align:top;
  padding: 15px 15px;
  color:rgba(0,0,0,.3);
}
.itemwrap{
  width:300px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0,0,0,.2);
  float: left;
  margin:5px 5px;
}
</style>
