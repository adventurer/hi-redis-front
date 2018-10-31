import Vue from 'vue'
import App from './App.vue'
import router from './router'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

import axios from 'axios'
import Qs from 'qs'
//QS是axios库中带的，不需要我们再npm安装一个
 
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;

import global_ from './components/Global.vue'
Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
