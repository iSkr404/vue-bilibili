<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.iskeep"/>
    </keep-alive>
    <router-view v-if="!$route.meta.iskeep"/>
  </div>
</template>
<script>
export default {
  mounted() {
    this.cshow();
    window.onresize=()=>{this.check();location.reload();};
  },
  methods: {
    isMobile() {
        let res = false
        let sUserAgent = navigator.userAgent.toLowerCase()
        let bIsIpad = sUserAgent.match(/ipad/i) == "ipad"
        let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"
        let bIsMidp = sUserAgent.match(/midp/i) == "midp"
        let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"
        let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb"
        let bIsAndroid = sUserAgent.match(/android/i) == "android"
        let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce"
        let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"
        if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
            res = true
        }
        return res;
    },
    check() {
      let ishow=true;
      let dnode=document.getElementById("device-tip");
      if (this.isMobile()) {
          dnode.style.visibility="hidden";
      } else {
          dnode.style.visibility="visible";
      }
    },
    cshow(){
      let div_tip=document.createElement('div');
      let devicTtip =
         '<div class="device-tip" id="device-tip">\n' +
        '  <p>请您按下 <span class="svg-wave bold">F12</span> 键，开启 <span class="svg-wave bold">手机模式</span> 后刷新页面～</p>\n' +
        '</div>'
      div_tip.innerHTML=devicTtip;
      document.getElementById('app').appendChild(div_tip);
      this.check();
    }
  }
}
</script>
<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
p {
  margin: 0;
  padding: 0;
}
</style>
