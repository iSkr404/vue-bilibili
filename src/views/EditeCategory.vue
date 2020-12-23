<template>
  <div>
    <Navbar></Navbar>
    <van-divider :style="{ color: '#fb7399', borderColor: '#fb7399', padding: '0 16px' }">
      现有栏目
    </van-divider>
    <div class="editetab addtab">
      <p v-for="(item, index) in tabs" :key="index" @click="listsClick(index)">
        {{ item.title }}
      </p>
    </div>

    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      移除栏目
    </van-divider>
    <div class="editetab deltab">
      <p v-for="(item, index) in deltab" :key="index" @click="delClick(index)">
        {{ item.title }}
      </p>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
export default {
  name: "editecategory",
  data() {
    return {
      tabs: [],
      deltab: [],
    };
  },
  components: {
    Navbar,
  },
  created() {
    if (localStorage.getItem('tabs') && localStorage.getItem('deltab')) {
      this.tabs = JSON.parse(localStorage.getItem('tabs'));
      this.deltab = JSON.parse(localStorage.getItem('deltab'));
      return;
    }
    this.tabData();
  },
  methods: {
    async tabData() {
      const res = await this.$http.get("/category");
      this.tabs = res.data;
    },
    listsClick(index) {
      if (this.tabs.length < 4) {
        this.$msg.fail("至少保留三个")
        return;
      }
      this.deltab.push(this.tabs[index]);
      this.tabs.splice(index, 1);
    },
    delClick(index) {
      this.tabs.push(this.deltab[index]);
      this.deltab.splice(index, 1);
    },
  },
  watch: {
    tabs() {
      localStorage.setItem('tabs', JSON.stringify(this.tabs));
      localStorage.setItem('deltab', JSON.stringify(this.deltab));
    }
  },
};
</script>

<style scoped>
.editetab {
  display: flex;
  flex-wrap: wrap;
  padding: 0 2.78vw;
}
.editetab p {
  width: 20%;
  text-align: center;
  margin: 1.38vw 1.9vw;
  padding: 1.94vw 0;
}
.addtab p {
  color: #fb7399;
  border: 1px solid #fb7399;
}
.deltab p {
  color: #1989fa;
  border: 1px solid #1989fa;
}
</style>