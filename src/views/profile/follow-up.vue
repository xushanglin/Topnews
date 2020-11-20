<template>
  <div class="content">
    <Header text="我的跟帖" />
    <!-- 跟帖详情 -->
    <div class="comments" v-for="item in comments" :key="item">
      <p class="time">2019-10-10 10:25</p>
      <p class="message">{{ item.content }}</p>
      <p class="text"></p>
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
      url: "http://157.122.54.189:9083/user_comments",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
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
    color: #ccc;
  }
  .message {
    font-size: 14/360 * 100vw;
  }
}
</style>