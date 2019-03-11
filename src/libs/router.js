import Vue from "vue";
// 导入路由
import VueRouter from 'vue-router'
// use一下
Vue.use(VueRouter)

// 写组件
import loginin from '../components/loginin.vue'
import index from '../components/index.vue'
import users from '../components/users.vue'

// 写规则
let routes = [{
    path: '/loginin',
    component: loginin
}, {
    path: '/',
    component: index,
    children: [{
        path: 'users',
        component: users
    }]
}]

// 实例化路由
const router = new VueRouter({
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    //  to 去哪
    //  from 从哪来
    if (to.path === '/loginin') {
        // 这是登录页  直接放过去
        next()
    } else {
        // 不是登录页  进行判断
        if (window.sessionStorage.getItem('token')) {
            // 进行登录了
            next()
        } else {
            // 没登陆  
            // 提示
            Vue.prototype.$message.warning('请先登录')
            // Vue是构造函数 想要访问原型 要通过 prototype    区分开 构造函数 和 实例化的区别
            // Vue.$message.warning('请先登录')
            // this.$message.call(Vue).warning("请先登录")
            // 退到登录页
            next('/loginin')
        }
    }
})

// 导出
export default router



/*  总结:  
        1: 在导入的时候 注意大写 Vue  VueRouter (小写虽然没问题,但不规范)
        2: 步驟: 导入路由  写组件  写规则  实例化路由  导出
*/