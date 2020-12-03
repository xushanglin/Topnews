<template>
  <div>
    <Header text="更多跟帖" />
    <Maincomment
      v-for="(comment, index) in commentList"
      :key="index"
      :commentData="comment"
    />
    <SendComment @reloadComment="loadPage()" />
  </div>
</template>

<script>
import Header from "../../components/Header";
import Maincomment from "../../components/comment/Maincomment";
import SendComment from "../../components/sendComment";
export default {
  data() {
    return {
      commentList: [],
    };
  },
  components: {
    Header,
    Maincomment,
    SendComment,
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/post_comment/" + this.$route.params.id,
      }).then((res) => {
        //   console.log(res);
        this.commentList = res.data.data;
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