<template>
  <div>
    <Header text="精彩跟帖" />
    <div class="commentMain" v-for="comment in comments" :key="comment.id">
      <div class="info">
        <img
          :src="$axios.defaults.baseURL + comment.user.head_img"
          alt=""
          class="logo"
        />
        <div class="data">
          <div class="nickname">{{ comment.user.nickname }}</div>
          <div class="time">2小时前</div>
        </div>
        <div class="reply">回复</div>
      </div>
      <Parentcomment :comment="comment" v-if="comment.parent" />
      <div class="comment">{{ comment.content }}</div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Parentcomment from "../components/Parentcomment";
export default {
  components: {
    Header,
    Parentcomment,
  },
  data() {
    return {
      comments: {},
    };
  },
  created() {
    this.$axios({
      url: "/post_comment/2",
    }).then((res) => {
      console.log(res);
      this.comments = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.commentMain {
  padding: 20/360 * 100vw 15/360 * 100vw;
  border-bottom: 1px solid #ccc;
  .info {
    display: flex;
    align-items: center;
    margin-bottom: 10/360 * 100vw;
    .logo {
      width: 35/360 * 100vw;
      height: 35/360 * 100vw;
      object-fit: cover;
      border-radius: 50%;
    }
    .data {
      flex-grow: 1;
      padding-left: 10/360 * 100vw;
      .nickname {
        width: 230/360 * 100vw;
        font-size: 14/360 * 100vw;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .time {
        font-size: 12/360 * 100vw;
        color: #707070;
      }
    }
    .reply {
      // width: 24/360 * 100vw;
      font-size: 12/360 * 100vw;
      color: #707070;
    }
  }
  .comment {
    // padding: 10/360 * 100vw;
    margin-top: 15/360 * 100vw;
    font-size: 14/360 * 100vw;
    color: #333;
  }
}
</style>