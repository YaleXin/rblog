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
    <comment-list :comments="commentList"></comment-list>
    <el-divider content-position="center">
      开始评论
      <i class="el-icon-edit"></i>
    </el-divider>
    <comment-input v-if="!commentFinished" @comment-submit="submitComment"></comment-input>
  </div>
</template>

<script>
import innerHttp from "../network/innerHttp.js";
import CommentInput from "./CommentInput.vue";
import CommentList from "./CommentList.vue";
export default {
  name: "Comment",
  components: {
    CommentInput,
    CommentList
  },
  data() {
    return {
      commentList: [],
      commentFinished: false
    };
  },
  methods: {
    loadCommentsByBlogId(blogId) {
      if (blogId === undefined || blogId < 0) {
        this.$message({
          showClose: true,
          type: "error",
          message: "无法请求非法博客评论"
        });
      } else {
        innerHttp
          .get("/comment/" + blogId)
          .then(res => {
            this.commentList = res.data.comments;
          })
          .catch(e => {});
      }
    },
    submitComment(comment) {
      let blogId = this.$route.params.id;
      comment.blogId = parseInt(blogId);
      if (comment.blogId === NaN || comment.blogId < 0)
        this.$message({
          showClose: true,
          type: "error",
          message: "博客id转换失败"
        });
      console.log(comment);
      innerHttp
        .put("/comment/add", {
          data: JSON.stringify(comment)
        })
        .then(res => {
          if (res.status === 200 && res.data.addComment.id > 0) {
            this.$message({
              showClose: true,
              message: "评论成功",
              type: "success"
            });
            this.commentFinished = true;
          }
        })
        .catch(e => {});
    }
  }
};
</script>

<style scoped>
</style>
