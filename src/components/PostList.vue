<template>
  <div>
    <!-- 单张图片显示 -->
    <div
      class="singleimg"
      v-if="post.type == 1 && post.cover.length >= 1 && post.cover.length < 3"
    >
      <div class="left">
        <div class="title">{{ post.title }}</div>
        <div class="info">
          {{ post.user.nickname }} {{ post.comment_length }}跟帖
        </div>
      </div>
      <img class="right" :src="post.cover[0].url" />
    </div>
    <!-- 多张图片 -->
    <div class="multiimg" v-if="post.type == 1 && post.cover.length >= 3">
      <div class="title">{{ post.title }}</div>
      <div class="cover">
        <img :src="post.cover[0].url" alt="" />
        <img :src="post.cover[1].url" alt="" />
        <img :src="post.cover[2].url" alt="" />
      </div>
      <div class="info">{{ post.user.nickname }} {{ post.comment_length }}</div>
    </div>
    <!-- 显示视频 -->
    <div class="video" v-if="post.type == 2 && post.cover.length >= 1">
      <div class="title">{{ post.title }}</div>
      <div class="cover">
        <img :src="post.cover[0].url" alt="" />
        <span class="iconfont iconshipin"></span>
      </div>
      <div class="info">
        {{ post.user.nickname }} {{ post.comment_length }}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style lang="less" scoped>
.singleimg {
  display: flex;
  padding: 16/360 * 100vw;
  border-bottom: 1px solid #e4e4e4;
  .left {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      color: #333;
      font-size: 16/360 * 100vw;
    }
    .info {
      color: #888;
      font-size: 14/360 * 100vw;
    }
  }
  .right {
    width: 121/360 * 100vw;
    height: 75/360 * 100vw;
    object-fit: cover;
  }
}
.multiimg {
  padding: 16/360 * 100vw;
  border-bottom: 1px solid #e4e4e4;
  .title {
    font-size: 16 /360 * 100vw;
    color: #333;
  }
  .info {
    font-size: 14 /360 * 100vw;
    color: #888;
  }
  .cover {
    display: flex;
    justify-content: space-between;
    margin: 10 /360 * 100vw 0;
    img {
      width: 33%;
      height: 74 /360 * 100vw;
      object-fit: cover;
    }
  }
}
.video {
  padding: 16/360 * 100vw;
  border-bottom: 1px solid #e4e4e4;
  .title {
    font-size: 16 /360 * 100vw;
    color: #333;
  }
  .info {
    font-size: 14 /360 * 100vw;
    color: #888;
  }
  .cover {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 340/360 * 100vw;
      height: 170/360 * 100vw;
      object-fit: cover;
    }
    span {
      position: absolute;
      font-size: 46/360 * 100vw;
      color: #fff;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
    }
  }
}
</style>