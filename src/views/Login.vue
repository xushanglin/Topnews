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
      @sendValue="getname"
      type="text"
      title="请输入用户名/手机号"
      errMsg="请输入6位账号"
      :rule="/^.{5,10}$/"
    />

    <Vuthinput
      @sendValue="getpwd"
      type="password"
      title="请输入密码"
      errMsg="请输入6到12位密码"
      :rule="/^\d{6,12}$/"
    />

    <!-- 登录按钮 -->
    <VuthBtn @clicked="getLogin" btnText="登录" />
  </div>
</template>

<script>
import Vuthinput from "../components/VuthInput";
import VuthBtn from "../components/VuthBtn";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    getname(msg) {
      this.username = msg;
      // console.log(this.username);
    },
    getpwd(msg) {
      this.password = msg;
      // console.log(this.password);
    },
    getLogin() {
      // console.log(msg);
      this.$axios({
        url: "http://157.122.54.189:9083/login",
        method: "POST",
        data: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.statusCode === 401) {
          this.$toast.fail(res.data.message);
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    },
  },
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