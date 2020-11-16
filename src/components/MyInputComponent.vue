<template>
  <div>
    <!-- 用属性的方式接收父组件传过来的数据  v-model双向绑定-->
    <input type="text" v-model="message" :placeholder="title" />
    <button @click="sendMsg">提交信息</button>
  </div>
</template>

<script>
export default {
  // 接收父组件的传递信息
  // 用prop注册接收
  props: ["title"],
  data() {
    return {
      message: "",
    };
  },
  methods: {
    // 定义方法通知父组件$emit()
    sendMsg() {
      this.$emit("infoMsg", this.message);
    },
  },
};
</script>

<style>
</style>