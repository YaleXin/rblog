<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <div>
      <el-button @click="editBlogClick(-1)" type="primary" style="margin-bottom: 10px;" plain>添加新文章</el-button>
    </div>
    <el-table :data="page.content" border style="width: 100%" stripe :fit="true">
      <el-table-column align="center" prop="name" label="文章"></el-table-column>
      <el-table-column align="center" label="最后更新日期">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
          >{{ scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间日期">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
          >{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="category.name" label="类别"></el-table-column>
      <el-table-column align="center" prop="tags" label="标签">
        <template slot-scope="scope">
          <el-tag
            v-for="(tag, index) in scope.row.tags"
            :key="index"
            :type="index % 2 === 0 ? 'primary' : 'success'"
            disable-transitions
          >{{tag.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="editBlogClick(scope.row.id)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteBlogClick(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
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
  name: "BlogList",
  components: {},
  activated() {
    this.currentChange(this.page.pageNum);
  },
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 5,
        totalSize: 10,
        totalPages: 0,
        content: [
          {
            id: 1,
            name: "",
            content: "",
            description: "",
            createTime: "2021-02-09T08:57:19.000+00:00",
            updateTime: "2021-02-09T08:57:19.000+00:00",
            category: {
              id: 1,
              name: ""
            },
            tags: [
              {
                id: 1,
                name: ""
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    editBlogClick(id) {
      this.$router.push("/admin/blog/" + id).catch(e => {});
    },
    delBlogSuccess() {
      this.$message({
        showClose: true,
        type: "success",
        message: "删除成功!"
      });
      this.currentChange(this.page.pageNum);
    },
    delBlogFail() {
      this.$message({
        showClose: true,
        type: "error",
        message: "删除失败!"
      });
    },
    deleteBlogClick(blogId) {
      this.$confirm("此操作将永久删除该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          innerHttp
            .delete("/admin/blog/delete/" + blogId)
            .then(res => {
              if (res.data.result > 0) {
                this.delBlogSuccess();
              } else {
                this.delBlogFail();
              }
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除"
          });
        });
    },

    currentChange(newIndex) {
      this.page.pageNum = newIndex;

      innerHttp
        .get("/admin/blog/blogPage", {
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
    }
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
.el-tag {
  margin-left: 5px;
}
</style>
