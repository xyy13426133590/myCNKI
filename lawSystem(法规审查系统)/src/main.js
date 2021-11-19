// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css'
import '../theme/index.css'
import App from './App'
import router from './router'
import Promise from 'babel-polyfill';
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 解决promise 在ie中未定义的问题
if (!window.Promise) {
  window.Promise = Promise;
}
Vue.use(ElementUI);
//Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.baseURL= process.env.API_ROOT;
//axios.defaults.timeout = 30000;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Promise,
  axios,
  components: { App },
  template: '<App/>'
})


