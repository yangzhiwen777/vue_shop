import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入全局样式
import '../src/assets/css/global.css'
// 引入字体图标
import './assets/fonts/iconfont.css'
import TreeTabel from 'vue-table-with-tree-grid'
// 引入axios  并挂载
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log(config)

  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table', TreeTabel)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
