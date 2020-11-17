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

    <div class="btnSubmit">
      <button>登录</button>
    </div>
  </div>
</template>

<script>
import Vuthinput from "../components/vuthInput";
export default {
  components: {
    Vuthinput,
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

.btnSubmit {
  padding-top: 26/360 * 100vw;
  button {
    width: 100%;
    // height: 48/360*100vw;
    line-height: 48/360 * 100vw;
    font-size: 18px;
    background: #8995ad;
    color: white;
    border: none;
    outline: none;
    border-radius: 24/360 * 100vw;
  }
}
</style>