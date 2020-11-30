<template>
  <div>
    <Header text="更多跟帖" />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Maincomment
        v-for="comment in commentList"
        :key="comment.id"
        :commentData="comment"
      />
    </van-list>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Maincomment from "../../components/comment/Maincomment";
export default {
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
    };
  },
  components: {
    Header,
    Maincomment,
  },
  methods: {
    onLoad() {
      this.pageIndex++;
      this.loadPage();
    },
    loadPage() {
      this.$axios({
        url: "/post_comment/" + this.$route.params.id,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        //   console.log(res);
        this.commentList = [...this.commentList, ...res.data.data];
        this.loading = false;
        if (res.data.data.length < this.pageSize) {
          this.finished = true;
        }
      });
    },
  },
  created() {
    this.loadPage();
  },
};
</script>

<style>
</style>