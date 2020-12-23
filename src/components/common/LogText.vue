<template>
  <div>
    <van-field
      :label="label"
      :type="type"
      :placeholder="placeholder"
      v-model="content"
    />
  </div>
</template>
<script>
export default {
  name: "logtext",
  props: ["label", "type", "placeholder", "rule"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    //   校验正则数据是否成功
    handleulg(){
        const rule=new RegExp(this.rule);
        if(rule.test(this.content)){
            // 正则校验成功,把数据发回父组件
            this.$emit('inputchange',this.content);
        }
    }

  },
  //   监听数据是否发生改变,content数据已经双向绑定
  watch: {
    content() {
      this.handleulg();
    },
  },
};
</script>