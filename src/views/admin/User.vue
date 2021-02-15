<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-divider content-position="center">修改密码</el-divider>
    <el-form inline :model="pswForm" :rules="passRules" ref="pswForm" label-width="100px">
      <el-form-item label="原密码" prop="oldPass">
        <el-input type="password" show-password v-model="pswForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="pass">
        <el-input type="password" show-password v-model="pswForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" show-password v-model="pswForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('pswForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from "js-md5";
import innerHttp from "../../network/innerHttp.js";
export default {
  name: "User",
  components: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pswForm.checkPass !== "") {
          this.$refs.pswForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pswForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else if (value === this.pswForm.oldPass) {
        callback(new Error("新密码不应该相同"));
      } else {
        callback();
      }
    };
    let validateEnglishAndNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value.lengh < 3 || value.lengh > 10) {
        callback(new Error("请输入3~10个字符"));
      } else {
        for (let i = 0; i < value.lengh; i++) {
          if (
            !(
              (value[i] >= "a" && value[i] <= "z") ||
              (value[i] >= "A" && value[i] <= "Z") ||
              (value[i] >= "0" && value[i] <= "9")
            )
          )
            new Error("用户名由数字或者字母组成");
        }
      }
    };
    return {
      pswForm: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      passRules: {
        oldPass: { validator: validatePass, trigger: "blur" },
        pass: { validator: validatePass, trigger: "blur" },
        checkPass: { validator: validatePass2, trigger: "blur" }
      }
    };
  },
  created() {
    this.getUser();
  },
  activated() {},
  methods: {
    getUser() {
      innerHttp
        .get("/admin/user/info")
        .then(res => {
          if (res.data !== undefined) {
            this.$store.commit("saveUser", res.data);
          }
        })
        .catch(e => {});
    },
    submitForm(formName) {
      this.$refs.pswForm.validate(valid => {
        if (valid) {
          this.updatePassword();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updatePasswordSuccess() {
      this.$message({
        message: "修改成功，请重新登录",
        showClose: true,
        type: "success"
      });
      this.$store.commit("removeUser");
      this.$router.replace("/admin/login").catch(e => {});
    },
    updatePasswordFail() {
      this.$message({
        message: "修改失败，请重试",
        showClose: true,
        type: "error"
      });
    },
    updatePassword() {
      console.log("updatePassword ");
      let user = this.$store.state.user;
      let md5OldPsw = md5(this.pswForm.oldPass);
      let md5NewPsw = md5(this.pswForm.pass);
      innerHttp
        .post("/admin/user/update", {
          data: {
            oldPsw: md5OldPsw,
            newPsw: md5NewPsw,
            username: user.username
          }
        })
        .then(res => {
          console.log(res);
          if (res.data > 0) {
            this.updatePasswordSuccess();
          } else {
            this.updatePasswordFail();
          }
        })
        .catch(e => {});
    }
  }
};
</script>

<style scoped>
</style>
