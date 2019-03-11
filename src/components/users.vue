<template>
  <div>
    <!-- 顶部导航  面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <!-- 搜索框  input -->
          <el-input
            placeholder="请输入内容"
            v-model="sendData.query"
            @keyup.native.enter="searchData"
            class="input-with-select"
          >
            <el-button @click="searchData" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <!-- 添加用戶 按鈕 -->
          <el-button type="success" plain class="addUser" @click="addFormVisiable = true">添加用户</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mobile" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeStatus(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleEdit(scope.$index, scope.row, scope.column, scope.store)"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="delOne(scope.row)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分頁 -->
    <!-- <el-pagination
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>-->
    <!-- 添加用户 弹出框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisiable">
      <el-form
        :model="addFormCont"
        class="my-addForm"
        label-position="right"
        label-width="80px"
        status-icon
        :rules="rules"
        ref="addFormCont"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFormCont.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addFormCont.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFormCont.email" type="email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addFormCont.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisiable = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFormCont')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    // 自定义的校验规则
    var checkEmail = (rule, value, callback) => {
      // 延迟加载
      setTimeout(() => {
        // 定义正则表达式
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 验证是否匹配
        if (reg.test(value)) {
          // 格式匹配
          callback();
        } else {
          // 不匹配
          callback(new Error("请输入正确的邮箱"));
        }
      }, 1000);
    };
    var checkMobile = (rule, value, callback) => {
      // 延迟加载
      setTimeout(() => {
        // 定义正则
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        // 验证是否匹配
        if (reg.test(value)) {
          // 匹配
          callback();
        } else {
          // 不匹配
          callback(new Error("请输入正确的手机号码"));
        }
      }, 1000);
    };
    return {
      // 提交数据
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 20
      },
      //   表格数据
      tableData: [],
      // 设置是否显示
      addFormVisiable: false,
      // 添加用户表单
      addFormCont: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 新增的表单数据验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  // 方法
  methods: {
    handleEdit(index, row, column, store) {
      console.log(index);
      console.log(row);
      console.log(column);
      console.log(store);
    },
    // 搜索数据
    async searchData() {
      let res = await this.$http.get("users", {
        headers: {
          Authorization: window.sessionStorage.getItem("token")
        },
        params: this.sendData
      });
      // console.log(res);
      this.tableData = res.data.data.users;
    },
    // 添加用户 点击确定
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //  成功  调用接口 添加到数据库
          let res = await this.$http.post(
            "users",
            this.addFormCont
            // 因为写在axios 拦截器的请求里面 所以无需再写
            // ,{
            //   headers: {
            //     Authorization : window.sessionStorage.getItem('token')
            //   }
            // }
          );
          // 关闭遮罩层
          this.addFormVisiable = false;
          // 刷新页面
          this.searchData();
          // console.log(res)
        } else {
          // 失败 数据错误
          // this.$message.warning('请正确输入数据')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除单个
    delOne(it) {
      // 调用接口 进行删除
      // window.console.log(it);
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //  确认
          let res = await this.$http.delete(`users/${it.id}`);
          if (res.data.meta.status == 200) {
            // 刷新页面
            this.searchData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "嘻嘻"
          });
        });
    },
    // 改变状态
    async changeStatus(it) {
      // 调用接口 
      let res = await this.$http.put(`users/${it.id}/state/${it.mg_state}`)
      console.log(res)
    }
  },
  //  获取数据  生命周期函数
  created() {
    this.searchData();
  }
};
</script>

<style>
.my-breadcrumb.el-breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
.addUser {
  margin-left: 10px;
}
.my-addForm.el-form {
  height: auto;
  width: 100%;
  padding: 0;
}
</style>
