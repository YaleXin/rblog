<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card>
      <div class="article-title-wrapper" style="text-align: center;">
        <h1 class="article-title">
            {{article.title}}
          <a href>{{article.title}}</a>
        </h1>
      </div>
      <div class="article-dscr">
        <p>{{article.dscr}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  components: {},
  props: {
    article: {
      type: Object,
      default: () => {
        return { id: 0, title: "题目", dscr: "描述" };
      }
    }
  }
};
</script>

<style scoped>
.article-title {
  font-size: 1.5em;
  font-weight: 400;
}
</style>
