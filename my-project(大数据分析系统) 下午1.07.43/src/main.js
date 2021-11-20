// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI,{ MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css'
import '../theme/index.css'
import '../src/assets/css/fishBone.css'
import "./assets/js/directives"
import App from './App'
import router from './router'
import Promise from 'babel-polyfill';
import store from './Vuex/store'
import echarts from 'echarts'
import wordcloud from  'echarts-wordcloud'
import axios from 'axios'
import {message} from './assets/js/resetMessage'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 解决promise 在ie中未定义的问题
if (!window.Promise) {
  window.Promise = Promise;
}
Vue.use(ElementUI);
//Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$message = message;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false;
Vue.prototype.baseURL= process.env.API_ROOT;
//axios.defaults.timeout = 30000;
/* eslint-disable no-new */

  // 防重复点击(指令实现)
  // Vue.directive('preventReClick', {
  //   inserted (el, binding) {
  //     el.addEventListener('click', () => {
  //       if (!el.disabled) {
  //         el.disabled = true
  //         setTimeout(() => {
  //           el.disabled = false
  //         }, binding.value || 3000)
  //       }
  //     })
  //   }
  // })

// 提交以后禁用按钮一段时间，防止重复提交
Vue.directive('noMoreClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      el.classList.add('is-disabled');
      el.disabled = true;
      setTimeout(() => {
        el.disabled = false;
        el.classList.remove('is-disabled');
      }, 3000)
    })
  }
});


new Vue({
  el: '#app',
  router,
  Promise,
  axios,
  echarts,
  store,
  components: { App },
  template: '<App/>'
})


