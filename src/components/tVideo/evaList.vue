<template>
  <div class="evalist">
    <div class="lists" v-for="(item, index) in evaListdata" :key="index">
      <div class="evalist-01">
        <div class="evalist-img">
          <img v-if="item.userinfo&&item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
          <img v-else src="@/assets/default_img.jpg" alt="" />
        </div>
        <div class="evalist-title">
          <p>
            <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
            <span v-else>匿名</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>
           {{item.comment_content}}<span class="huif" @click="huif(item.comment_id)">回复</span>
          </div>
        </div>
      </div>
      <div>
        <evaItem @postitemId="huif" style="padding-left:9.375vw" :itemData="item.child"></evaItem>
      </div>
    </div>
  </div>
</template>

<script>
import evaItem from "./evaItme";
export default {
  name: "evalist",
  data() {
    return {
      evaListdata: null,
    };
  },
  created() {
    this.evalData();
  },
  methods: {
    async evalData() {
      // 获取评论
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.evaListdata = this.changeData(res.data);
      // 评论总条数  并传给父组件
      if(res.data){
        this.$emit('evaLength',res.data.length);
      }
    },
    // 递归处理数据
    changeData(data) {
      function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
    huif(id) {
      console.log(id);
      this.$emit("huifClick", id);
    },
  },
  components: {
    evaItem,
  },
};
</script>

<style scoped>
.evalist {
  background-color: white;
  padding: 0 3.125vw;
}
.evalist-img img {
  width: 10.938vw;
  height: 10.938vw;
  border-radius: 50%;
  margin-right: 3.125vw;  
}
.lists {
  border-bottom: 0.313vw solid #e7e7e7;
}
.evalist-01 {
  padding: 3.125vw;
  display: flex;
}
.evalist-title {
  position: relative;
  flex: 1;
}
.evalist-title .huif {
  position: absolute;
  right: 0;
  color: #b3a2aa;
}
.evalist-title p {
  display: flex;
  justify-content: space-between;
  font-size: 4.063vw;
  color: #555;
}
.evalist-title div {
  font-size: 4.063vw;
}
</style>