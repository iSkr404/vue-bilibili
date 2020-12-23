import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//Vant 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法
import Vant from 'vant';
import 'vant/lib/index.css';
import http from '../http';
import { Toast } from 'vant';
// 引入icon的样式文件
import "@/assets/style.css"
// 挂在vue的prototype上边全局直接可以this访问
Vue.prototype.$http = http;
Vue.prototype.$msg = Toast;

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
