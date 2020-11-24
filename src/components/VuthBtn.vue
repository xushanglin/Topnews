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