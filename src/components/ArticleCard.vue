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
          <a
            :href=" applicationPre()+ '/blog/'+article.id"
            class="article-title-link"
          >{{article.name}}</a>
        </h1>
        <div class="article-detail">
          <i class="fa fa-calendar"></i>
          <span style="margin-left:2px;">{{article.createTime.split('T')[0]}}</span>
          <el-divider direction="vertical"></el-divider>
          <i class="fa fa-eye"></i>
          <span style="margin-left:2px;">{{article.views}}</span>
          <el-divider direction="vertical"></el-divider>
          <i class="fa fa-bookmark-o"></i>
          <span style="margin-left:2px;">{{article.category.name}}</span>
        </div>
      </div>
      <div class="article-dscr">
        <p>{{article.description}} ...</p>
      </div>
      <div class="readMore">
        <!-- <router-link class="readMore-btn" :to="{name: 'blog', params: { id: article.id }}">阅读全文 »</router-link> -->
        <a class="readMore-btn" :href=" applicationPre() +  '/blog/'+article.id" >阅读全文 »</a>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  components: {},
  methods: {
    applicationPre() {
      // return process.env.NODE_ENV === "production" ? "/blog" : "";
      return "/blog";
    }
  },
  props: {
    article: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "题目",
          description: "描述",
          createTime: "2021-02-09T08:57:19.000+00:00",
          views: 12,
          category: {
            name: "分类",
            id: 1
          }
        };
      }
    }
  }
};
</script>

<style scoped>
.article-title {
  font-size: 1.3em;
  font-weight: 400;
}

a,
a:link,
a:visited,
a:focus {
  text-decoration: none;
  color: #000;
}
.article-title-link {
  position: relative;
  /* text-align: center; */
}
.article-title-link::after {
  content: "";
  width: 0;
  height: 3px;
  background: black;
  position: absolute;
  top: 100%;
  left: 50%;
  transition: all 0.5s;
}

.article-title-link:hover::after {
  left: 0%;
  width: 100%;
}
.article-detail {
  padding: 5px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.7em;
}
.readMore {
  margin-top: 40px;
  text-align: center;
}
.readMore-btn {
  background: #fff;
  border: 2px solid #555;
  border-radius: 2px;
  color: #555;
  display: inline-block;
  line-height: 2;
  padding: 0 20px;
  text-decoration: none;
  transition-property: background-color;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  font-size: 0.875em;
}
.readMore-btn:hover {
  background: rgb(22, 22, 22);
  color: #fff;
}
</style>
