<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-table :data="commentList" border style="width: 100%" stripe :fit="true">
      <el-table-column align="center" label="日期" prop="date"></el-table-column>
      <el-table-column align="center" label="评论者">
        <el-table-column align="center" label="昵称" prop="author"></el-table-column>
        <el-table-column align="center" label="邮箱" prop="email"></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="所属文章" prop="blogName"></el-table-column>
      <el-table-column align="center" label="回复楼层" prop="blogName"></el-table-column>
      <el-table-column align="center" label="回复内容" prop="content"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.accept"
            @click="rejectCommentClick(scope.row.id, scope.$index)"
            type="primary"
            size="small"
          >下架该评论</el-button>
          <el-button
            v-else
            @click="acceptCommentClick(scope.row.id, scope.$index)"
            type="success"
            size="small"
          >通过该评论</el-button>
          <el-button @click="deleteCommentClick(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: center;margin-top: 20px;">
      <el-pagination
        background
        :pager-count="5"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="1000"
        :page-size="20"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  components: {},
  data() {
    return {
      commentList: [
        {
          id: 0,
          date: "2012/12/12 23:19:09",
          author: "黄阿信",
          email: "me@yalexin.top",
          content: "五块钱如何花三天？",
          blogName: "题目",
          reply: "blog",
          accept: true
        },
        {
          id: 1,
          date: "2012/12/12 23:19:09",
          author: "回复者1",
          email: "me@yw.cq",
          content: "人可以几天不吃饭？",
          blogName: "题目",
          reply: "黄阿信",
          accept: true
        },
        {
          id: 2,
          date: "2012/12/12 23:19:09",
          author: "回复者2",
          email: "43244grf@qq.com",
          content: "晚上睡大街会被警察抓吗？",
          blogName: "题目",
          reply: "回复者1",
          accept: true
        },
        {
          id: 3,
          date: "2012/12/12 23:19:09",
          author: "顶层评论者2",
          email: "3380257166@qq.com",
          content: "今天是个好天气",
          blogName: "blog",
          accept: true
        },
        {
          id: 4,
          date: "2012/12/12 23:19:09",
          author: "新的评论者",
          email: "3380257166@qq.com",
          content: "测试评论",
          blogName: "blog",
          accept: false
        }
      ]
    };
  },
  methods: {
    rejectCommentClick(id, index) {
      this.commentList[index].accept = false;
    },
    acceptCommentClick(id, index) {
      this.commentList[index].accept = true;
    },
    deleteCommentClick(id) {
      this.$confirm("此操作将永久删除该该评论: " + id + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-button {
  margin-top: 2px;
}
</style>
