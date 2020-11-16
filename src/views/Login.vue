<template>
  <div>
    <h1>这是一个登录页面</h1>
    <!-- 主动给子组件发送数据 用:属性方式从data数据里面读取数据 -->
    <!-- <Myinput :title="msg" /> -->
    <!-- <Myinput :title="passWord" /> -->
    <!-- <Myinput :title="nickName" /> -->
    <!-- 第二种直接赋值 -->
    <Myinput title="请输入用户名" @infoMsg="infoMsg" />
    <Myinput title="请输入密码" @infoMsg="infoMsg" />
    <Myinput title="请输入昵称" @infoMsg="infoMsg" />
    <Logo />
  </div>
</template>

<script>
// 导入组件
import Logo from "../components/Logo";
// 导入子组件,Myinput为自定义组件名称, from为导入组件的路径
import Myinput from "../components/MyInputComponent";
export default {
  data() {
    return {
      msg: "请输入用户名",
      passWord: "请输入密码",
      nickName: "请输入昵称",
    };
  },
  components: {
    Logo,
    Myinput,
  },
  methods: {
    infoMsg(msg) {
      // msg为子组件传过来的参数
      console.log(msg);
    },
  },
};
</script>

<style>
</style>