<template>
  <div class="content">
    <Header text="我的关注" />
    <div v-for="item in content" :key="item">
      <gzliebiao :msg="item" />
    </div>
  </div>
</template>

<script>
import gzliebiao from "../components/gzliebiao";
import Header from "../components/Header";
export default {
  data() {
    return {
      content: "",
    };
  },
  components: {
    gzliebiao,
    Header,
  },
  mounted() {
    this.$axios({
      url: "http://157.122.54.189:9083/user_follows",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      const { data } = res.data;
      //   this.nickname = data.nickname;
      //   this.src = data.head_img;
      this.content = data;
      console.log(this.content);
    });
  },
};
</script>

<style lang="less" scoped>
</style>