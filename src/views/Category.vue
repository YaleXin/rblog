<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <article-list :articleList="articleList"></article-list>
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList.vue";
export default {
  name: "Category",
  components: {
    ArticleList
  },
  data() {
    return {
      articleList: [
        {
          id: 0,
          title: "分类 题目1",
          dscr:
            "有一个需求，前端通过axios发送用户名和密码到后台，后台查询数据库后，确认合法用户后直接把信息存进session里边，而为了实现这个 需求，就需要前端解决跨域，并且将cookie存到本地计算机中。",
          date: "2020-2-3",
          read: 12,
          ctgr: "分类"
        },
        {
          id: 1,
          title: "分类 使用axios+tomcat HttpServlet处理跨域请求以及处理cookie",
          dscr: "描述2"
        },
        { id: 2, title: "分类 题目3", dscr: "描述3" },
        { id: 3, title: "分类 题目4", dscr: "描述4" },
        { id: 4, title: "分类 题目5", dscr: "描述5" }
      ]
    };
  }
};
</script>

<style scoped>
</style>