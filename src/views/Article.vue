<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card>
      <div class="article-title-wrapper" style="text-align: center;">
        <h1 class="article-title">{{article.name}}</h1>
        <div class="article-detail">
          <i class="fa fa-calendar"></i>
          <span
            style="margin-left:2px; font-size: 14px;"
          >{{article.createTime.split('T')[0]}} {{article.createTime.split('T')[1].split('.')[0]}}</span>
          <el-divider direction="vertical"></el-divider>
          <i class="fa fa-eye"></i>
          <span style="margin-left:2px; font-size: 14px;">{{article.views}}</span>
          <el-divider direction="vertical"></el-divider>
          <i class="fa fa-bookmark-o"></i>
          <span style="margin-left:2px; font-size: 14px;">{{article.category.name}}</span>
        </div>
      </div>
      <div class="article-content typo" v-html="article.content">
        <!-- v-html="article.content" -->
      </div>
      <el-divider></el-divider>
      <div class="tag-group">
        <el-tag type="info" v-for="(tag, index) in article.tags" :key="index">
          <i class="fa fa-tag" aria-hidden="true"></i>
          {{tag.name}}
        </el-tag>
      </div>
      <div class="appreciate-wrapper">
        <appreciate></appreciate>
      </div>
      <comment ref="commentCpnt" class="comment-card"></comment>
    </el-card>
  </div>
</template>

<script>
// 加载 fancy-box 插件
$(document).ready(function() {
  $('[data-fancybox="gallery"]').fancybox({
    buttons: ["share", "close", "download"],
    hash: false
  });
});
import innerHttp from "../network/innerHttp.js";
import Appreciate from "../components/Appreciate.vue";
import Comment from "../components/Comment.vue";
import Prism from "prismjs";
export default {
  name: "Article",
  components: {
    Comment,
    Appreciate
  },
  activated() {},

  mounted() {
    let blogId = this.$route.params.id;
    this.$refs.commentCpnt.loadCommentsByBlogId(blogId);
  },
  created() {
    let blogId = this.$route.params.id;
    innerHttp
      .get("/blog/" + blogId)
      .then(res => {
        if (res.status === 200) {
          this.article = res.data.blog;
          this.$nextTick(() => {
            Prism.highlightAll();
            this.setTable();
            this.setFancyBox();
          });
        } else {
          this.$message({
            showClose: true,
            message: "加载文章失败",
            type: "error"
          });
        }
      })
      .catch(e => {});
  },

  methods: {
    // 为每个table套一个div
    setTable() {
      let tables = [].slice.apply(document.getElementsByTagName("table"));
      while (tables.length > 0) {
        let tableWrapper = document.createElement("div");
        tableWrapper.setAttribute("style", "width: 100%; overflow-x: auto;");
        let parentElement = tables[0].parentElement;
        parentElement.insertBefore(tableWrapper, tables[0]);
        let table = tables[0].cloneNode(true);
        parentElement.removeChild(tables[0]);
        tables.shift();
        tableWrapper.appendChild(table);
      }
    },
    // 为每个图片设置环境 使之能够满足fancyBox插件的要求
    setFancyBox() {
      let imgNodeArray = document.querySelectorAll(".fancy-box-img");
      imgNodeArray.forEach(imgNode => {
        let aNode = document.createElement("a");
        aNode.href = imgNode.getAttribute("src");
        aNode.setAttribute("data-transition-effect", "zoom-in-out");
        aNode.setAttribute("data-animation-effect", "slide");
        aNode.setAttribute("data-fancybox", "gallery");
        aNode.setAttribute("data-capion", "这是一张图片");
        imgNode.parentNode.appendChild(aNode);
        aNode.appendChild(imgNode);
        aNode.style.border = "none";
      });
    }
  },
  data() {
    return {
      article: {
        id: -1,
        name: "",
        createTime: "2021-02-09T08:57:19.000+00:00",
        category: { id: 1, name: "分类一" },
        views: 12,
        content: "",
        tags: [
          { id: 1, name: "代码高亮" },
          { id: 2, name: "fefrg" }
        ]
      }
    };
  },
  props: {}
};
</script>

<style scoped>
@import "../assets/css/typo.css";

.article-content >>> table {
  overflow-x: auto;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

/*鼠标悬停在表格上时，表格的背景和鼠标的形状*/
.article-content >>> table tr:hover {
  background-color: #66d9ef !important;
  cursor: pointer;
}

/*表格头部*/
.article-content >>> table thead {
  font-weight: bolder;
  background-color: #a2a5a7;
}
/*even为偶数行 odd为奇数行
    设置表格的主体部分偶数行的样式
  */
.article-content >>> table tbody tr:nth-child(even) {
  background-color: rgb(241, 241, 241);
}
.article-content >>> img.rounded {
  border-radius: 10px;
}
.article-content >>> ul {
  margin-left: 0;
  padding: 5px;
}

.article-content >>> ol {
  margin-left: 0;
  padding: 8px;
}
.article-content >>> li {
  margin-left: 0;
}

.comment-card {
  margin-top: 10px;
}
.el-tag {
  margin: 2px;
  font-size: 0.8em;
}
.appreciate-wrapper {
  text-align: center;
}
</style>
