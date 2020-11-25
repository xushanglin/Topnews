<template>
  <div>
    <div class="content">
      <Header text="我的" />
      <div class="user" @click="goEdit">
        <div class="user-logo">
          <img v-if="src" :src="'http://157.122.54.189:9083' + src" />
          <img v-else src="@/assets/logo.png" alt="" />
        </div>
        <div class="message">
          <div>
            <p>
              <span v-if="gender === 1" class="iconfont iconxingbienan"></span>
              <span v-else class="iconfont iconxingbienv"></span>
              <i>{{ nickname }}</i>
            </p>
            <em>2019-10-10</em>
          </div>
          <div class="arrows"><span class="iconfont iconjiantou1"></span></div>
        </div>
      </div>
      <!-- 条形框 -->
      <Bartype title="我的关注" msg="关注的用户" @click.native="getGz" />
      <Bartype title="我的跟帖" msg="跟帖/回复" @click.native="getComments" />
      <Bartype title="我的收藏" msg="文章/视频" @click.native="getStar" />
      <Bartype title="设置" />
      <Bartype title="退出" @click.native="logOut" />
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Bartype from "@/components/Bar-Type";
export default {
  components: {
    Bartype,
    Header,
  },
  data() {
    return {
      nickname: "",
      src: "",
      userid: localStorage.getItem("userId"),
      gender: "",
    };
  },
  methods: {
    getGz() {
      window.location.href = "#/follow";
    },
    // 退出登录，清空本地token和id
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$toast.success("退出成功");
      // 跳转到登录页
      this.$router.replace("/login");
    },
    // 评论
    getComments() {
      window.location.href = "#/comments";
    },
    getStar() {
      window.location.href = "#/userstar";
    },
    goEdit() {
      window.location.href = "#/edituser";
    },
  },
  mounted() {
    this.$axios({
      url: `/user/${this.userid}`,
      //   params: {
      //     id: this.userid,
      //   },
    }).then((res) => {
      const { message, data } = res.data;
      if (message == "获取成功") {
        this.src = data.head_img;
        this.nickname = data.nickname;
        this.gender = data.gender;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.content {
  background-color: #f2f2f2;
  // height: 635/360 * 100vw;
  min-height: 100vh;
  .user {
    padding: 35/360 * 100vw 30/360 * 100vw;
    display: flex;
    align-items: center;
    background: -webkit-linear-gradient(right, pink, #54a9e2);
    border-bottom: 4/360 * 100vw solid #ccc;
    .user-logo {
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      overflow: hidden;
      img {
        // display: block;
        width: 100%;
        border-radius: 50%;
        transform: scale(1.3);
      }
    }
    .message {
      margin-left: 15/360 * 100vw;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18/360 * 100vw;
      p {
        margin-bottom: 10/360 * 100vw;
        .iconxingbienan {
          color: #94c8ef;
          font-size: 18/360 * 100vw;
        }
        .iconxingbienv {
          color: pink;
          font-size: 18/360 * 100vw;
        }
        i {
          font-style: normal;
        }
      }
      em {
        font-style: normal;
        color: #a0a0a3;
        font-size: 18/360 * 100vw;
      }
      .arrows {
        .iconfont {
          font-size: 18/360 * 100vw;
        }
      }
    }
  }
}
</style>