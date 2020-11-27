<template>
  <div>
    <div class="topnav">
      <div class="icon">
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
        <span class="iconfont iconnew"></span>
      </div>
      <div v-if="details.has_follow == false" class="button" @click="getFollow">
        关注
      </div>
      <div v-else class="button active" @click="getUnfollow">已关注</div>
    </div>
    <div class="details">
      <div class="title">{{ details.title }}</div>
      <div class="info">{{ details.user.nickname }} 2019-10-10</div>
      <div class="content" v-html="details.content"></div>
      <div class="icon">
        <div class="dianzan" @click="getLike">
          <span
            v-if="details.has_like == true"
            class="iconfont icondianzan active"
          ></span>
          <span v-else class="iconfont icondianzan"></span>
          {{ details.like_length }}
        </div>
        <div class="weixin"><span class="iconfont iconweixin"></span>微信</div>
      </div>
    </div>
    <sendComment @star="getStar" />
  </div>
</template>

<script>
import sendComment from "../../components/sendComment";
export default {
  components: {
    sendComment,
  },
  data() {
    return {
      details: {},
      userid: "",
    };
  },
  created() {
    this.Loadpage();
  },
  methods: {
    Loadpage() {
      this.$axios({
        url: "/post/" + this.$route.params.id,
      }).then((res) => {
        console.log(res);
        this.details = res.data.data;
        this.$axios({
          url: "/post_comment/" + this.details.id,
        }).then((res) => {
          console.log(res);
        });
      });
    },
    //   关注事件
    getFollow() {
      this.$axios({
        url: "/user_follows/" + this.details.user.id,
      }).then((res) => {
        console.log(res);
        this.Loadpage();
      });
    },
    // 取消关注
    getUnfollow() {
      this.$axios({
        url: "/user_unfollow/" + this.details.user.id,
      }).then((res) => {
        console.log(res);
        this.Loadpage();
      });
    },
    // 点赞事件
    getLike() {
      this.$axios({
        url: "/post_like/" + this.details.id,
      }).then((res) => {
        // console.log(res);
        this.$toast(res.data.message);
        this.Loadpage();
      });
    },
    // 收藏
    getStar() {
      this.$axios({
        url: "/post_star/" + this.details.id,
      }).then((res) => {
        console.log(res);
        this.$toast(res.data.message);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.topnav {
  padding: 16/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    .iconjiantou2 {
      font-size: 12/360 * 100vw;
      margin-right: 8/360 * 100vw;
    }
    .iconnew {
      font-size: 54/360 * 100vw;
    }
  }
  .button {
    width: 62/360 * 100vw;
    height: 26/360 * 100vw;
    background-color: #ff0000;
    border-radius: 13/360 * 100vw;
    font-size: 12/360 * 100vw;
    text-align: center;
    line-height: 26/360 * 100vw;
    color: #fff;
  }
  .active {
    background-color: #f2f2f2;
    color: #333;
  }
}
.details {
  padding: 0 16/360 * 100vw;
  .title {
    font-size: 18/360 * 100vw;
    font-weight: 700;
  }
  .info {
    margin: 10/360 * 100vw 0;
    font-size: 13/360 * 100vw;
    color: #868686;
  }
  /deep/.content {
    margin: 10/360 * 100vw 0;
    font-size: 14/360 * 100vw;
    color: #333;
    img {
      width: 100%;
      // height: 340/360 * 100vw;
      object-fit: cover;
    }
  }
  .icon {
    display: flex;
    justify-content: space-evenly;
    margin: 30/360 * 100vw 0 20/360 * 100vw;
    div {
      display: block;
      // padding: 0 30/360 * 100vw;
      width: 79/360 * 100vw;
      height: 29/360 * 100vw;
      border: 1px solid #e4e4e4;
      font-size: 13/360 * 100vw;
      text-align: center;
      line-height: 29/360 * 100vw;
      border-radius: 15/360 * 100vw;
      span {
        margin-right: 5/360 * 100vw;
        font-size: 17/360 * 100vw;
      }
      .active {
        color: #ff0000;
      }
      .iconweixin {
        color: #01c801;
      }
    }
  }
}
</style>