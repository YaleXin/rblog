<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card class="login-card-box">
      <div slot="header" style="text-align: center" class="clearfix">
        <span style="font-size: 20px; font-weight: bolder">请登录</span>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="psw">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
            type="password"
            v-model="loginForm.psw"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button plain type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginForm: {
        username: "",
        psw: "",
        rememberMe: false
      },
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        psw: { required: true, message: "请输入密码", trigger: "blur" }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-card-box {
  width: 300px;
  position: absolute;
  left: 39%;

  transition: (-50%, -50%);
}
.el-form-item {
  margin-bottom: 5px;
}
.login-btn {
  text-align: center;
}
</style>
