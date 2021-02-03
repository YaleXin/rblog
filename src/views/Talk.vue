<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-divider content-position="center">
      历史留言或自嘲
      <i class="el-icon-s-comment"></i>
    </el-divider>
    <comment-list></comment-list>
    <el-divider content-position="center">
      开始评论
      <i class="el-icon-edit"></i>
    </el-divider>
    <comment-input></comment-input>
  </div>
</template>

<script>
import CommentInput from "../components/CommentInput.vue";
import CommentList from "../components/CommentList.vue";
export default {
  name: "Talk",
  components: {
    CommentInput,
    CommentList
  }
};
</script>

<style scoped>
</style>
