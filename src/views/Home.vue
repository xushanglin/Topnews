<template>
  <div class="content">
    <!-- 头部导航栏 -->
    <Homeheader />
    <!-- 栏目管理 -->
    <van-tabs v-model="active" background="#e4e4e4" @click="setSelect">
      <van-tab
        v-for="(item, index) in content"
        :title="item.name"
        :name="item.id"
        :key="index"
      >
        <Postlist
          @click.native="setDetails(post.id)"
          v-for="post in Postlist"
          :key="post.id"
          :post="post"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Homeheader from "../components/HomeHeader";
import Postlist from "../components/PostList";
export default {
  components: {
    Homeheader,
    Postlist,
  },
  data() {
    return {
      content: [],
      active: "",
      Postlist: [],
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
    this.LoadPage();
  },
  methods: {
    // 文章列表渲染
    LoadPage(params) {
      this.$axios({
        url: "/post",
        params,
      }).then((res) => {
        console.log(res);
        this.Postlist = res.data.data;
      });
    },
    setSelect(name, title) {
      // console.log(name);
      const params = {
        category: name,
      };
      this.LoadPage(params);
    },
    // 跳转详情页
    setDetails(id) {
      sessionStorage.setItem("id", id);
      this.$router.push("/details");
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
  // .iconjiantou1 {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   width: 42/360 * 100vw;
  //   height: 43/360 * 100vw;
  //   background-color: #e4e4e4;
  //   transform: rotate(90deg);
  //   font-size: 25/360 * 100vw;
  //   font-weight: 700;
  //   line-height: 42/360 * 100vw;
  //   text-align: center;
  //   z-index: 999;
  // }
}
</style>
