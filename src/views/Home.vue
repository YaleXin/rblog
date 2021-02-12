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
      articleList: [
        { id: 0, name: "首页 使用axios+tomcat HttpServlet处理跨域请求以及处理cookie", description: "有一个需求，前端通过axios发送用户名和密码到后台，后台查询数据库后，确认合法用户后直接把信息存进session里边，而为了实现这个 需求，就需要前端解决跨域，并且将cookie存到本地计算机中。", date: "2020-2-3", read: 12, ctgr: '分类' },
        { id: 1, name: "首页 五块钱如何花三天", description: "描述2" },
        { id: 2, name: "首页 如何让富婆爱上你", description: "描述3" },
        { id: 3, name: "首页 题目4", description: "描述4" },
        { id: 4, name: "首页 全国富婆通讯录", description: "描述5" },
      ],
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
    },
    
  },
  activated() {
    this.currentChange(this.page.pageNum);
  },
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
