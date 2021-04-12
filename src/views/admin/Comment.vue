<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-table :data="page.content" border style="width: 100%" stripe :fit="true">
      <el-table-column align="center" label="创建日期">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
          >{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="评论者">
        <el-table-column align="center" label="昵称" prop="nickname"></el-table-column>
        <el-table-column align="center" label="邮箱" prop="email"></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="所属文章" prop="blogName"></el-table-column>
      <!-- <el-table-column align="center" label="回复楼层" prop="blogName"></el-table-column> -->
      <el-table-column align="center" label="回复内容" prop="content"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.audited"
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
    <!-- 分页 -->
    <div style="text-align: center;margin-top: 20px;">
      <el-pagination
        background
        :current-page="page.pageNum"
        :pager-count="5"
        @current-change="currentChange"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="page.totalSize"
        :page-size="page.pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import innerHttp from "../../network/innerHttp.js";
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
      ],
      page: {
        pageNum: 1,
        pageSize: 5,
        totalSize: 10,
        totalPages: 0,
        content: [
          {
            id: 1,
            nickname: "",
            email: "",
            content: "",
            createTime: "2021-02-09 08:57:19",
            audited: false,
            os: "",
            browser: "",
            sendEmailed: false,
            blogName: ""
          }
        ]
      }
    };
  },
  created() {
    this.currentChange(this.page.pageNum);
  },
  methods: {
    currentChange(newIndex) {
      this.page.pageNum = newIndex;

      innerHttp
        .get("/admin/comment/commentPage", {
          params: {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
          }
        })
        .then(res => {
          this.page = res.data.page;
        })
        .catch(e => {
          console.log(e);
        });
    },
    rejectCommentClick(cmtId, index) {
      if (cmtId > 0) {
        innerHttp
          .put("/admin/comment/reject", {
            data: JSON.stringify(cmtId)
          })
          .then(res => {
            console.log(res);
            console.log(res.data.result);
            if (res.data.result > 0) {
              this.opSuccess(index, false);
            }
          })
          .catch(e => {});
      }
    },
    acceptCommentClick(cmtId, index) {
      if (cmtId > 0) {
        innerHttp
          .put("/admin/comment/accept", {
            data: JSON.stringify(cmtId)
          })
          .then(res => {
            console.log(res);
            console.log(res.data.result);
            if (res.data.result > 0) {
              this.opSuccess(index, true);
            }
          })
          .catch(e => {});
      }
    },
    deleteSuccess() {
      this.$message({
        showClose: true,
        type: "success",
        message: "删除成功!"
      });
      this.currentChange(this.page.pageNum);
    },
    opSuccess(index, rejectOraccept) {
      this.$message({
        showClose: true,
        message: "操作成功",
        type: "success"
      });
      this.page.content[index].audited = rejectOraccept;
      console.log(this.page.content[index].audited);
    },
    deleteCommentClick(cmtId) {
      if (cmtId > 0) {
        this.$confirm("此操作将永久删除该该评论, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log("cmtId = " + cmtId);
            innerHttp
              .delete("/admin/comment/delete", {
                data: {
                  id: JSON.stringify(cmtId)
                }
              })
              .then(res => {
                if (res.data.result > 0) {
                  this.deleteSuccess();
                }
              })
              .catch(e => {});
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  }
};
</script>

<style scoped>
.el-button {
  margin-top: 2px;
}
</style>
