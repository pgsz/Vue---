<template>
  <div class="loginin">
    <el-form
      :model="formData"
      status-icon
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
      :rules="rules"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="formData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="el-form-btn" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据
      formData: {
        username: "",
        password: ""
      },
      //   表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          //   console.log("error submit!!");
          //   this.$message.error("请输入正确的用户名和密码");
          this.$message({
            showClose: true,
            message: "请输入正确的用户名和密码",
            type: "error"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body > div:nth-of-type(1) {
  height: 100%;
}
.loginin {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 580px;
  height: 440px;
  background-color: #fff;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
}
.el-form-btn {
  width: 100%;
}
</style>
