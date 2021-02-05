<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-table  :data="tagList" border style="width: 100%" stripe :fit="true">
      <el-table-column align="center" label="标签名称">
        <template slot-scope="scope">
          <el-input @change="inputChang(scope.$index)" v-model="scope.row.name" class="tag-input" disabled placeholder="请输入新标签名称"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-show="!saveList[scope.$index]"
            @click="editTagClick(scope.row.id, scope.$index)"
            type="primary"
            size="small"
          >编辑</el-button>
          <el-button v-show="saveList[scope.$index]"
            @click="saveTagClick(scope.row.id, scope.$index)"
            type="success"
            size="small"
          >保存</el-button>
          
          <el-button @click="deleteTagClick(scope.row.id)" type="danger" size="small">删除</el-button>
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
  name: "Tag",
  components: {},
  data() {
    return {
      tagList: [
        { id: 0, name: "暴力法" },
        { id: 1, name: "哈希" },
        { id: 2, name: "并发" },
        { id: 3, name: "可重入锁" },
        { id: 4, name: "闭包" },
        { id: 5, name: "数字签名" },
        { id: 6, name: "对称加密" },
      ],
      saveList: [false, false, false, false, false, false, false],
    };
  },
  methods: {
    deleteTagClick(id) {
      this.$confirm(
        "此操作将永久删除该标签下的文章: " + id + ", 是否继续?",
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
    editTagClick(id, index) {
      this.$set(this.saveList, index, true);
      document.getElementsByClassName("tag-input")[index].classList.remove("is-disabled");
      document.getElementsByClassName("tag-input")[index].firstElementChild.removeAttribute("disabled");
      document.getElementsByClassName("tag-input")[index].firstElementChild.focus();
    },
    saveTagClick(id, index) {
      this.$set(this.saveList, index, false);
      console.log(this.saveList);
      document.getElementsByClassName("tag-input")[index].firstElementChild.setAttribute("disabled", 'disabled');
      document.getElementsByClassName("tag-input")[index].classList.add("is-disabled");
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
