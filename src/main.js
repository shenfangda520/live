import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import axios from 'axios'
import routes from '@/routes'
import 'font-awesome/css/font-awesome.min.css'

import $ from 'jquery'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
const router = new VueRouter({
  mode: 'hash',
  routes
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: {},
  render: h => h(App)
}).$mount('#app')

