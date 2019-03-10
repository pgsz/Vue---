import Vue from "vue";
// 导入路由
import VueRouter from 'vue-router'
// use一下
Vue.use(VueRouter)

// 写组件
import loginin from '../components/loginin.vue'

// 写规则
let routes = [
    {
        path: '/loginin',
        component: loginin
    }
]

// 实例化路由
const router = new VueRouter({
    routes
})

// 导出
export default router