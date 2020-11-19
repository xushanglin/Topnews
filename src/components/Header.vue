<template>
  <header><span class="iconfont iconjiantou2"></span>{{ text }}</header>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style lang="less" scoped>
.content {
  header {
    padding: 20/360 * 100vw 30/360 * 100vw 0 30/360 * 100vw;
    text-align: center;
    font-weight: 700;
    span {
      float: left;
    }
  }
}
</style>