<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <article-list :articleList="page.content"></article-list>
    <!-- 分页 -->
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
import innerHttp from "../network/innerHttp.js";
import ArticleList from "../components/ArticleList.vue";
export default {
  name: "Home",
  components: {
    ArticleList
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
    currentChange(newIndex) {
      this.page.pageNum = newIndex;
      innerHttp
        .get("/blog/blogPage", {
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
  },
  created() {
    this.currentChange(this.page.pageNum);
  },
  activated() {
    document.title = "黄阿信的博客";
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
