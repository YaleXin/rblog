<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card >
      <el-tag
        v-for="tag in tagList"
        :type="activedId === tag.id ? '' : 'info'"
        :key="tag.id"
      >
        <a :href="applicationPre()+ '/tag/' + tag.id">
          <i class="fa fa-tag" aria-hidden="true"></i>
          <span>{{tag.name}}</span>
        </a>
      </el-tag>
    </el-card>
    <el-divider content-position="center">该标签下的文章</el-divider>
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
  name: "Tag",
  components: {
    ArticleList
  },
  data() {
    return {
      
      tagList: [],
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
      activedTagExist: false
    };
  },
  created() {
    innerHttp
      .get("/tag/all")
      .then(res => {
        this.tagList = res.data.tags;
        this.setActivedId();
        this.currentChange(this.page.pageNum);
      })
      .catch(e => {});
  },
  activated() {
    document.title = '标签'
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

      if (id === -1 && this.tagList.length > 0) {
        id = this.tagList[0].id;
      } else if (id !== NaN) {
        let exist = false;
        for (let i = 0; i < this.tagList.length; i++) {
          // 检查标签id是否合法
          if (id === this.tagList[i].id) {
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
          .get("/tag/" + this.activedId, {
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