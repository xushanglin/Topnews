<template>
  <div class="btnSubmit">
    <button @click="getLogin">{{ btnText }}</button>
  </div>
</template>

<script>
export default {
  props: ["btnText"],
  methods: {
    getLogin() {
      this.$emit("clicked");
      //     this.$axios({
      //       url: "http://157.122.54.189:9083/login",
      //       method: "POST",
      //       data: {
      //         username: this.push_name,
      //         password: this.push_pwd,
      //       },
      //     }).then((res) => {
      //       console.log(res);
      //       if (res.data.statusCode === 401) {
      //         this.$toast.fail(res.data.message);
      //       } else {
      //         this.$toast.fail(res.data.message);
      //       }
      //     });
    },
  },
};
</script>

<style lang="less">
.btnSubmit {
  padding-top: 26/360 * 100vw;
  button {
    width: 100%;
    // height: 48/360*100vw;
    line-height: 48/360 * 100vw;
    font-size: 18px;
    background: #8995ad;
    color: white;
    border: none;
    outline: none;
    border-radius: 24/360 * 100vw;
  }
}
</style>