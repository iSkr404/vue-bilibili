<template>
  <div>
    <LogTop reltitle="登录bilibili">
      <div slot="right" style="font-size: 3.611vw" @click="$router.push('/register')">
        切换到注册页面
      </div>
    </LogTop>
    <!--(res) => (name = res)简写方式不用在方法里面写了  -->
    <LogText label="账号" type="text" placeholder="请输入账号" style="margin: 4.167vw 0" rule="^.{6,16}$" @inputchange="(res) => (model.username = res)"></LogText>
    <LogText label="密码" type="password" placeholder="请输入密码" style="margin: 4.167vw 0" rule="^.{6,16}$" @inputchange="(res) => (model.password = res)"></LogText>
    <LogBtn btntext="登录" @registerSubmit="registerSubmit"></LogBtn>
  </div>
</template>
<script>
import LogTop from "@/components/common/LogTop";
import LogText from "@/components/common/LogText";
import LogBtn from "@/components/common/LogBtn";
export default {
  name: "login",
  data() {
    return {
      model: {
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
      if (rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post("/login", this.model);
        this.$msg.fail(res.data.msg);
        if (res.data.code == 301 || res.data.code == 302) {
          return;
        }
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          this.$router.push('/userinfo');
        })
      } else {
        // this.$msg.fail("格式不正确,请重新输入！");
      }
    },
  },
};
</script>