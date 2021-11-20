import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    includePage: [],//要缓存的组件
  },

  mutations: {
    [types.UPDATE_INCLUDE_PAGE](state , obj){
      if(obj.flag){
        state.includePage.push(obj.pageName);
      }else{
        state.includePage.splice(state.includePage.indexOf(obj.pageName),1);
      }
    }
  },

  getters:{
    includePage: state => state.includePage
     }
})

export default store;
