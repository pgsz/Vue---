import Vue from "vue";
// 导入路由
import VueRouter from 'vue-router'
// use一下
Vue.use(VueRouter)

// 写组件
import loginin from '../components/loginin.vue'
import index from '../components/index.vue'

// 写规则
let routes = [{
    path: '/loginin',
    component: loginin
},{
    path: '/',
    component: index
}]

// 实例化路由
const router = new VueRouter({
    routes
})

// 导出
export default router


/*  总结:  
        1: 在导入的时候 注意大写 Vue  VueRouter (小写虽然没问题,但不规范)
        2: 步驟: 导入路由  写组件  写规则  实例化路由  导出
*/