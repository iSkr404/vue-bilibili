<template>
  <div>
    <LogTop reltitle="注册bilibili">
      <div slot="right" style="font-size: 3.611vw" @click="$router.push('/login')">
        切换到登录
      </div>
    </LogTop>
    <!--(res) => (name = res)简写方式不用在方法里面写了  -->
    <LogText label="用户名" type="text" placeholder="请输入姓名" style="margin: 4.167vw 0" rule="^.{6,16}$" @inputchange="(res) => (model.name = res)"></LogText>
    <LogText label="账号" type="text" placeholder="请输入账号" rule="^.{6,16}$" @inputchange="(res) => (model.username = res)"></LogText>
    <LogText label="密码" type="password" placeholder="请输入密码" rule="^.{6,16}$" @inputchange="(res) => (model.password = res)"></LogText>
    <LogBtn btntext="注册" @registerSubmit="registerSubmit"></LogBtn>
  </div>
</template>
<script>
import LogTop from "@/components/common/LogTop";
import LogText from "@/components/common/LogText";
import LogBtn from "@/components/common/LogBtn";
export default {
  // 注册页面
  name: "register",
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  components: {
    LogTop,
    LogText,
    LogBtn,
  },
  methods: {
    //   异步数据执行顺序会在后面,async为了实行同步顺序执行
    async registerSubmit() {
      //   判断数据不为空的时候发送请求
      var rulg = /^.{6,16}$/;
      if (
        rulg.test(this.model.name) &&
        rulg.test(this.model.username) &&
        rulg.test(this.model.password)
      ) {
        const res = await this.$http.post("/register", this.model);
        this.$msg.fail(res.data.msg);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.objtoken);
        setTimeout(() => {
          this.$router.push('/userinfo');
        });
      } else {
        this.$msg.fail("格式不正确,请重新输入！");
      }
    },
  },
};
</script>