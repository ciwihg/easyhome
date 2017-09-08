import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    active:0,
    loading:false,
    typemap:{
      '首页':1,
      '二房一厅':2,
      '一房一厅':3,
      '单房':4,
      '其他':5,
      '我租的房':6,
      '三房一厅':5
     }
  },
  mutations:{
    setactive(state,index){
      state.active=index;
    },
    loading(state){
      state.loading=true;
    },
    loaded(state){
      state.loading=false;
    }
  },
  actions:{
    loaded(context){
      context.commit('loaded');
    }
  }
})
