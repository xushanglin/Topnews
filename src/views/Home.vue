<template>
  <div class="content">
    <!-- 头部导航栏 -->
    <Homeheader />
    <!-- 栏目管理 -->
    <van-tabs v-model="activeIndex" background="#e4e4e4" sticky>
      <van-tab
        v-for="category in categoryList"
        :key="category.id"
        :title="category.name"
      >
        <van-list
          v-model="category.loading"
          :finished="category.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <Postlist
            v-for="post in category.Postlist"
            :key="post.id"
            :post="post"
            @click.native="goDetails(post.id)"
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
      activeIndex: 1,
      categoryList: [],
    };
  },
  // 获取栏目列表
  created() {
    if (localStorage.getItem("historyList")) {
      this.categoryList = JSON.parse(localStorage.getItem("historyList"));
      this.categoryList = this.categoryList.map((item) => {
        // 一定要用return
        return {
          ...item,
          // 给每个栏目列表添加一个空数组存放栏目文章
          Postlist: [],
          // 添加页码和每页显示条数
          pageIndex: 1,
          pageSize: 5,
          // lis插件属性
          loading: false,
          finished: false,
        };
      });
      this.categoryList.push({ name: "+" });
    } else {
      this.$axios({
        url: "/category",
      }).then((res) => {
        console.log(res.data);
        // 去重，把重复的列表去掉
        let mycategory = new Set();
        res.data.data.forEach((element) => {
          if (!mycategory.has(element.name)) {
            mycategory.add(element.name);
            this.categoryList.push(element);
          }
        });

        this.categoryList = this.categoryList.map((item) => {
          // 一定要用return
          return {
            ...item,
            // 给每个栏目列表添加一个空数组存放栏目文章
            Postlist: [],
            // 添加页码和每页显示条数
            pageIndex: 1,
            pageSize: 5,
            // lis插件属性
            loading: false,
            finished: false,
          };
        });
        this.categoryList.push({ name: "+" });
      });

      // console.log(this.categoryList);
      this.loadPage();
    }
  },
  // 监听事件，监听activeIndex的变化添加文章列表
  watch: {
    activeIndex(newValue) {
      // 优化：如果栏目已经请求到数据了，在点就不用再请求
      // 当current.Postlist的长度大于0就表示已经请求过了，不用再请求一次
      if (newValue == this.categoryList.length - 1) {
        this.$router.push("/manage");
      } else {
        const current = this.categoryList[this.activeIndex];
        if (current.Postlist.length == 0) {
          this.loadPage();
        }
      }
    },
  },
  methods: {
    // 翻页请求
    onLoad() {
      // 在本来的页码上加一
      const current = this.categoryList[this.activeIndex];
      current.pageIndex += 1;
      this.loadPage();
    },
    // 请求文章列表
    loadPage() {
      // 根据列表的索引获取对应的文章
      const current = this.categoryList[this.activeIndex];
      this.$axios({
        url: "/post",
        params: {
          category: current.id,
          pageIndex: current.pageIndex,
          pageSize: current.pageSize,
        },
      }).then((res) => {
        console.log(res);
        // 把获取来的文章放进对应的栏目管理中
        // 如果页数增多，前面的数据不应该被覆盖
        current.Postlist = [...current.Postlist, ...res.data.data];
        // 请求完数据之后停止加载
        current.loading = false;
        if (res.data.data.length < current.pageSize) {
          current.finished = true;
        }
      });
    },
    goDetails(id) {
      this.$router.push("/details/" + id);
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
      &:nth-last-child(2) {
        background: #e4e4e4;
        position: sticky;
        right: -8px;
        width: 44px;
        line-height: 44px;
      }
    }
  }
}
</style>
