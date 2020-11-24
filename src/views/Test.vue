<template>
  <div>
    <Postlist v-for="post in Postlist" :key="post.id" :post="post" />
  </div>
</template>

<script>
import Postlist from "../components/PostList";
export default {
  components: {
    Postlist,
  },
  data() {
    return {
      Postlist: [],
    };
  },
  created() {
    this.$axios({
      url: "/post",
    }).then((res) => {
      console.log(res);
      this.Postlist = res.data.data;
    });
  },
};
</script>

<style>
</style>