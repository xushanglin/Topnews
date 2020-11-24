<template>
  <header>
    <!-- logo -->
    <span class="iconfont iconnew"></span>
    <div class="input">
      <span class="iconfont iconsearch"></span>
      <em>搜索新闻</em>
    </div>
    <span
      class="iconfont iconwode"
      @click="$router.push('../userindex')"
    ></span>
  </header>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
header {
  width: 100%;
  height: 49/360 * 100vw;
  background-color: #ff0000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .iconnew {
    font-size: 54/360 * 100vw;
    color: #fff;
  }
  .input {
    width: 210/360 * 100vw;
    height: 34/360 * 100vw;
    outline: none;
    border: none;
    border-radius: 17/360 * 100vw;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    .iconfont {
      font-size: 14/360 * 100vw;
      margin-top: 3/360 * 100vw;
      margin-right: 5/360 * 100vw;
    }
    em {
      font-style: normal;
      font-size: 14/360 * 100vw;
    }
  }
  .iconwode {
    font-size: 32/360 * 100vw;
    color: #fff;
    opacity: 0.6;
  }
}
</style>