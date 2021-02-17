<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-divider content-position="center">
      搜索结果：共
      <span style="color: #35b8ff">{{page.totalSize}}</span>条
    </el-divider>
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
import { EventBus } from "../eventBus/index.js";
import ArticleList from "../components/ArticleList.vue";
export default {
  name: "Search",
  components: {
    ArticleList
  },
  activated() {
    EventBus.$on("searchSubmit", this.receiveParam);
    document.title = "搜索";
  },
  created() {},
  methods: {
    // 按下回车键后触发
    receiveParam(param) {
      this.nameOrContent = param;
      this.currentChange(this.page.pageNum);
      this.pageNum = 1;
    },
    currentChange(newIndex) {
      this.page.pageNum = newIndex;
      innerHttp
        .get("/blog/search", {
          params: {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            nameOrcontent: this.nameOrContent
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
  data() {
    return {
      nameOrContent: "",
      page: {
        pageNum: 1,
        pageSize: 5,
        totalSize: 0,
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
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
