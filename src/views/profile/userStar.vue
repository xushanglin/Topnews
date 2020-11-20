<template>
  <div class="content">
    <Header text="我的收藏" />
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  components: {
    Header,
  },
  mounted() {
    this.$axios({
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      url: "http://157.122.54.189:9083/user_star",
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>