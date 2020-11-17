import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入组件库
import Vant from 'vant'
// 组件库css文件
import 'vant/lib/index.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  },
  Vant
}).$mount('#app')