<template>
  <div>
    <!-- 用属性的方式接收父组件传过来的数据 -->
    <input type="text" :placeholder="title" />
    <button>提交信息</button>
  </div>
</template>

<script>
export default {
  // 接收父组件的传递信息
  // 用prop注册接收
  props: ["title"],
};
</script>

<style>
</style>