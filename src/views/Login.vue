<template>
  <div class="container">
    <div class="btnClose">
      <span class="iconfont iconicon-test"></span>
    </div>

    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 添加验证规则 -->
    <Vuthinput
      type="text"
      title="请输入用户名/手机号"
      errMsg="请输入6位账号"
      :rule="/^.{6}$/"
    />

    <Vuthinput
      type="password"
      title="请输入密码"
      errMsg="请输入6到12位密码"
      :rule="/^\d{6,12}$/"
    />

    <!-- 登录按钮 -->
    <VuthBtn btnText="登录" />
  </div>
</template>

<script>
import Vuthinput from "../components/VuthInput";
import VuthBtn from "../components/VuthBtn";
export default {
  components: {
    Vuthinput,
    VuthBtn,
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 24/360 * 100vw;
  // background-color: #dedad9;
}
.btnClose {
  .iconfont {
    font-size: 28/360 * 100vw;
  }
}
.logo {
  text-align: center;
  .iconfont {
    font-size: 126/360 * 100vw;
    color: #8995ad;
  }
}
</style>