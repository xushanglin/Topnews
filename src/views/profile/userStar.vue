<template>
  <div class="content">
    <Header text="我的收藏" />
    <Postlist
      v-for="post in Postlist"
      :key="post.id"
      :post="post"
      @click.native="goDetails(post.id)"
    />
  </div>
</template>

<script>
import Header from "../../components/Header";
import Postlist from "../../components/PostList";
export default {
  components: {
    Header,
    Postlist,
  },
  data() {
    return {
      Postlist: [],
    };
  },
  created() {
    this.$axios({
      url: "/user_star",
    }).then((res) => {
      console.log(res);
      this.Postlist = res.data.data;
    });
  },
  methods: {
    // 详情
    goDetails(id) {
      this.$router.push("/details/" + id);
    },
  },
  mounted() {
    this.$axios({
      url: "/user_star",
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>