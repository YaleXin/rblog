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
  name: "Home",
  components: {
    ArticleList
  },
  data() {
    return {
      articleList: [
        { id: 0, title: "题目1", dscr: "描述1" },
        { id: 1, title: "题目2", dscr: "描述2" }
      ]
    };
  }
};
</script>

<style scoped>
</style>
