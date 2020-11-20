<template>
  <div class="content">
    <Header @click="getOut" text="我的关注" />
    <div v-for="(item, index) of content" :key="index">
      <follow :msg="item" />
    </div>
    <!-- <input type="text" v-model="userid" />
    <button @click="followuser">关注</button> -->
  </div>
</template>

<script>
import follow from "@/components/follow";
import Header from "@/components/Header";
export default {
  data() {
    return {
      content: "",
      userid: "",
    };
  },
  components: {
    follow,
    Header,
  },
  methods: {
    getOut() {
      this.$router.push("/userindex");
    },
    // followuser() {
    //   this.$axios({
    //     url: `http://157.122.54.189:9083/user_follows/${this.userid}`,
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // },

    // unfollow(idx) {
    //   // console.log(idx);
    //   this.$axios({
    //     headers: {
    //       Authorization: localStorage.getItem("token"),
    //     },
    //     url: `http://157.122.54.189:9083/user_unfollow/${idx}`,
    //   }).then((res) => {
    //     // console.log(res);
    //     this.$toast.success(res.data.message);
    //     this.$router.push("/attention").catch((err) => {});
    //   });
    // },
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