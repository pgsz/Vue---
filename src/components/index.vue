<template>
  <el-container class="index-body">
    <el-header class="index-header">
      <el-row>
        <el-col :span="4" class="index-header-left">
          <img src="../assets/logo.png" alt>
        </el-col>
        <el-col :span="16" class="index-header-center">电商后台管理系统</el-col>
        <el-col :span="4" class="index-header-right">
          <el-button type="warning" @click="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="index-container">
      <el-aside width="200px" class="index-aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="users" class="el-icon-menu">用户列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">

        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 生命周期钩子函数
  beforeCreate() {
    // 做判断 是否有无token
    if (window.sessionStorage.getItem("token")) {
      // 不用管
    } else {
      // 没有登录
      // 提示用户
      // this.$message.warning("请先进行登录");
      // 跳到登录页
      this.$router.push("/loginin");
    }
  },
  methods: {
    //   退出
    logout() {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出!"
          });
          //   删除token
          window.sessionStorage.removeItem("token");
          // 退到登陆页面
          this.$router.push("/loginin");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "嘻嘻"
          });
        });
    },
  }
};
</script>

<style>
.index-body {
  height: 100%;
}
.index-header {
  height: 60px;
  background-color: #b3c0d1;
  line-height: 60px;
}
.index-header-left img {
  height: 100%;
}
.index-header-center {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
}
.index-header-right {
  text-align: center;
}
.index-container {
  display: felx;
}
.index-aside {
  width: 200px;
}
.index-main.index-main {
  flex: 1;
  background-color: #e9eef3;
  padding-top: 0;
}
.index-aside-title {
  width: 100%;
}
</style>
