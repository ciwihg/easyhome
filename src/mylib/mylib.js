
export default {
  install:function(Vue,options){
    Vue.prototype.myrevice=function () {
      this.baseurl="http://easyhome.applinzi.com/public/index.php";
      this.controller="";
      this.method="";
      this.param="";
      this.paramvalue="";
      //ajax基本框架
    this.ajax=function(method,url,fun){
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
    };

    this.fix=function(d){
      return d.substring(0,d.indexOf("<"));
    }
    //ajax成功回调函数，返回接收原始数据
    this.responseorigin=function(xhr){
    console.log("返回的原始数据:"+xhr.responseText.substring(0,xhr.responseText.indexOf("<")));
    }
    //ajax成功回调函数，返回解析原始数据后的对象
    this.responseparse=function(xhr){
     console.log("返回的解析后的数据:");
     console.log(JSON.parse(xhr.responseText.substring(0,xhr.responseText.indexOf("<"))));
    }
    //设置控制器
    this.setcontroller=function(c){
      this.controller="/"+c;
      return this;
    }
    //设置控制器
    this.setmethod=function(m){
      this.method="/"+m;
      return this;
    }
    //设置参数名
    this.setparam=function(p){
      this.param="/"+p;
      return this;
    }
    //设置参数值
    this.setparamvalue=function(v){
      this.paramvalue="/"+v;
    }

   this.finallurl=function(){
    return this.controller+this.method+this.param+this.paramvalue;
   }

    this.odatagetfront=function(){
      this.ajax("GET",this.baseurl+"/front"+this.finallurl(),this.responseorigin);
    }

    this.pdatagetfront=function(){
      this.ajax("GET",this.baseurl+"/front"+this.finallurl(),this.responseparse);
    }

    this.grequestfront=function(callback){
      this.ajax("GET",this.baseurl+"/front"+this.finallurl(),callback);
    }

    this.grequestadmin=function(callback){
      this.ajax("GET",this.baseurl+"/admin"+this.finallurl(),callback);
    }
  };

}

  };
