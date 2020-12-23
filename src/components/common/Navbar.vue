<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="t-search">
      <p>
        搜索内容
        <van-icon name="search" class="isearch" />
      </p>
    </div>
    <div class="x-app">
      <img v-if="imgUrl" :src="imgUrl" alt="" @click="$router.push('/edite')" />
      <img v-else src="@/assets/default_img.jpg" alt="" @click="$router.push('/login')" />
      <p>下载APP</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "navber",
  // 为了解决点击后跳转图片依然显示再发一次请求
  // props:['headerimg'],
  data() {
    return {
      imgUrl: "",
    };
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.imgUrl = res.data[0].user_img;
    }
  },
};
</script>
<style scoped>
.navbar {
  height: 12.5vw;
  background-color: white;
  display: flex;
}
.navbar .logo {
  width: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navbar .logo img {
  width: 80%;
}
.t-search {
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0 1.389vw;
}
.t-search p {
  background-color: #f4f4f4;
  height: 7.222vw;
  line-height: 7.222vw;
  width: 90%;
  border-radius: 3.611vw;
  position: relative;
  color: #aaa;
  font-size: 3.333vw;
  padding-left: 6.944vw;
}
.t-search p .isearch {
  position: absolute;
  line-height: 7.222vw;
  left: 2.778vw;
}
.x-app {
  display: flex;
  justify-content: center;
  align-items: center;
}
.x-app img {
  width: 6.667vw;
  height: 6.667vw;
  border-radius: 50%;
}
.x-app p {
  background-color: #fb7299;
  color: white;
  padding: 1.389vw 2.778vw;
  margin: 0 2.222vw;
  text-align: center;
  font-size: 3.333vw;
  border-radius: 0.833vw;
}
</style>