// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import ElementUI from 'element-ui';
import store from './views/store';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/common.css';
import DAGBoard from '../plugin/index';
import Moment from "moment";
import api from './service/http';
import SlideVerify from 'vue-monoplasty-slide-verify';
// import DAGBoard from 'dag-board'

Vue.use(DAGBoard);
Vue.use(SlideVerify);
Vue.use(ElementUI);
Vue.use(api);
Vue.config.productionTip = false;
Moment.locale('zh-cn');
Vue.prototype.$api = api;
Vue.prototype.globalUlr = "http://192.168.59.11:5001/";
// 不同环境的接口地址

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

// 全局过滤器
Vue.filter('converTime', function(data, formatStr) {
  if (data) {
    return Moment(data).format(formatStr);
  } else {
    return '-';
  }
});
