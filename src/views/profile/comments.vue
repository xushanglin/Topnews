<template>
  <div class="content">
    <Header text="我的跟帖" />
    <!-- 跟帖详情 -->
    <div class="comments" v-for="(item, index) in comments" :key="index">
      <p class="time">2019-10-10 10:25</p>
      <div class="parent" v-if="item.parent">
        <div class="nickname">回复：{{ item.parent.user.nickname }}</div>
        <div class="content">{{ item.parent.content }}</div>
      </div>
      <p class="message">{{ item.content }}</p>
      <p
        class="text"
        @click="$router.push('/details/' + item.post.id)"
        v-if="item.post.title"
      >
        <span class="title">{{ item.post.title }}</span>
        <span class="iconfont iconjiantou1"></span>
      </p>
      <p class="text" v-else>
        <span class="title">此贴已被删除</span>
        <span class="iconfont iconjiantou1"></span>
      </p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
  data() {
    return {
      comments: "",
    };
  },
  mounted() {
    this.$axios({
      url: "/user_comments",
      params: {},
    }).then((res) => {
      const data = res.data.data;
      this.comments = data;
      console.log(this.comments);
    });
  },
};
</script>

<style lang="less">
.comments {
  padding: 20/360 * 100vw 30/360 * 100vw;
  border-bottom: 1px solid #ccc;
  .time {
    margin-bottom: 20/360 * 100vw;
    font-size: 14/360 * 100vw;
    color: #797979;
  }
  .parent {
    background-color: #e4e4e4;
    padding: 16/360 * 100vw 10/360 * 100vw;
    border-radius: 10/360 * 100vw;
    .nickname {
      font-size: 12/360 * 100vw;
      margin-bottom: 10/360 * 100vw;
      color: #868686;
    }
    .content {
      font-size: 14/360 * 100vw;
      color: #868686;
    }
  }
  .message {
    font-size: 14/360 * 100vw;
    margin-top: 10/360 * 100vw;
  }
  .text {
    margin-top: 10/360 * 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13/360 * 100vw;
    color: #797979;
    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>