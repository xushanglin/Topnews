<template>
  <div class="content">
    <Header text="编辑资料" />
    <div class="avatarWrapper">
      <!-- 这里添加一个优化, 没有头像的情况, 有两种, 1.真的没有 2.只是数据还没到
            只有前面这种真的没有的情况才需要显示默认头像, 所以加上 nickname 做辅助判断 -->
      <van-uploader :after-read="afterRead">
        <img
          class="avatar"
          :src="$axios.defaults.baseURL + userInfo.head_img"
          alt=""
        />
      </van-uploader>
    </div>
    <bartype
      title="昵称"
      :msg="userInfo.nickname"
      @click.native="showname = !showname"
    />
    <bartype title="密码" msg="******" @click.native="showpwd = !showpwd" />
    <bartype
      title="性别"
      v-if="userInfo.gender == 1"
      msg="男"
      @click.native="showgen = !showgen"
    />
    <bartype title="性别" v-else msg="女" @click.native="showgen = !showgen" />

    <!-- 修改按钮 -->
    <button @click="userupdate" class="submit">修改</button>
    <!-- 第三方弹窗组件 -->
    <van-dialog
      v-model="showname"
      @confirm="setNickname"
      title="请输入昵称"
      show-cancel-button
    >
      <van-field v-model="newNickname" placeholder="请输入昵称" />
    </van-dialog>
    <van-dialog
      v-model="showpwd"
      @confirm="setNewpwd"
      title="密码"
      show-cancel-button
    >
      <van-field type="password" v-model="newpwd" placeholder="请输入密码" />
    </van-dialog>

    <van-action-sheet
      @select="serGender"
      v-model="showgen"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>

<script>
import Header from "@/components/Header";
import bartype from "@/components/Bar-Type";
export default {
  components: {
    Header,
    bartype,
  },
  data() {
    return {
      userInfo: {},
      // 用于显示弹窗条件
      showname: false,
      showpwd: false,
      showgen: false,
      newNickname: "",
      newpwd: "",
      actions: [
        { name: "男", gender: 1 },
        { name: "女", gender: 0 },
      ],
    };
  },
  // 请求数据渲染
  created() {
    this.loadPage();
  },
  methods: {
    // 渲染数据请求
    loadPage() {
      // 获取数据
      this.$axios({
        url: "/user/" + localStorage.getItem("userId"),
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        const { data, message } = res.data;
        if (message == "获取成功") {
          this.userInfo = data;
        }
      });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.file);
      // 转化成二进制
      var fromdata = new FormData();
      fromdata.append("file", file.file);
      this.$axios({
        method: "post",
        url: "/upload",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: fromdata,
      }).then((res) => {
        console.log(res);
        // 获取图片路径回显到页面
        // this.data.head_img = res.data.data.url;
        const data = { head_img: res.data.data.url };
        console.log(data);
        this.userupdate(data);
      });
    },
    // 修改昵称
    setNickname() {
      const data = {
        nickname: this.newNickname,
      };
      this.userupdate(data);
    },
    // 修改密码
    setNewpwd() {
      const data = { password: this.newpwd };
      this.userupdate(data);
    },
    // 修改性别
    serGender(actions) {
      // actions是组件的回调参数，返回选中的选项
      // console.log(actions);
      const data = { gender: actions.gender };
      this.userupdate(data);
    },
    // 修改信息
    // 因为修改信息请求有多次，所以封装起来
    userupdate(data) {
      this.$axios({
        method: "post",
        url: `user_update/${localStorage.getItem("userId")}`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data,
      }).then((res) => {
        // console.log(res);
        console.log(res);
        // 重新获取数据
        // 异步代码，让每次修改一次就重新调用获取数据重新渲染
        this.loadPage();
      });
    },
    // onCancel() {
    //   this.$toast("取消");
    // },
  },
};
</script>

<style lang="less" scoped>
.avatarWrapper {
  height: 160/360 * 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    border-radius: 50%;
  }
}
.submit {
  display: block;
  margin: 100/360 * 100vw auto;
  width: 100/360 * 100vw;
  height: 30/360 * 100vw;
  background-color: #d8dbe5;
  border: none;
  border-radius: 15/360 * 100vw;
  color: #fff;
}
</style>