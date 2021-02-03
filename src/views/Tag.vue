<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card>
      <el-tag
        v-for="(tag, index) in tagList"
        :type="activedIndex === index ? '' : 'info'"
        :key="tag.id"
      > <a :href="'/tag/' + tag.id">{{tag.name}}</a> </el-tag>
    </el-card>
    <el-divider content-position="center">该标签下的文章</el-divider>
    <article-list :articleList="articleList"></article-list>
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList.vue";
export default {
  name: "Tag",
  components: {
    ArticleList
  },
  data() {
    return {
      articleList: [
        {
          id: 0,
          title: "标签 题目1",
          dscr:
            "有一个需求，前端通过axios发送用户名和密码到后台，后台查询数据库后，确认合法用户后直接把信息存进session里边，而为了实现这个 需求，就需要前端解决跨域，并且将cookie存到本地计算机中。",
          date: "2020-2-3",
          read: 12,
          tag: "分类"
        },
        {
          id: 1,
          title: "标签 使用axios+tomcat HttpServlet处理跨域请求以及处理cookie",
          dscr: "描述2"
        },
        { id: 2, title: "标签 题目3", dscr: "描述3" },
        { id: 3, title: "标签 题目4", dscr: "描述4" },
        { id: 4, title: "标签 题目5", dscr: "描述5" }
      ],
      tagList: [
        { id: 110, name: "标签一" },
        { id: 111, name: "标签二" },
        { id: 122, name: "标签三" },
        { id: 133, name: "标签三" },
        { id: 144, name: "标签三" },
        { id: 155, name: "标签三" },
        { id: 166, name: "标签三" },
        { id: 177, name: "标签三" }
      ],
      activedIndex: -1,
      activedCategoryExist: false
    };
  },
  activated() {
    const routePath = this.$route.path;
    let id = parseInt(routePath.slice(5, routePath.length));
    if (id === -1) {
      // 默认显示第一条
      this.activedIndex = 0;
      this.activedCategoryExist = true;
    } else if (id !== NaN) {
      for (let index = 0; index < this.tagList.length; index++) {
        if (id === this.tagList[index].id) {
          this.activedIndex = index;
          this.activedCategoryExist = true;
          break;
        }
        // if ()
      }
    }
    if (this.activedIndex == -1) {
      this.articleList = [];
    }
  }
};
</script>

<style scoped>
  .el-tag>a{
    text-decoration:none;
    color: #000
  }
</style>
