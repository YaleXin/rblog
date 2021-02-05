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
    <el-divider content-position="center">修改其他</el-divider>
    <el-form inline :model="infoForm" :rules="infoRules" ref="infoForm" label-width="100px">
      <el-form-item label="头像地址" prop="avatarUrl">
        <el-input
          placeholder="请输入URL(不含协议类型)"
          v-model="infoForm.avatarUrl"
          class="input-with-select"
        >
          <el-select
            v-model="infoForm.protocol"
            slot="prepend"
            placeholder="请选择协议类型"
            style="width: 90px;"
          >
            <el-option label="https://" value="https://"></el-option>
            <el-option label="http://" value="http://"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="infoForm.username" autocomplete="off" placeholder="请输入您的新用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="infoForm.nickname" autocomplete="off" placeholder="请输入您的新昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('infoForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
      },
      infoForm: {
        avatarUrl: "",
        protocol: "https://",
        nickname: "",
        username: ""
      },
      infoRules: {
        nickname: { validator: validateEnglishAndNumber, trigger: "blur" },
        username: {
          required: true,
          message: "请输入您的用户名",
          trigger: "blur"
        },
        protocol: {
          required: true,
          message: "请输入头像地址协议",
          trigger: "blur"
        },
        avatarUrl: {
          required: true,
          message: "请输入头像地址",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
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
</style>
