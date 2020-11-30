<template>
  <div>
    <Header text="更多跟帖" />
    <Maincomment
      v-for="comment in commentList"
      :key="comment.id"
      :commentData="comment"
    />
  </div>
</template>

<script>
import Header from "../../components/Header";
import Maincomment from "../../components/comment/Maincomment";
export default {
  data() {
    return {
      commentList: [],
    };
  },
  components: {
    Header,
    Maincomment,
  },
  created() {
    this.$axios({
      url: "/post_comment/" + this.$route.params.id,
    }).then((res) => {
      //   console.log(res);
      this.commentList = res.data.data;
    });
  },
};
</script>

<style>
</style>