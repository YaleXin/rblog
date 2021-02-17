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
        <el-form-item prop="rawPassword">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
            type="password"
            v-model="loginForm.rawPassword"
            autocomplete="off"
            @keydown.enter.native="onSubmit"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
        </el-form-item> -->
        <el-form-item class="login-btn">
          <el-button plain type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import md5 from "js-md5";
import innerHttp from "../../network/innerHttp.js";
export default {
  name: "Login",
  components: {},
  activated() {
    console.log("activated");
  },
  data() {
    return {
      loginForm: {
        username: "",
        rawPassword: "",
        rememberMe: false
      },
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        rawPassword: { required: true, message: "请输入密码", trigger: "blur" }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginSuccess(data) {
      this.$message({
        showClose: true,
        message: "登录成功",
        type: "success"
      });
      this.$router.replace("/admin/index").catch(e => {});
      this.$store.commit("saveUser", data.user);
    },
    login() {
      const code =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let len = parseInt(Math.random() * 100 + 1);
      let str = "";
      for (let i = 0; i < len; i++) {
        str += code[parseInt(Math.random() * 62)];
      }
      let md5Str = md5(str);

      let user = {
        username: this.loginForm.username,
        password: md5(md5(md5(this.loginForm.rawPassword)) + md5Str)
      };
      innerHttp
        .post("/admin/login", {
          data: {
            user: user,
            salt: md5Str
          }
        })
        .then(res => {
          let status = res.status;
          if (status === undefined) {
            status = res.response.status;
            if (status === 402) {
              this.$message({
                showClose: true,
                message: "用户不存在",
                type: "error"
              });
            } else if (status === 403) {
              this.$message({
                showClose: true,
                message: "密码错误",
                type: "error"
              });
            }
          } else if (status === 200) {
            this.loginSuccess(res.data);
          }
        })
        .catch(e => {});
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
