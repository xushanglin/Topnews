import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入组件库
import Vant from 'vant'
// 组件库css文件
import 'vant/lib/index.css'

// 导入axios组件库
import axios from 'axios'
// 绑定到原型
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  },
  Vant
}).$mount('#app')