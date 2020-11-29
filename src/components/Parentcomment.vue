<template>
  <div class="parent">
    <Parentcomment v-if="comment.parent" :comment="comment.parent" />
    <div class="parentinfo">
      <div class="name">{{ comment.user.nickname }}</div>
      <div class="date">3小时前</div>
      <div class="reply">回复</div>
    </div>
    <div class="parentComment">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  name: "Parentcomment",
};
</script>

<style lang="less" scoped>
.parent {
  border: 1px solid #ccc;
  padding: 4/360 * 100vw;
  .parentinfo {
    display: flex;
    align-items: center;
    .name {
      font-size: 14/360 * 100vw;
      color: #333;
      margin-right: 10/360 * 100vw;
    }
    .date {
      flex-grow: 1;
      font-size: 12/360 * 100vw;
      color: #707070;
    }
    .reply {
      // width: 24/360 * 100vw;
      font-size: 12/360 * 100vw;
      color: #707070;
    }
  }
  .parentComment {
    font-size: 14/360 * 100vw;
    color: #333;
    margin: 10/360 * 100vw;
  }
}
</style>