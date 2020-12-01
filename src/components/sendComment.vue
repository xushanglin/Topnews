<template>
  <div class="content">
    <!-- 未激活状态 -->
    <div class="disable" v-if="!isactive">
      <div class="post">
        <input
          type="text"
          v-model="comment"
          @focus="showTextarea"
          placeholder="写跟帖"
        />
      </div>
      <span class="iconfont iconpinglun-"></span>
      <span class="iconfont iconshoucang" @click="getStar()"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <!-- 激活状态 -->
    <div class="enable" v-else>
      <textarea
        v-model="comment"
        rows="3"
        @blur="hideTextarea"
        ref="textarea"
        :placeholder="'回复:@' + nickname"
      ></textarea>
      <div class="send" @click="sendComment">发送</div>
    </div>
  </div>
</template>

<script>
import eventBus from "../util/eventBus";
export default {
  data() {
    return {
      isactive: false,
      comment: "",
      post: {},
      parentid: "",
      nickname: "",
    };
  },
  mounted() {
    // 在挂载完毕用
    // $on来监听其他组件的请求事件
    eventBus.$on("sendMsg", (id, name) => {
      console.log("我点击回复评论触发了textarea框了");
      this.showTextarea();
      // console.log(name);
      this.parentid = id;
      this.nickname = name;
    });
  },
  // 用事件总线必须有销毁监听的事件
  // 用$off
  destroyed() {
    eventBus.$off("sendMsg");
  },
  methods: {
    showTextarea() {
      this.isactive = true;
      // nexeTick()函数是等页面渲染完再执行事件
      this.$nextTick(() => {
        this.$refs.textarea.focus();
      });
    },
    hideTextarea() {
      setTimeout(() => {
        this.parentid = "";
        this.nickname = "";
        this.isactive = false;
      }, 100);
    },
    sendComment() {
      this.$axios({
        method: "post",
        url: "/post_comment/" + this.$route.params.id,
        data: {
          content: this.comment,
          parent_id: this.parentid,
        },
      }).then((res) => {
        // console.log(res);
        this.$toast.success(res.data.message);
        this.comment = "";
        this.$emit("reloadComment");
      });
    },
    getStar() {
      this.$axios({
        url: "/post_star/" + this.$route.params.id,
      }).then((res) => {
        this.$toast(res.data.message);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  position: fixed;
  bottom: 0;
  width: 360/360 * 100vw;
  background-color: #f2f2f2;
  .disable {
    display: flex;
    // justify-content: space-evenly;
    align-items: center;
    padding: 10/360 * 100vw 16/360 * 100vw;

    .post {
      input {
        box-sizing: border-box;
        padding-left: 15/360 * 100vw;
        margin-right: 40/360 * 100vw;
        // flex-grow: 1;
        width: 181/360 * 100vw;
        height: 31/360 * 100vw;
        line-height: 31/360 * 100vw;
        border-radius: 15/360 * 100vw;
        font-size: 13/360 * 100vw;
        color: #333;
        background-color: rgba(0, 0, 0, 0.1);
        outline: none;
        border: none;
      }
    }
    .active {
      color: #d7ba7d;
    }
    .iconfont {
      font-size: 23/360 * 100vw;
      margin-right: 18/360 * 100vw;
    }
    .iconpinglun- {
      position: relative;
      &::after {
        position: absolute;
        top: -5/360 * 100vw;
        left: 5/360 * 100vw;
        content: "255";
        // width: 20/360 * 100vw;
        height: 16/360 * 100vw;
        line-height: 16/360 * 100vw;
        padding: 0 5/360 * 100vw;
        font-size: 10/360 * 100vw;
        color: #fff;
        background-color: red;
        border-radius: 13/360 * 100vw;
      }
    }
  }
  .enable {
    display: flex;
    // align-items: space-between;
    padding: 10/360 * 100vw 16/360 * 100vw;
    // justify-content: space-between;
    align-items: flex-end;
    textarea {
      padding: 10/360 * 100vw;
      margin-right: 15/360 * 100vw;
      width: 260/360 * 100vw;
      border: none;
      border-radius: 8/360 * 100vw;
      resize: none;
      background-color: #d7d7d7;
    }
    .send {
      background: red;
      color: #fff;
      font-size: 14/360 * 100vw;
      height: 26/360 * 100vw;
      width: 48/360 * 100vw;
      line-height: 26/360 * 100vw;
      text-align: center;
      border-radius: 14/360 * 100vw;
      // padding: 0 14/360 * 100vw;
    }
  }
}
</style>