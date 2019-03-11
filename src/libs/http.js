// 导入axios
import axios from 'axios'

// 导入Vue
import Vue from 'vue';

// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

// axios拦截器   请求
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 请求正确
    // window.console.log(config)
    // config: 此次请求的各项设置  保存了请求的内容
    // window.console.log('拦截拉')
    if (config.url.indexOf('/login') == -1) {
        // 不是登录接口 
        config.headers.Authorization = window.sessionStorage.getItem('token')
    }
    return config;
}, function (error) {
    // Do something with request error
    // 请求错误
    return Promise.reject(error);
});

//  axios拦截器  响应
axios.interceptors.response.use(function (response) {
    // Do something with response data
    // 响应成功
    // window.console.log(response)
    if (response.data.meta.status == 200) {
        Vue.prototype.$message.success(response.data.meta.msg)
    } else if (response.data.meta.status == 201) {
        Vue.prototype.$message.warning(response.data.meta.msg)
    } else if (response.data.meta.status == 204 || response.data.meta.status == 400) {
        Vue.prototype.$message.error(response.data.meta.msg)
    } else {
        Vue.prototype.$message(response.data.meta.msg)
    }
    // window.console.log('响应了')
    return response;
}, function (error) {
    // Do something with response error
    // 响应失败
    return Promise.reject(error);
});

// 实现install方法
// 把axios设置到Vue原型上
// 暴露出去
export default {
    install(Vue) {
        Vue.prototype.$http = axios
    }
}