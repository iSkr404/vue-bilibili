<template>
  <div>
    <div class="logtop">
      <div></div>
      <div>{{reltitle}}</div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "logtop",
  props: ["reltitle"],
};
</script>
<style scoped>
.logtop{
    height: 12.5vw;
    background-color: white;
    display: flex;
}
.logtop div{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.44vw;

}
</style>