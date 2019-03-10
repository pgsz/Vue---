import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入饿了吗ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入axiso
import http from './libs/http';
Vue.use(http)

// 导入组件
import router from './libs/router';

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
