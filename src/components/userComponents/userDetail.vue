<template>
  <div class="userdetail">
    <img src="@/assets/bannerTop_new.png" alt="" class="bgimg" />
    <div class="user-left">
      <div class="user-img">
        <img v-if="userInfo.user_img" :src="userInfo.user_img" class="user-images" />
        <img v-else src="@/assets/default_img.jpg" class="user-images" />
      </div>
    </div>
    <div class="user-right">
      <div class="user-r-top">
        <span class="fans">
          <span class="num"> 1 </span>
          <br />
          <span class="type"> 粉丝 </span>
        </span>
        <span class="split"></span>

        <span class="fllow">
          <span class="num"> 8 </span>
          <br />
          <span class="type"> 关注 </span>
        </span>
        <span class="split"></span>

        <span class="like">
          <span class="num"> 1 </span>
          <br />
          <span class="type"> 获赞 </span>
        </span>
      </div>
      <div class="user-r-bom" @click="$router.push('/edite')">
        <div class="edit">编辑资料</div>
      </div>
    </div>
    <div class="user">
      <div class="user-name">
        {{ userInfo.name }}
      </div>
      <div v-if="userInfo.user_desc" class="desc">{{userInfo.user_desc}}</div>
      <div v-else class="desc">这个人很神秘什么也没说！</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "userdetail",
  props: ["userInfo"],
  created() {
    //   setTimeout(()=>{
    //       console.log(this.userInfo);
    //   },1000)
  },
};
</script>
<style scoped>
.userdetail {
  overflow: hidden;
  height: 300px;
  background-color: white;
}
.userdetail .bgimg {
  height: 131px;
  width: 100%;
}
.userdetail .user-left {
  padding: 0 3.333vw;
}
.userdetail .user-left .user-img {
  float: left;
  position: relative;
  width: 22.4vm;
  height: 22.4vm;
}
.userdetail .user-left .user-img .user-images {
  position: absolute;
  z-index: 2;
  width: 22.222vw;
  height: 22.222vw;
  border-radius: 11.2vw;
  margin-top: -2.778vw;
}
.user-right {
  float: right;
  width: 58.66vw;
  padding-top: 2.13vw;
  color: #e7e7e7;
}
.user-right .user-r-top > span {
  width: 19.2vw;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
}
.user-right .user-r-top .split {
  vertical-align: middle;
  width: 1px;
  height: 4.267vw;
  background: #e7e7e7;
}
.user-right .user-r-top .num {
  font-size: 3.733vw;
  color: #212121;
  line-height: 4.267vw;
}
.user-right .user-r-top .type {
  font-size: 2.933vw;
  color: #999;
}
.user-r-bom {
  padding: 0.833vw 4.167vw;
}
.user-r-bom .edit {
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 1.389vw;
  border: 0.278vw #fb7299 solid;
  color: #fb7299;
  border-radius: 1.111vw;
  font-size: 3.333vw;
}
.user {
  padding: 3.125vw;
  clear: both;
  border-bottom: 1px solid #e7e7e7;
}
.user .desc{
  margin-top: 2.188vw;
  font-size: 3.75vw;
  color: #999999;
}
</style>