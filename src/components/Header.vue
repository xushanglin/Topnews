<template>
  <header>
    <span @click="$router.back()" class="iconfont iconjiantou2"></span
    >{{ text }}
  </header>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style lang="less" scoped>
header {
  margin-bottom: 20/360 * 100vw;
  padding: 20/360 * 100vw 30/360 * 100vw 0 30/360 * 100vw;
  text-align: center;
  font-weight: 700;
  font-size: 14/360 * 100vw;
  span {
    float: left;
  }
}
</style>