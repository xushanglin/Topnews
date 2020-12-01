<template>
  <div class="parent">
    <Parentcomment v-if="comment.parent" :comment="comment.parent" />
    <div class="parentinfo">
      <div class="name">{{ comment.user.nickname }}</div>
      <div class="date">3小时前</div>
      <div class="reply" @click="callReply()">回复</div>
    </div>
    <div class="parentComment">{{ comment.content }}</div>
  </div>
</template>

<script>
import eventBus from "../../util/eventBus";
export default {
  props: ["comment"],
  name: "Parentcomment",
  methods: {
    callReply() {
      // 引入eventBus实例
      // 并emit通知给这个vue实例
      eventBus.$emit("sendMsg", this.comment.id);
    },
  },
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
    // width: 280/360 * 100vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>