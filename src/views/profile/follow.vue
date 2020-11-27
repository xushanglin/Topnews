<template>
  <div class="content">
    <Header text="我的关注" />
    <div class="follow" v-for="(item, index) in content" :key="index">
      <img :src="'http://157.122.54.189:9083' + item.head_img" alt="" />
      <div class="message">
        <p>{{ item.nickname }}</p>
        <em>2019-10-10</em>
      </div>
      <div class="btn" @click="unfollow(item.id)">取消关注</div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  data() {
    return {
      content: {},
    };
  },
  components: {
    Header,
  },
  methods: {
    // 渲染数据
    loadPage() {
      this.$axios({
        url: "/user_follows",
      }).then((res) => {
        const { data } = res.data;
        this.content = data;
      });
    },
    unfollow(idx) {
      // console.log(idx);
      this.$axios({
        url: `/user_unfollow/${idx}`,
      }).then((res) => {
        // console.log(res);
        this.$toast.success(res.data.message);
        this.loadPage();
      });
    },
  },
  mounted() {
    this.loadPage();
  },
};
</script>

<style lang="less" scoped>
.follow {
  padding: 30/360 * 100vw;
  border-bottom: 1/360 * 100vw solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    display: block;
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    background-color: tomato;
    border-radius: 50%;
  }
  .message {
    margin-left: -70/360 * 100vw;
    // flex-grow: 1;
    p {
      font-size: 16/360 * 100vw;
    }
    em {
      margin-top: 10/360 * 100vw;
      font-style: normal;
      font-size: 14/360 * 100vw;
      color: #ccc;
    }
  }
  .btn {
    width: 73/360 * 100vw;
    height: 30/360 * 100vw;
    background-color: #e1e1e1;
    border-radius: 15/360 * 100vw;
    font-size: 12/360 * 100vw;
    text-align: center;
    line-height: 30/360 * 100vw;
  }
}
</style>