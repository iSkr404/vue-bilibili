<template>
  <div class="userinfo">
    <Navbar :headerimg="model"></Navbar>
    <userDetail :userInfo="model"></userDetail>
  </div>
</template>
<script>
import Navbar from "@/components/common/Navbar";
import userDetail from "@/components/userComponents/userDetail";
export default {
  name: "userinfo",
  data() {
    return {
      model: {},
    };
  },
  created() {
   this.userData();
   console.log('hahah');
  },
  components: {
    Navbar,
    userDetail,
  },
  methods: {
    async userData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
  },
};
</script>
<style scoped>
</style>