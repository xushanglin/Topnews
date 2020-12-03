<template>
  <div class="content">
    <Header text="栏目管理" />
    <p class="title">点击删除一下频道</p>
    <div class="manage">
      <div
        @click="deactive(index)"
        class="item"
        v-for="(item, index) in categoryList"
        :key="item.id"
      >
        {{ item.name }}
      </div>
    </div>
    <p class="title">点击添加一下频道</p>
    <div class="manage">
      <div
        @click="active(index)"
        class="item"
        v-for="(item, index) in historyList"
        :key="item.id"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  components: {
    Header,
  },
  data() {
    return {
      categoryList: [],
      historyList: [],
    };
  },
  watch: {
    categoryList() {
      localStorage.setItem("categoryList", JSON.stringify(this.categoryList));
    },
    historyList() {
      localStorage.setItem("historyList", JSON.stringify(this.historyList));
    },
  },
  created() {
    if (localStorage.getItem("categoryList")) {
      this.categoryList = JSON.parse(localStorage.getItem("categoryList"));
      this.historyList = JSON.parse(localStorage.getItem("historyList"));
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
        console.log(this.categoryList);
      });
    }
  },
  methods: {
    deactive(index) {
      console.log(index);
      this.historyList.push(this.categoryList[index]);
      this.categoryList.splice(index, 1);
    },
    active(index) {
      if (this.historyList.length == 1) {
        return this.$toast("不能再删除了");
      } else {
        this.categoryList.push(this.historyList[index]);
        this.historyList.splice(index, 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  .title {
    margin-top: 14/360 * 100vw;
    padding-left: 15/360 * 100vw;
    font-size: 14/360 * 100vw;
    color: #696969;
  }
  .manage {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .item {
      //   margin: 10/360 * 100vw 10/360 * 100vw 0 0;
      //   padding: 10/360 * 100vw 15/360 * 100vw;
      //   border: 1px solid #333;
      font-size: 16 /360 * 100vw;
      padding: 6 /360 * 100vw 14 /360 * 100vw;
      border: 1px solid #888;
      margin: 12 /360 * 100vw;
    }
  }
}
</style>