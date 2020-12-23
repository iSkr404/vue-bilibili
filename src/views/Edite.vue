<template>
  <div class="edite">
    <div style="margin-bottom: 10px">
      <Navbar></Navbar>
    </div>
    <div class="file-img">
      <van-uploader :after-read="afterRead" preview-size="100vw" class="uploader-img" />
      <editBnnner left="头像">
        <img v-if="model.user_img == null" src="../assets/default_img.jpg" alt="" slot="right" class="user_img" />
        <img v-else :src="model.user_img" alt="" slot="right" class="user_img" />
      </editBnnner>
    </div>
    <editBnnner left="昵称" @banberClick="show = true">
      <a href="javascript:;" slot="right">{{ model.name }}</a>
    </editBnnner>
    <editBnnner left="账号">
      <a href="javascript:;" slot="right">{{ model.username }}</a>
    </editBnnner>
    <editBnnner left="性别" @banberClick="nv = true">
      <a href="javascript:;" slot="right">{{
        model.gender == 1 ? "男" : "女"
      }}</a>
    </editBnnner>
    <editBnnner left="个性签名" @banberClick="textShow = true">
      <!-- 因为封装组件用了具名插槽所以数据渲染时要加上一个a标签不然显示不出来 -->
      <a href="javascript:;" slot="right">{{ model.user_desc }}</a>
    </editBnnner>
    <div class="editeback" @click="$router.push('/userinfo')">
      返回个人中心
    </div>
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="confirm" @calcel="text = ''" autofocus>
      <van-field v-model="text" />
    </van-dialog>
    <van-dialog v-model="textShow" title="个性签名" show-cancel-button @confirm="araeClick" @calcel="text = ''">
      <van-field v-model="text" type="textarea" />
    </van-dialog>
    <van-action-sheet v-model="nv" :actions="actions" cancel-text="取消" close-on-click-action @select="OnSelect" />
  </div>
</template>
<script>
import Navbar from "@/components/common/Navbar";
import editBnnner from "@/components/common/editBanner";
export default {
  name: "edit",
  data() {
    return {
      model: {},
      show: false,
      textShow: false,
      nv: false,
      text: "",
      actions: [
        { name: "男", val: 1 },
        { name: "女", val: 0 },
      ],
    };
  },
  components: {
    Navbar,
    editBnnner,
  },
  created() {
    this.UserInfoData();
  },
  methods: {
    async UserInfoData() {
      // 通过·ID发请求获取出user里面的数据
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async afterRead(file) {
      console.log(file);
      // jquery上传文件
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      this.model.user_img = res.data.url;
      this.UserUpdata();
    },
    // 修改完数据数据更新
    async UserUpdata() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.status == "200") {
        this.$msg.fail("修改成功");
      }
    },
    // 昵称修改点击确认之后
    confirm() {
      this.model.name = this.text;
      this.UserUpdata();
      this.text = "";
    },
    // 个性签名
    araeClick() {
      this.model.user_desc = this.text;
      this.UserUpdata();
      this.text = "";
    },
    // 男女
    OnSelect(data) {
      this.model.gender = data.val;
      this.UserUpdata();
    },
  },
};
</script>
<style scoped>
.edite .user_img {
  width: 12.778vw;
  height: 12.778vw;
  border-radius: 50%;
}
.edite a {
  color: #999;
}
.file-img {
  position: relative;
  overflow: hidden;
}
.file-img .uploader-img {
  position: absolute;
  opacity: 0;
}
.editeback {
  margin-top: 5.556vw;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: white;
  color: #999;
  padding: 4.167vw 0;
  font-size: 4.444vw;
}
</style>