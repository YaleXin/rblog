<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <div>
      <el-button @click="addBlogClick(-1)" type="primary" style="margin-bottom: 10px;" plain>添加新文章</el-button>
    </div>
    <el-table :data="blogList" border style="width: 100%" stripe :fit="true">
      <el-table-column align="center" prop="title" label="文章"></el-table-column>
      <el-table-column align="center" prop="date" label="日期"></el-table-column>
      <el-table-column align="center" prop="category" label="类别"></el-table-column>
      <el-table-column align="center" prop="tags" label="标签">
        <template slot-scope="scope" >
          <el-tag
            v-for="(tag, index) in scope.row.tags"
            :key="index"
            :type="index % 2 === 0 ? 'primary' : 'success'"
            disable-transitions
          >{{tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="addBlogClick(scope.row.id)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteBlogClick(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
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
  name: "BlogList",
  components: {},
  data() {
    return {
      blogList: [
        {
          id: 1,
          title: "Java中给静态方法添加synchronized时候的锁",
          date: "2020/12/31 12:22:34",
          category: "Java",
          tags: ["多线程", "锁"]
        },
        {
          id: 2,
          title: "几种求质数的方法",
          date: "2020/2/1 12:22:34",
          category: "算法",
          tags: ["数论", "筛选法", "暴力法"]
        },
        {
          id: 3,
          title: "将int类型整数向上取2次幂",
          date: "2020/7/31 12:22:34",
          category: "算法",
          tags: ["位运算", "移位"]
        },
        {
          id: 4,
          title: "Java中给静态方法添加synchronized时候的锁",
          date: "2020/12/31 12:22:34",
          category: "Java",
          tags: ["多线程", "锁"]
        },
        {
          id: 5,
          title: "几种求质数的方法",
          date: "2020/2/1 12:22:34",
          category: "算法",
          tags: ["数论", "筛选法", "暴力法"]
        },
        {
          id: 6,
          title: "将int类型整数向上取2次幂",
          date: "2020/7/31 12:22:34",
          category: "算法",
          tags: ["位运算", "移位"]
        }
      ]
    };
  },
  methods: {
    addBlogClick(id) {
      this.$router.push("/admin/blog/" + id).catch(e => {});
    },
    deleteBlogClick(id) {
      this.$confirm("此操作将永久删除该博客: " + id + ", 是否继续?", "提示", {
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
.el-pagination {
  margin-top: 20px;
}
.el-tag{
  margin-left: 5px;
}
</style>
