<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-form ref="form" :model="form">
      <el-input
        class="comment-form-item"
        placeholder="昵称"
        prefix-icon="el-icon-user"
        v-model="form.nickname"
      ></el-input>
      <el-input
        class="comment-form-item"
        placeholder="邮箱"
        prefix-icon="el-icon-message"
        v-model="form.email"
      ></el-input>
      <el-input
        class="comment-form-item"
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10}"
        placeholder="请输入内容"
        v-model="form.content"
      ></el-input>
    </el-form>
  </div>
</template>

<script>
import CommentUtils from '../assets/js/CommentUtils.js'
export default {
  name: "CommentInput",
  components: {},
  data() {
    return {
      form: {
        nickname: "",
        email: "",
        content: "",
        date: "",
        browser: "",
        OS: "",
      }
    };
  },
  created(){
    this.form.OS = CommentUtils.getOS();
    this.form.browser = CommentUtils.getBrowser();
    
  },
};
</script>

<style scoped>
.comment-form-item {
  margin-top: 5px;
}
</style>
