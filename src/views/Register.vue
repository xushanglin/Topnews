<template>
  <div class="container">
    <div class="btnClose">
      <span class="iconfont iconicon-test"></span>
    </div>

    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <VuthInput
      @sendValue="getNickname"
      type="text"
      title="请输入昵称"
      errMsg="不合法昵称"
      :rule="/^.{1,6}$/"
    />
    <VuthInput
      @sendValue="getname"
      type="text"
      title="请输入用户名/手机号"
      errMsg="请输入6位账号"
      :rule="/^.{5,12}$/"
    />
    <VuthInput
      @sendValue="getpwd"
      type="password"
      title="请输入密码"
      errMsg="请输入6到12位密码"
      :rule="/^\d{3,12}$/"
    />
    <VuthBtn btnText="注册" @clicked="register" />
  </div>
</template>

<script>
import VuthInput from "../components/VuthInput";
import VuthBtn from "../components/VuthBtn";
export default {
  data() {
    return {
      nickname: "",
      username: "",
      password: "",
    };
  },
  methods: {
    // 接收子组件传过来的账号
    getname(msg) {
      this.username = msg;
    },
    getpwd(msg) {
      this.password = msg;
    },
    getNickname(msg) {
      this.nickname = msg;
    },
    // 注册事件
    register() {
      this.$axios({
        method: "post",
        url: "/register",
        data: {
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        },
      }).then((res) => {
        // console.log(res);
        if (res.data.message === "注册成功") {
          this.$toast.fail(res.data.message);
          window.location.href = "#/login";
        }
      });
    },
  },
  components: {
    VuthInput,
    VuthBtn,
  },
};
</script>
// 加入scoped就不会全局影响样式
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