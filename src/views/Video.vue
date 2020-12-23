<template>
  <div v-if="model">
    <Navbar></Navbar>
    <div class="datainfo">
      <div class="video">
        <video controls :src="model.content"></video>
      </div>
      <div class="video-info">
        <div class="title">
          <span class="title-left">{{ model.category.title }}</span>
          <span class="title-right">{{ model.name }}</span>
        </div>
        <div class="user-data">
          <span class="data-name">{{ model.userinfo.name }}</span>
          <span class="view">71.2万观看</span>
          <span class="danmaku">1.2万弹幕</span>
          <span class="time">{{ model.date }}</span>
        </div>
        <div class="user-toolbar">
          <p @click="collectClick" :class="{ isative: isCollect }">
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </p>
          <p @click="attentionClick" :class="{ isative: isAttention }">
            <span class="icon-bubble"></span>
            <span>关注</span>
          </p>
          <p>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </p>
        </div>
      </div>
      <div class="video-list">
        <Detail class="detailitem" v-for="(videoitem, videoIndex) in commendList" :key="videoIndex" :detailitem="videoitem"></Detail>
      </div>
      <div>
        <evaLuate :numlength="numLength" @inputClick="textSuccess" ref="evaLuate"></evaLuate>
        <!--  事件接收  然后赋值 -->
        <evaList @evaLength="(res) => (numLength = res)" @huifClick="huiClick" ref="evaList"></evaList>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Detail from "@/components/common/Detail";
import evaLuate from "@/components/tVideo/evaluate";
import evaList from "@/components/tVideo/evaList";
export default {
  name: "b-video",
  components: {
    Navbar,
    Detail,
    evaLuate,
    evaList,
  },
  data() {
    return {
      model: null,
      commendList: null,
      numLength: null,
      // 发表评论
      Postcom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null,
      },
      isCollect: null,
      isAttention: null,
    };
  },
  methods: {
    // 页面进入时第一个页面响应请求
    async videoData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      if (this.model) {
        this.attentionCheack();
      }
    },
    // 文章推荐请求
    async videoList() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    // 发生评论 res子组件的值
    async textSuccess(res) {
      // 处理下日期
      const date = new Date();
      let m =
        date.getMonth() + 1 < 10 ? +"0" + date.getMonth() : date.getMonth() + 1;
      let d =
        date.getDate() + 1 < 10 ? +"0" + date.getDate() : date.getDate() + 1;
      let str = m + "-" + d;
      // console.log(res, m, d, str);
      this.Postcom.comment_content = res;
      this.Postcom.comment_date = str;
      this.Postcom.article_id = this.$route.params.id;
      // this.article_id="";
      const result = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.Postcom
      );
      this.Postcom.parent_id = null;
      // console.log(result);
      // 点击完发表时候再调用一次子组件渲染方法
      if (result.status == 200) {
        this.$msg.fail("评论发表成功！");
        this.$refs.evaList.evalData();
      }
    },
    // 收藏文章
    async collectClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (res.data.msg == "收藏成功") {
          this.$msg.fail("收藏成功");
          this.isCollect = true;
        } else {
          this.$msg.fail("取消收藏");
          this.isCollect = false;
        }
      } else {
        this.$msg.fail("请先登录")
        this.$router.push('/login');
      }
    },
    async collectCheack() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: {
              article_id: this.$route.params.id,
            },
          }
        );
        this.isCollect = res.data.success;
      }
    },
    // 关注发帖用户
    async attentionClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          { sub_id: this.model.userid }
        );
        if (res.data.msg == "关注成功") {
          this.isAttention = true;
        } else {
          this.isAttention = false;
        }
      } else {
        this.$msg.fail("请先登录")
        this.$router.push('/login');
      }
    },
    async attentionCheack() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: {
              sub_id: this.model.userid,
            },
          }
        );
        this.isAttention = res.data.success;
      }
    },
    huiClick(id) {
      console.log(id);
      this.Postcom.parent_id = id;
      // 调用子组件的方法
      this.$refs.evaLuate.focuIput();
    },
  },
  created() {
    this.videoData();
    this.videoList();
    // console.log(this.$route.params);
    this.collectCheack();
  },
  watch: {
    $route() {
      this.videoData();
      this.videoList();
      this.collectCheack();
    },
  },
};
</script>

<style scoped>
.video {
  width: 100%;
  background-color: white;
}
.video video {
  width: 100%;
}
.video-info {
  padding: 4vw 3.2vw;
  background-color: white;
}
.video-info .title-left {
  color: #fb7299;
  background: #f4f4f4;
  border-radius: 3.2vw;
  margin-right: 2.778vw;
  font-size: 3.333vw;
  padding: 0.556vw 1.389vw;
  display: inline-block;
  line-height: 4.444vw;
}
.isative {
  color: #fb7299;
}
.video-info .title-right {
  color: #212121;
  font-size: 3.889vw;
}
.user-data {
  margin-top: 2.13333vw;
  font-size: 3.2vw;
}
.data-name {
  color: #212121;
  margin-right: 4.8vw;
  font-size: 3.2vw;
  margin-left: 1.389vw;
}
.view,
.danmaku,
.time {
  margin-right: 2.13vw;
  color: #999;
}
.user-toolbar {
  margin-top: 2.778vw;
  margin-left: 2.778vw;
  color: #999;
  font-size: 3.333vw;
  display: flex;
}
.user-toolbar p {
  margin-right: 2.778vw;
}
.user-toolbar p span:nth-child(2) {
  margin-left: 1.389vw;
}
.video-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: white;
}
.video-list .detailitem {
  width: 45%;
}
</style>