<template>
  <div class="inputWrapper">
    <input
      @blur="showErrTip"
      :type="type"
      :placeholder="title"
      v-model="inputValue"
      :class="{
        error: !isOk,
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      isOk: true,
    };
  },
  // 接收父组件的传递信息
  // 用prop注册接收
  props: ["title", "type", "rule", "errMsg"],
  watch: {
    inputValue(newValue) {
      if (this.rule.test(newValue)) {
        this.isOk = true;
      } else {
        this.isOk = false;
        console.log(this.errMsg);
      }
    },
  },
  methods: {
    showErrTip() {
      if (!this.isOk) {
        this.$toast.fail(this.errMsg);
      }
    },
  },
};
</script>

<style lang="less">
.inputWrapper {
  padding-bottom: 16/360 * 100vw;
  input {
    box-sizing: border-box;
    padding: 0 15/360 * 100vw;
    width: 100%;
    height: 48/360 * 100vw;
    line-height: 48/360 * 100vw;
    font-size: 16/360 * 100vw;
    border: none;
    outline: none;
    border-radius: 24/360 * 100vw;
    background-color: #e9ebec;
    // border-bottom: 1px solid #ccc;
    color: #ccc;
  }
  // .succes {
  //   box-shadow: 0px 0px 10px 0px #54f737;
  // }
  .error {
    box-shadow: 0px 0px 10px 0px #f58f7d;
  }
}
</style>