export default function () {
  this.baseurl="http://easyhome.applinzi.com/public/index.php";
  this.controller="";
  this.method="";
  this.param="";
  this.paramvalue="";
  //ajax基本框架
this.ajax=function(method,url,fun,data,cname){
  var xhr=new XMLHttpRequest();
  var that=this;
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
      if(xhr.status==200){
        fun(xhr,cname);
      }
      else{
        alert("ajax失败"+xhr.status);
      }
    }
  };
  xhr.open(method,url,true);
  (method=="POST")&&(xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'));
  xhr.withCredentials = true; //跨域读取cookies
  (method=="POST")?(xhr.send(data)):(xhr.send(null));
};

this.formatpostdata=function(data){
  var result='';
  var p;
  for(p in data){
    result=result+"&"+p+"="+data[p];
  }
  return result.substring(1);
}

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

this.odatagetadmin=function(){
  this.ajax("GET",this.baseurl+"/admin"+this.finallurl(),this.responseorigin);
}

this.pdatagetfront=function(){
  this.ajax("GET",this.baseurl+"/front"+this.finallurl(),this.responseparse);
}

this.pdatagetadmin=function(){
  this.ajax("GET",this.baseurl+"/admin"+this.finallurl(),this.responseparse);
}

this.pdatapostfront=function(data){
  this.ajax("POST",this.baseurl+"/front"+this.finallurl(),this.responseparse,this.formatpostdata(data));
}

this.grequestfront=function(callback){
  this.ajax("GET",this.baseurl+"/front"+this.finallurl(),callback);
}

this.grequestadmin=function(callback){
  this.ajax("GET",this.baseurl+"/admin"+this.finallurl(),callback);
}

this.prequestfront=function(callback,data){
  this.ajax("POST",this.baseurl+"/front"+this.finallurl(),callback,this.formatpostdata(data));
}

this.prequestadmin=function(callback,data){
  this.ajax("POST",this.baseurl+"/admin"+this.finallurl(),callback,this.formatpostdata(data));
}

this.grequestadmin=function(callback){
  this.ajax("GET",this.baseurl+"/admin"+this.finallurl(),callback);
}

this.ajaxvalidate=function(callback,data,name){
  this.ajax("POST",this.baseurl+"/front"+this.finallurl(),callback,this.formatpostdata(data),name);
}
};
