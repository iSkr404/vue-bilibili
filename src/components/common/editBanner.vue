<template>
  <div @click="banberClick">
    <div class="editbanner">
      <span>{{ left }}</span>
      <span><slot name="right"></slot></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "editBanner",
  props: ["left"],
  methods: {
    banberClick(){
      this.$emit('banberClick');
    }
  },
};
</script>

<style scoped>
.editbanner {
  background: #fff;
  border-bottom: 1px solid #eee;
  border-collapse: collapse;
  font-size: 4.444vw;
  padding: 4.167vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.editbanner>span{
  color: #505050;
}

</style>