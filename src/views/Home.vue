<template>
  <div class="home" v-if="category">
    <Navbar></Navbar>
    <div class="categorytab">
      <div class="categorytab-ico" @click="$router.push('/editeCategory')">
        <van-icon name="setting-o" />
      </div>
      <van-tabs v-model="active" swipeable sticky>
        <van-tab class="title_font" v-for="(item, index) in category" :title="item.title" :key="index">
          <van-list v-model="item.loading" :immediate-check="false" :finished="item.finished" finished-text="我也是有底线的" @load="onLoad">
            <div class="detailparent">
              <Detail class="detailitem" v-for="(categoryItem, categoryIndex) in item.list" :key="categoryIndex" :detailitem="categoryItem" />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Detail from "@/components/common/Detail";
export default {
  name: "home",
  data() {
    return {
      category: [],
      active: 0,
    };
  },
  components: {
    Navbar,
    Detail,
  },
  created() {
    this.selsctCategory();
  },
  // 页面活跃情况下调用
  activated() {
    if (localStorage.getItem("tabs")) {
      let tabs = JSON.parse(localStorage.getItem("tabs"));
      this.changeCategory(tabs);
      this.selectArticle();
    }
  },
  methods: {
    // 标题分类的请求
    async selsctCategory() {
      if (localStorage.getItem("tabs")) {
        return;
      }
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
      this.selectArticle();
    },
    // 改造数据添加一个list,页码,一页加载多少,显示加载完
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.pagesize = 10;
        item.finished = false;
        item.loading = false;
        return item;
      });
      this.category = category1;
    },
    async selectArticle() {
      const categoryitem = this.categoryItem();
      // get  /detail/ 标题的id   +   渲染页数和条数
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize,
        },
      });
      // 构析赋值  解构
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      //最后一次加载pagesize小于设置的加载pagesize就显示没有更多了
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    },
    onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 1000);
    },
  },
  watch: {
    // 点击标题数据发生改变时，发送一次请求
    active() {
      this.selectArticle();
    },
  },
};
</script>

<style scoped>
.home {
  background-color: white;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.detailparent .detailitem {
  width: 45%;
}
.categorytab {
  position: relative;
}
.categorytab .categorytab-ico {
  position: absolute;
  right: 0;
  z-index: 5;
  top: 1.944vw;
  padding: 1.5vw 3.8vw;
  background-color: white;
}
.van-tab {
}
</style>