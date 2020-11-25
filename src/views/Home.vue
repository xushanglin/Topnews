<template>
  <div class="content">
    <!-- 头部导航栏 -->
    <Homeheader />
    <!-- 栏目管理 -->
    <van-tabs v-model="activeIndex" background="#e4e4e4">
      <van-tab
        v-for="category in categoryList"
        :key="category.id"
        :title="category.name"
      >
        <van-list
          v-model="category.loading"
          :immediate-check="false"
          :finished="category.finished"
          finished-text="我是有底线的"
          @load="loadMore"
        >
          <Postlist
            v-for="post in category.Postlist"
            :key="post.id"
            :post="post"
            @click.native="setDetails(post.id)"
          />
        </van-list>
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
      // 栏目得激活下标，从0开始
      activeIndex: 0,
      categoryList: [],
      // 加载状态
      // loading: false,
    };
  },
  created() {
    this.$axios({
      url: "/category",
    }).then((res) => {
      // console.log(res.data.data);
      // 给每个栏目添加一个空数组，用于存放对应的文章列表
      this.categoryList = res.data.data.map((item) => {
        return {
          // ...item相当于{id: ,name:  , is_top:}去掉花括号再把postlist[]进行拼接成一个对象
          ...item,
          Postlist: [],
          // 添加每页长度和页数
          pageIndex: 1,
          pageSize: 5,
          loading: false,
          finished: false,
        };
      });
      console.log(this.categoryList);
      this.LoadPage();
    });
  },
  // 监听事件监听栏目得激活状态
  watch: {
    activeIndex() {
      // console.log(this.activeIndex);监听下标得变化情况
      // 根据点击的栏目下标获取对应的栏目
      const currenCategory = this.categoryList[this.activeIndex];
      // console.log(currenCategory);
      // 判断对应栏目里面的postlist里面有没有东西，有就不用请求，没有就请求
      // 避免多次请求数据
      if (currenCategory.Postlist.length == 0) {
        this.LoadPage();
      }
    },
  },
  methods: {
    loadMore() {
      // this.loading = true;
      // 拖动获取下一页数据
      const currenCategory = this.categoryList[this.activeIndex];
      currenCategory.pageIndex += 1;
      this.LoadPage();
    },
    // 文章列表渲染
    LoadPage() {
      const currenCategory = this.categoryList[this.activeIndex];
      this.$axios({
        url: "/post",
        params: {
          // 根据点击的下标获取对应的id和文章
          category: currenCategory.id,
          pageIndex: currenCategory.pageIndex,
          pageSize: currenCategory.pageSize,
        },
      }).then((res) => {
        console.log(res);
        // 把对应的文章放进对应的栏目中，进行滑动时加载数据把前面加载完的数据页拼接起来
        currenCategory.Postlist = [
          ...currenCategory.Postlist,
          ...res.data.data,
        ];
        currenCategory.loading = false;
        // 如果拖到底部返回的数据小于每页的长度，证明已经没有数据了，就停止加载
        if (res.data.data.length < currenCategory.pageSize) {
          currenCategory.finished = true;
        }
      });
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
}
</style>
