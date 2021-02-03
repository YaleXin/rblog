<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-divider content-position="center">
      历史评论
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
import CommentInput from "./CommentInput.vue";
import CommentList from "./CommentList.vue";
export default {
  name: "Comment",
  components: {
    CommentInput,
    CommentList
  }
};
</script>

<style scoped>
</style>
