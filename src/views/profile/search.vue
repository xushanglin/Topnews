<template>
  <div>
    <div class="topNav">
      <span class="iconfont iconjiantou2" @click="back()"></span>
      <div class="search">
        <input
          type="text"
          v-model="record"
          placeholder="给你好看得"
          @keyup.enter="search()"
        />
      </div>
      <div class="button" @click="search">搜索</div>
    </div>
    <div class="history" v-if="Postlist.length == 0">
      <div class="tip">历史记录</div>
      <ul>
        <li
          v-for="(list,index) in $store.state.histroyList"
          :key="index"
          @click="handHistorylist(list)"
        >
          {{ list }}
        </li>
      </ul>
    </div>
    <Postlist
      @click.native="details(post.id)"
      v-for="post in Postlist"
      :key="post.id"
      :post="post"
    />
    <!-- <div
      @click="details(post.id)"
      class="list"
      v-for="post in Postlist"
      :key="post.id"
    >
      <span class="iconfont iconsearch"></span>
      <div class="title">{{ post.title }}</div>
      <span class="iconfont iconjiantou1"></span>
    </div> -->
  </div>
</template>

<script>
import Postlist from "../../components/PostList";
export default {
  components: {
    Postlist,
  },
  data() {
    return {
      record: "",
      historyList: [],
      Postlist: [],
    };
  },
  // 挂载好就显示历史记录
  created() {
    // 如果有就显示
    if (localStorage.getItem("history")) {
    const oldHistory = JSON.parse(localStorage.getItem("history"));
      this.$store.commit("reseverHistory",oldHistory)
    }
  },
  watch: {
    record() {
      if (this.record == "") {
        this.Postlist = [];
      }
    },
    // historyList() {
    //   // console.log(this.historyList);
    //   // 监听historyLIst的变化给他添加到本地
    //   localStorage.setItem("history", JSON.stringify(this.historyList));
    // },
    "$store.state.histroyList":function(){
      localStorage.setItem("history",JSON.stringify(this.$store.state.histroyList))
    }
  },
  methods: {
    details(id) {
      this.$router.push("/details/" + id);
    },
    search() {
      if (this.record != "") {
        // if (this.historyList.indexOf(this.record) == -1) {
        //   // 如果历史记录没有这条记录，给他添加
        //   this.historyList.unshift(this.record);
        // }
        this.$store.commit("addHistroy",this.record)
        this.$axios({
          url: "/post_search",
          params: {
            keyword: this.record,
          },
        }).then((res) => {
          if (res.data.data.length > 0) {
            this.Postlist = res.data.data;
          } else {
            this.$toast("找不到你想要得内容");
            this.record = "";
          }
        });
      }
    },
    back() {
      if (this.Postlist.length > 0) {
        // 返回搜索建议
        this.record = "";
        this.Postlist = [];
      } else {
        this.$router.back();
      }
    },
    // 点击历史记录
    handHistorylist(li) {
      console.log(li);
      this.record = li;
      this.search();
    },
  },
};
</script>

<style lang="less" scoped>
.topNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15/360 * 100vw;
  .iconfont {
    font-size: 15/360 * 100vw;
  }
  .button {
    font-size: 14/360 * 100vw;
    color: #333;
  }
  .search {
    margin: 0 20/360 * 100vw;
    flex-grow: 1;
    position: relative;
    display: flex;
    align-items: center;
    input {
      padding-left: 15/360 * 100vw;
      border: 1px solid #ccc;
      width: 100%;
      height: 38/360 * 100vw;
      border-radius: 19/360 * 100vw;
      color: #ccc;
      &::placeholder {
        padding-left: 40/360 * 100vw;
        font-size: 13/360 * 100vw;
      }
    }
  }
}
.history {
  padding: 15/360 * 100vw;
  border-bottom: 1px solid #eee;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      font-size: 13/360 * 100vw;
      color: #333;
      margin-top: 10/360 * 100vw;
    }
  }
}
.tip {
  font-weight: 700;
  font-size: 14/360 * 100vw;
  color: #333;
}

.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 15/360 * 100vw;
  padding: 10/360 * 100vw 0;
  font-size: 14/360 * 100vw;
  color: #333;
  border-bottom: 1px solid #ccc;
  .title {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // whitewhite-space: nowrap;
  }
}
</style>