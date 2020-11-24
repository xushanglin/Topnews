<template>
  <div>
    <div class="topnav">
      <div class="icon">
        <span class="iconfont iconjiantou2"></span>
        <span class="iconfont iconnew"></span>
      </div>
      <div class="button">关注</div>
    </div>
    <div class="details">
      <div class="title">{{ details.title }}</div>
      <div class="info">{{ details.user.nickname }} 2019-10-10</div>
      <div class="content" v-html="details.content"></div>
      <div class="icon">
        <div class="dianzan">
          <span class="iconfont icondianzan"></span>{{ details.like_length }}
        </div>
        <div class="weixin"><span class="iconfont iconweixin"></span>微信</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: {},
    };
  },
  created() {
    this.$axios({
      url: "/post/1",
    }).then((res) => {
      console.log(res);
      this.details = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.topnav {
  padding: 16/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    .iconjiantou2 {
      font-size: 12/360 * 100vw;
      margin-right: 8/360 * 100vw;
    }
    .iconnew {
      font-size: 54/360 * 100vw;
    }
  }
  .button {
    width: 62/360 * 100vw;
    height: 26/360 * 100vw;
    background-color: #ff0000;
    border-radius: 13/360 * 100vw;
    font-size: 12/360 * 100vw;
    text-align: center;
    line-height: 26/360 * 100vw;
    color: #fff;
  }
}
.details {
  padding: 0 16/360 * 100vw;
  .title {
    font-size: 18/360 * 100vw;
    font-weight: 700;
  }
  .info {
    margin: 10/360 * 100vw 0;
    font-size: 13/360 * 100vw;
    color: #868686;
  }
  .content {
    margin: 10/360 * 100vw 0;
    font-size: 14/360 * 100vw;
    color: #333;
    /deep/ img {
      width: 330/360 * 100vw;
      // height: 340/360 * 100vw;
      object-fit: cover;
    }
  }
  .icon {
    display: flex;
    justify-content: space-evenly;
    margin: 30/360 * 100vw 0 20/360 * 100vw;
    div {
      display: block;
      width: 79/360 * 100vw;
      height: 29/360 * 100vw;
      border: 1px solid #e4e4e4;
      font-size: 13/360 * 100vw;
      text-align: center;
      line-height: 29/360 * 100vw;
      border-radius: 15/360 * 100vw;
      span {
        margin-right: 5/360 * 100vw;
        font-size: 17/360 * 100vw;
      }
      .iconweixin {
        color: #01c801;
      }
    }
  }
}
</style>