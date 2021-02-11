<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-table :data="page.content" border style="width: 100%" stripe :fit="true">
      <el-table-column align="center" label="分类名称">
        <template slot-scope="scope">
          <el-input
            @change="inputChang(scope.$index)"
            v-model="scope.row.name"
            class="category-input"
            disabled
            placeholder="请输入新分类名称"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            v-show="!saveList[scope.$index]"
            @click="editCategoryClick(scope.row.id, scope.$index)"
            type="primary"
            size="small"
          >编辑</el-button>
          <el-button
            v-show="saveList[scope.$index]"
            @click="saveCategoryClick(scope.row.id, scope.$index)"
            type="success"
            size="small"
          >保存</el-button>

          <el-button @click="deleteCategoryClick(scope.row.id)" type="danger" size="small">删除</el-button>
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
  name: "Category",
  components: {},
  activated() {
    this.currentChange(this.page.pageNum);
    for (let i = 0; i < this.page.pageSize; i++) {
      this.saveList[i] = false;
      let categoryInput = document.getElementsByClassName("category-input")[i];
      if (categoryInput !== undefined) {
        categoryInput.firstElementChild.setAttribute("disabled", "disabled");
        categoryInput.classList.add("is-disabled");
      }
    }
  },
  data() {
    return {
      categoryList: [
        { id: 0, name: "算法" },
        { id: 1, name: "Java" },
        { id: 2, name: "Linux相关" },
        { id: 3, name: "情感生活" },
        { id: 4, name: "其他" }
      ],
      page: {
        pageNum: 1,
        pageSize: 5,
        totalSize: 10,
        totalPages: 0,
        content: [
          {
            id: 1,
            name: ""
          }
        ]
      },
      saveList: [false, false, false, false, false]
    };
  },
  methods: {
    deleteCategoryClick(categoryId) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          innerHttp
            .delete("/admin/category/delete/" + categoryId)
            .then(res => {
              console.log(res);
              if (res.data.result > 0) {
                this.delCategorySuccess();
              } else {
                this.delCategoryFail();
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
    editCategoryClick(id, index) {
      this.$set(this.saveList, index, true);
      document
        .getElementsByClassName("category-input")
        [index].classList.remove("is-disabled");
      document
        .getElementsByClassName("category-input")
        [index].firstElementChild.removeAttribute("disabled");
      document
        .getElementsByClassName("category-input")
        [index].firstElementChild.focus();
    },
    saveCategoryClick(id, index) {
      this.$set(this.saveList, index, false);
      console.log(this.saveList);
      document
        .getElementsByClassName("category-input")
        [index].firstElementChild.setAttribute("disabled", "disabled");
      document
        .getElementsByClassName("category-input")
        [index].classList.add("is-disabled");
      if (this.page.content[index].name.trim() === "") {
        this.saveFail();
      } else {
        innerHttp
          .put("/admin/category/modify", {
            data: JSON.stringify(this.page.content[index])
          })
          .then(res => {
            if (res.status === 200) {
              this.$message({
                showClose: true,
                message: "更新成功",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: "更新失败",
                type: "error"
              });
            }
          })
          .catch(e => {});
      }
    },
    inputChang(index) {},
    delCategorySuccess() {
      this.$message({
        showClose: true,
        message: "删除成功",
        type: "success"
      });
      this.currentChange(this.page.pageNum);
    },
    delCategoryFail() {
      this.$message({
        showClose: true,
        message: "删除失败",
        type: "error"
      });
    },
    saveFail() {
      this.$message({
        showClose: true,
        type: "error",
        message: "修改失败"
      });
      this.currentChange(this.page.pageNum);
    },
    currentChange(newIndex) {
      this.page.pageNum = newIndex;
      innerHttp
        .get("/admin/category/categoryPage", {
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
</style>
