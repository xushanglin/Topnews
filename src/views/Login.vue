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
      @sendValue="getname(arguments)"
      type="text"
      title="请输入用户名/手机号"
      errMsg="请输入6位账号"
      :rule="/^.{5,12}$/"
    />

    <Vuthinput
      @sendValue="getpwd(arguments)"
      type="password"
      title="请输入密码"
      errMsg="请输入6到12位密码"
      :rule="/^\d{1,12}$/"
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
      nameStatus: "",
      pwdStatus: "",
    };
  },
  methods: {
    getname(e) {
      this.username = e[0];
      // console.log(e[0], e[1]);
      this.nameStatus = e[1];
    },
    getpwd(e) {
      this.password = e[0];
      this.pwdStatus = e[1];
      // console.log(this.password);
    },
    getLogin() {
      // console.log(msg);
      // 的判断正则表达式是否正确，否则禁止登录
      if (this.nameStatus === true && this.pwdStatus === true) {
        this.$axios({
          url: "/login",
          method: "POST",
          data: {
            username: this.username,
            password: this.password,
          },
        }).then((res) => {
          console.log(res);
          if (res.data.message === "登录成功") {
            // 数据都在 res.data 里面
            const { message, data } = res.data;
            // 这里登陆成功, 除了弹窗, 现在还需要记录 token 和用户 id
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            this.$toast.success(res.data.message);
            window.location.href = "#/userindex";
          }
        });
      } else {
        this.$toast.fail("输入正确的账号或密码");
      }
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