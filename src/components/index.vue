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
        <el-row>
          <el-col :span="12" class="index-aside-title">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="index-main">Main</el-main>
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
      this.$message.warning("请先进行登录");
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
        window.sessionStorage.removeItem('token')
        // 退到登陆页面
        this.$router.push('/loginin')
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "嘻嘻"
          });
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
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
.index-main {
  flex: 1;
  background-color: #e9eef3;
}
.index-aside-title {
  width: 100%;
}
</style>
