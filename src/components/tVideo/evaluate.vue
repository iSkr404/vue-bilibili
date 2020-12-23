<template>
  <div class="evaluate">
    <p class="evluate-title">
      <span>评论</span>
      <span>（{{ numlength }}）</span>
    </p>
    <div class="myInfo">
      <img :src="mydata.user_img" v-if="mydata" />
      <img v-else src="@/assets/default_img.jpg" />
      <input v-model="inputText" type="text" placeholder="说点什么吧~" ref="fbinput" />
      <button @click="btnClick">发表</button>
    </div>
  </div>
</template>

<script>
import LogBtnVue from "../common/LogBtn.vue";
export default {
  name: "evaluate",
  props: ["numlength"],
  data() {
    return {
      mydata: null,
      inputText: "",
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.myuserData();
    }
  },
  methods: {
    async myuserData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.mydata = res.data[0];
    },
    // 判断是否登录,登录后再发表
    btnClick() {
      if (!localStorage.getItem("id") && !localStorage.getItem("token")) {
        this.$msg.fail("请先登录！");
        this.$router.push("/login");
        // return;
      }
      // 传给父组件处理
      this.$emit("inputClick", this.inputText);
      this.inputText='';
    },
    focuIput(){
      this.$refs.fbinput.focus();
    }
  },
  updated() {
    // this.focuIput();
  },
};
</script>

<style scoped>
.evaluate {
  background-color: white;
  padding: 9.375vw 3.125vw 0;
  font-size: 3.75vw;
}
.evaluate .evluate-title span:nth-child(2) {
  color: #aaa;
  margin-left: 3.125vw;
}
.myInfo {
  padding: 3.125vw 0vw;
  display: flex;
}
.myInfo img {
  width: 7.813vw;
  height: 7.813vw;
  border-radius: 50%;
}
.myInfo input {
  outline: none;
  border: 0vw;
  background-color: #f4f4f4;
  border-radius: 4.063vw;
  font-size: 3.75vw;
  padding: 0 6.25vw 0 4.688vw;
  margin-left: 3.125vw;
}
.myInfo button {
  outline: none;
  border: 0vw;
  background-color: #fb7299;
  color: white;
  border-radius: 3.75vw;
  font-size: 3.75vw;
  padding: 0 4.688vw;
  margin-left: 3.125vw;
}
</style>