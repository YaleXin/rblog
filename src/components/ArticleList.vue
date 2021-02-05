<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <article-card v-for="article in articleList" :key="article.id" :article="article"></article-card>
<!-- 分页 -->
    <div style="text-align: center">
      <el-pagination
        background
        :pager-count="5"
        :hide-on-single-page="true"
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="1000"
        :page-size="20"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleCard from "./ArticleCard.vue";
export default {
  name: "ArticleList",
  components: {
    ArticleCard
  },
  props: {
    articleList: {
      type: Array,
      default: () => {
        return [{ id: 0, title: "题目", dscr: "描述" }];
      }
    }
  },
  methods: {
    currentChange(newPageIndex) {
      // console.log(newPageIndex);
    }
  }
};
</script>
<style scoped>
.el-pagination {
  margin-top: 20px;
  
}

</style>
