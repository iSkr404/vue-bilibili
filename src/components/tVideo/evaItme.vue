<template>
  <div class="evaitem">
    <div class="evalist-01" v-for="(item, index) in itemData" :key="index">
      <div class="evalist-img">
        <img
          v-if="item.userinfo && item.userinfo.user_img"
          :src="item.userinfo.user_img"
        />
        <img v-else src="@/assets/default_img.jpg" alt="" />
        <p>
          <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
          <span v-else>匿名</span>
          <span>{{ item.comment_date }}</span>
        </p>
      </div>
      <div class="evalist-title">
        <div v-if="!isHuiF">
          {{ item.comment_content
          }}<span class="huif" @click="postItem(item.comment_id)">回复</span>
        </div>
        <div v-else>
          回复
          <span style="color: #42b9e1">{{ item.parent_user_info.name }}</span> :
          {{ item.comment_content }}
          <span class="huif" @click="postItem(item.comment_id)">回复</span>
        </div>
      </div>
      <!-- 递归组件传递参数isHuiF 三级评价为 回复某某： -->
      <evaitme
        :itemData="item.child"
        @postchild="postchild"
        :isHuiF="true"
      ></evaitme>
    </div>
  </div>
</template>

<script>
export default {
  // 组件递归
  name: "evaitme",
  props: ["itemData", "isHuiF"],
  methods: {
    postItem(id) {
      this.$emit("postchild", id);
      this.$emit("postitemId", id);
    },
    postchild(id) {
      this.$emit("postitemId", id);
    },
  },
};
</script>

<style scoped>
.evalist-img {
  display: flex;
}
.evalist-img img {
  width: 10.938vw;
  height: 10.938vw;
  border-radius: 50%;
  margin: 0.938vw 1.563vw 3.125vw 0;
}
.evalist-01 {
  display: flex;
  flex-direction: column;
}
.evalist-title {
  position: relative;
  flex: 1;
  padding-bottom: 10px;
}
.evalist-title .huif {
  position: absolute;
  right: 0;
  color: #b3a2aa;
}
.evalist-img p {
  flex: 1;
  display: flex;
  justify-content: space-between;
  font-size: 4.063vw;
  color: #555;
}
.evalist-title div {
  font-size: 4.063vw;
}
</style>