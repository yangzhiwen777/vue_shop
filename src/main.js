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
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // 格式化 年月日
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
