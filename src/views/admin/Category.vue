<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-table :data="categoryList" border style="width: 100%" stripe :fit="true">
      <el-table-column align="center" label="分类名称">
        <template slot-scope="scope">
          <el-input @change="inputChang(scope.$index)" v-model="scope.row.name" class="category-input" disabled placeholder="请输入新分类名称"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right"  label="操作">
        <template slot-scope="scope">
          <el-button v-show="!saveList[scope.$index]"
            @click="editCategoryClick(scope.row.id, scope.$index)"
            type="primary"
            size="small"
          >编辑</el-button>
          <el-button v-show="saveList[scope.$index]"
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
  name: "Category",
  components: {},
  data() {
    return {
      categoryList: [
        { id: 0, name: "算法" },
        { id: 1, name: "Java" },
        { id: 2, name: "Linux相关" },
        { id: 3, name: "情感生活" },
        { id: 4, name: "其他" }
      ],
      saveList: [false, false, false, false, false],
    };
  },
  methods: {
    deleteCategoryClick(id) {
      this.$confirm(
        "此操作将永久删除该分类下的文章: " + id + ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
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
    },
    editCategoryClick(id, index) {
      this.$set(this.saveList, index, true);
      document.getElementsByClassName("category-input")[index].classList.remove("is-disabled");
      document.getElementsByClassName("category-input")[index].firstElementChild.removeAttribute("disabled");
      document.getElementsByClassName("category-input")[index].firstElementChild.focus();
    },
    saveCategoryClick(id, index) {
      this.$set(this.saveList, index, false);
      console.log(this.saveList);
      document.getElementsByClassName("category-input")[index].firstElementChild.setAttribute("disabled", 'disabled');
      document.getElementsByClassName("category-input")[index].classList.add("is-disabled");
    },
    inputChang(index){

    },
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
