<template>
  <div class="content">
    <!-- 未激活状态 -->
    <div class="disable" v-if="!isactive">
      <div class="post">
        <input type="text" @focus="showTextarea" placeholder="写跟帖" />
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
      ></textarea>
      <div class="send" @click="sendComment">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isactive: false,
      comment: "",
    };
  },
  methods: {
    showTextarea() {
      this.isactive = true;
      this.$nextTick(() => {
        this.$refs.textarea.focus();
      });
    },
    hideTextarea() {
      this.isactive = false;
    },
    sendComment() {
      this.$axios({
        method: "post",
        url: "/post_comment/" + this.$route.params.id,
        data: {
          content: this.comment,
        },
      }).then((res) => {
        // console.log(res);
        this.$toast.success(res.data.message);
      });
    },
    getStar() {
      this.$axios({
        url: "/post_star/" + this.$route.params.id,
      }).then((res) => {
        // console.log(res);
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
  width: 100%;
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
    .iconfont {
      font-size: 23/360 * 100vw;
      margin-right: 18/360 * 100vw;
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