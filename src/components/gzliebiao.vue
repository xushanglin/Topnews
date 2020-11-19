<template>
  <div class="link">
    <img :src="'http://157.122.54.189:9083' + msg.head_img" alt="" />
    <div class="message">
      <p>{{ msg.nickname }}</p>
      <em>2019-10-10</em>
    </div>
    <div class="btn">取消关注</div>
  </div>
</template>

<script>
export default {
  props: ["msg"],
};
</script>

<style lang="less" scoped>
.link {
  margin-top: 20/360 * 100vw;
  padding: 30/360 * 100vw;
  border-bottom: 1/360 * 100vw solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    display: block;
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    background-color: tomato;
    border-radius: 50%;
  }
  .message {
    margin-left: -70/360 * 100vw;
    p {
      font-size: 16/360 * 100vw;
    }
    em {
      margin-top: 10/360 * 100vw;
      font-style: normal;
      font-size: 14/360 * 100vw;
      color: #ccc;
    }
  }
  .btn {
    width: 73/360 * 100vw;
    height: 30/360 * 100vw;
    background-color: #e1e1e1;
    border-radius: 15/360 * 100vw;
    font-size: 12/360 * 100vw;
    text-align: center;
    line-height: 30/360 * 100vw;
  }
}
</style>