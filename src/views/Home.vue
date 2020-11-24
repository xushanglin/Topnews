<template>
  <div class="content">
    <!-- 头部导航栏 -->
    <Homeheader />
    <!-- 栏目管理 -->
    <van-tabs
      v-model="active"
      swipeable
      background="#e4e4e4"
      @click="setSelect"
    >
      <van-tab
        v-for="(item, index) in content"
        :title="item.name"
        :name="item.id"
        :key="index"
      >
        内容 {{ item.name }}
      </van-tab>
      <span class="iconfont iconjiantou1"></span>
    </van-tabs>
  </div>
</template>

<script>
import Homeheader from "../components/HomeHeader";
export default {
  components: {
    Homeheader,
  },
  data() {
    return {
      content: [],
      active: "",
    };
  },
  created() {
    this.$axios({
      url: "/category",
    }).then((res) => {
      res.data.data.forEach((item) => {
        // console.log(item);
        if (item.is_top === 0) {
          this.content.push(item);
        }
      });
      console.log(this.content);
    });
    this.$axios({
      mesthod: "post",
      url: "/post",
    }).then((res) => {
      console.log(res);
    });
  },
  methods: {
    setSelect(name, title) {
      console.log(name);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  // 栏目管理
  /deep/ .van-tabs__wrap--scrollable {
    height: 43/360 * 100vw;
    .van-tab {
      .van-tab__text {
        font-size: 16/360 * 100vw;
        // line-height: 43/360 * 100vw;
      }
      &:last-child {
        margin-right: 42/360 * 100vw;
      }
    }
  }
  .iconjiantou1 {
    position: absolute;
    top: 0;
    right: 0;
    width: 42/360 * 100vw;
    height: 43/360 * 100vw;
    background-color: #e4e4e4;
    transform: rotate(90deg);
    font-size: 25/360 * 100vw;
    font-weight: 700;
    line-height: 42/360 * 100vw;
    text-align: center;
    z-index: 999;
  }
}
</style>
