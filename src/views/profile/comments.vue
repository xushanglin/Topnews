<template>
  <div class="content">
    <Header text="我的跟帖" />
    <!-- 跟帖详情 -->
    <div class="comments" v-for="(item, index) in comments" :key="index">
      <p class="time">2019-10-10 10:25</p>
      <mycomment :comment="item.parent" v-if="item.parent" />
      <p class="message">{{ item.content }}</p>
      <p class="text" @click="$router.push('/details/' + item.post.id)">
        <span class="title">{{ item.post.title }}</span>
        <span class="iconfont iconjiantou1"></span>
      </p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import mycomment from "../../components/mycomment";
export default {
  components: {
    Header,
    mycomment,
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