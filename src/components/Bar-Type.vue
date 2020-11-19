<template>
  <div class="bar-type">
    <div class="information">{{ title }}</div>
    <p>{{ msg }} <span class="iconfont iconjiantou1"></span></p>
  </div>
</template>

<script>
export default {
  props: ["title", "msg"],
};
</script>

<style lang="less" scoped>
.bar-type {
  margin-left: 30/360 * 100vw;
  height: 60/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5/360 * 100vw solid #ccc;
  .information {
    font-size: 16/360 * 100vw;
  }
  p {
    margin-right: 30/360 * 100vw;
    font-size: 13/360 * 100vw;
    color: rgba(148, 148, 148, 0.866666666666667);
  }
}
</style>