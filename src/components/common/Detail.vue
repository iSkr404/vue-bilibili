<template>
  <div  @click="pathPush">
    <div class="detailitem">
      <div class="imgparent">
        <img :src="detailitem.img" alt="" style="width: 100%; height: 100%" />
        <div class="bottom">
          <div class="icon-play2"><span class="video">7535</span></div>
          <div class="icon-file-text">
            <span class="comment">{{
              !detailitem.commentlen ? 666 : detailitem.commentlen
            }}</span>
          </div>
        </div>
      </div>
      <p>{{ detailitem.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: ["detailitem"],
  methods: {
    pathPush() {
      if (this.$route.path != "/video/" + this.detailitem.id + ""){
        this.$router.push("/video/" + this.detailitem.id + "")
      }
    },
  },
};
</script>

<style scoped>
.detailitem {
  padding: 1.389vw 0;
}
.detailitem p {
  font-size: 3.333vw;
  padding-top: 0.833vw;
}
.imgparent {
  position: relative;
}
.video {
  font-size: 3.333vw;
}
.comment {
  font-size: 3.333vw;
}
.bottom {
  display: flex;
  position: absolute;
  padding: 1.389vw;
  bottom: 0;
  color: white;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
  justify-content: space-between;
  bottom: 0.556vw;
  left: 0;
  right: 0;
  font-size: 3.333vw;
}
</style>
