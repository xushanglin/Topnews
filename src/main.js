import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入组件库
import Vant, {
  Toast
} from 'vant'
import {
  Tab,
  Tabs
} from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
// 组件库css文件
import 'vant/lib/index.css'

// 导入axios组件库
import axios from 'axios'
// 服务器基准路径
axios.defaults.baseURL = "http://157.122.54.189:9083"

// 请求拦截器
axios.interceptors.request.use(config => {
  // Do something before request is sent
  console.log(config);
  // 判断请求头没有有token,并且本地有token的话给请求头添加
  if (!config.headers.Authorization && localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config;
});


// 拦截器响应
// 做错误逻辑的判断
axios.interceptors.response.use(res => {
  // Do something before response is sent
  const statusCode = /^4\d{2}/
  // 判断放回的状态码是不是4开头的错误码，如果是就不返回数据
  if (statusCode.test(res.data.statusCode)) {
    Toast.fail(res.data.message || '系统错误')
  }
  // 还有一种情况，通过伪造token进入，所有用户信息校验失败的错误
  // 都必须清空userId和token再给跳转到登录页
  if (res.data.message === "用户信息验证失败") {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // 跳转到登录页
    router.replace("/login");
  }
  // 判断是否有token,
  // 必须有return res才能放行获取到数据否则就没有
  return res;
})

// 过滤器，判断图片路劲
Vue.filter("fixImgUrl", (oldUrl) => {
  if (oldUrl.indexOf("http") > -1) {
    return oldUrl
  } else {
    return axios.defaults.baseURL + oldUrl
  }
})

// 绑定到原型
Vue.prototype.$axios = axios;

import Uploader from "vant";
import Dialog from "vant"
Vue.use(Uploader, Dialog);

Vue.config.productionTip = false
new Vue({
  router,
  render: function (h) {
    return h(App)
  },
  Vant
}).$mount('#app')