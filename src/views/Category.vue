<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div >
    <el-card>
      <el-tag
        v-for="ctgr in categoryList"
        :type="activedId === ctgr.id ? '' : 'info'"
        :key="ctgr.id"
      >
        <a :href="applicationPre()+ '/category/' + ctgr.id">
          <i class="fa fa-bookmark-o" aria-hidden="true"></i>
          <span>{{ctgr.name}}</span>
        </a>
      </el-tag>
    </el-card>
    <el-divider content-position="center">该分类下的文章</el-divider>
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
  name: "Category",
  components: {
    ArticleList
  },
  data() {
    return {
      categoryList: [],
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
      },
      activedId: -1,
      activedCategoryExist: false
    };
  },
  created() {
    innerHttp
      .get("/category/all")
      .then(res => {
        this.categoryList = res.data.categories;
        this.setActivedId();
        this.currentChange(this.page.pageNum);
      })
      .catch(e => {});
  },
  activated() {
    document.title = '分类'
  },
  computed: {},
  methods: {
    applicationPre() {
      console.log(process.env.NODE_ENV);
      // return process.env.NODE_ENV === "production" ? "/blog" : "";
      return "/blog";
    },
    setActivedId() {
      let id = parseInt(this.$route.params.id);

      if (id === -1 && this.categoryList.length > 0) {
        id = this.categoryList[0].id;
      } else if (id !== NaN) {
        let exist = false;
        for (let i = 0; i < this.categoryList.length; i++) {
          // 检查分类id是否合法
          if (id === this.categoryList[i].id) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          id = -1;
        }
      }
      this.activedId = id;
    },
    currentChange(newIndex) {
      this.page.pageNum = newIndex;
      if (this.activedId > 0) {
        innerHttp
          .get("/category/" + this.activedId, {
            params: {
              pageNum: this.page.pageNum,
              pageSize: this.page.pageSize
            }
          })
          .then(res => {
            this.page = res.data.page;
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }
};
</script>

<style scoped>
.el-tag > a {
  text-decoration: none;
  color: #000;
}
.el-tag {
  margin: 2px;
}
.el-pagination {
  margin-top: 20px;
}
</style>