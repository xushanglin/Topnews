<template>
  <div>
    <!-- 图片新闻 -->
    <div class="nomalPost" v-if="details.type == 1">
      <div class="topnav">
        <div class="icon">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <div
          @click="goStar"
          class="button"
          :class="{ active: details.has_follow }"
        >
          {{ details.has_follow ? "已关注" : "关注" }}
        </div>
      </div>
      <div class="details">
        <div class="img">
          <div class="title">{{ details.title }}</div>
          <div class="info">{{ details.user.nickname }} 2019-10-10</div>
          <div class="content" v-html="details.content"></div>
        </div>
      </div>
    </div>
    <!-- 视频新闻 -->
    <div class="videoNews" v-if="details.type == 2">
      <video controls :src="details.content"></video>
      <div class="user">
        <div class="info">
          <img
            :src="$axios.defaults.baseURL + details.user.head_img"
            class="logo"
          />
          <div class="nickname">11222</div>
        </div>
        <div
          @click="goStar"
          class="button"
          :class="{ active: details.has_follow }"
        >
          {{ details.has_follow ? "已关注" : "关注" }}
        </div>
      </div>
      <div class="title">{{ details.title }}</div>
    </div>
    <div class="iconBtn">
      <div class="dianzan" @click="goLike">
        <span
          class="iconfont icondianzan"
          :class="{ active: details.has_like }"
        ></span>
        <!-- <span  class="iconfont icondianzan"></span> -->
        {{ details.like_length }}
      </div>
      <div class="weixin"><span class="iconfont iconweixin"></span>微信</div>
    </div>
    <div class="maincomment" v-if="commentList.length > 0">
      <h2>精彩跟帖</h2>
      <Maincomment
        v-for="comment in commentList"
        :key="comment.id"
        :commentData="comment"
      />
      <div
        class="morecomment"
        @click="$router.push('/morecomments/' + $route.params.id)"
      >
        更多跟帖
      </div>
    </div>
    <div class="maincomment" v-else>
      <h2>精彩跟帖</h2>
      <span>暂无跟帖，抢占沙发</span>
    </div>
    <sendComment @star="getStar" />
  </div>
</template>

<script>
import sendComment from "../../components/sendComment";
import Maincomment from "../../components/comment/Maincomment";
export default {
  components: {
    sendComment,
    Maincomment,
  },
  data() {
    return {
      details: {},
      userid: "",
      commentList: {},
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
          params: {
            pageIndex: 1,
            pageSize: 3,
          },
        }).then((res) => {
          console.log(res);
          this.commentList = res.data.data;
        });
      });
    },
    // 关注按钮
    goStar() {
      if (this.details.has_follow == false) {
        this.$axios({
          url: "/user_follows/" + this.details.user.id,
        });
        this.details.has_follow = true;
      } else {
        this.$axios({
          url: "/user_unfollow/" + this.details.user.id,
        });
        this.details.has_follow = false;
      }
    },
    // 点赞事件
    goLike() {
      if (this.details.has_like == false) {
        this.getLike();
        this.details.has_like = true;
        this.details.like_length++;
      } else {
        this.getLike();
        this.details.has_like = false;
        this.details.like_length--;
      }
    },
    getLike() {
      this.$axios({
        url: "/post_like/" + this.details.id,
      }).then((res) => {
        this.$toast(res.data.message);
      });
    },
    // 收藏
    getStar() {
      this.$axios({
        url: "/post_star/" + this.details.id,
      }).then((res) => {
        // console.log(res);
        this.$toast(res.data.message);
      });
    },
  },
};
</script>

<style lang="less">
body {
  background-color: #f2f2f2;
}
.nomalPost {
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
  }
}

.videoNews {
  video {
    width: 100%;
  }
  .user {
    padding: 16/360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      display: flex;
      align-items: center;
      .logo {
        width: 30/360 * 100vw;
        height: 30/360 * 100vw;
        border-radius: 50%;
        object-fit: cover;
      }
      .nickname {
        font-size: 13/360 * 100vw;
        color: #888;
        padding-left: 10/360 * 100vw;
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
  .title {
    padding: 16/360 * 100vw;
    padding-top: 20/360 * 100vw;
    font-size: 16/360 * 100vw;
    color: #333;
  }
}
.iconBtn {
  display: flex;
  justify-content: space-evenly;
  padding: 30/360 * 100vw 0 30/360 * 100vw;
  border-bottom: 3/360 * 100vw solid #e4e4e4;
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
.maincomment {
  margin-bottom: 120/360 * 100vw;
  span {
    text-align: center;
    display: block;
    // margin: 30/360 * 100vw auto;
    margin-top: 20/360 * 100vw;
    font-size: 16/360 * 100vw;
    color: #888;
  }
  h2 {
    margin-top: 20/360 * 100vw;
    color: #333;
    text-align: center;
    font-weight: normal;
  }
  .morecomment {
    text-align: center;
    height: 30/360 * 100vw;
    width: 120/360 * 100vw;
    border: 1px solid #ccc;
    border-radius: 15/360 * 100vw;
    margin: 30/360 * 100vw auto;
  }
}
</style>