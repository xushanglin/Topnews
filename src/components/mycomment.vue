<template>
  <div class="parent">
    <Parentcomment v-if="comment.parent" :comment="comment.parent" />
    <div class="parentinfo">
      <div class="name">回复：{{ comment.user.nickname }}</div>
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
  border-radius: 6/360 * 100vw;
  padding: 4/360 * 100vw;
  background-color: #e4e4e4;
  // opacity: 0.8;
  .parentinfo {
    display: flex;
    align-items: center;
    .name {
      font-size: 14/360 * 100vw;
      color: #333;
      margin-right: 10/360 * 100vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .date {
      flex-grow: 1;
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