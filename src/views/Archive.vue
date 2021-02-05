<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <div v-for="(list, index) in blogList" :key="index">
      <el-divider content-position="center">
        <span style="color: #35b8ff;font-size:2em;">{{list.year}}</span>
      </el-divider>
      <el-card>
        <el-timeline>
          <el-timeline-item class="my-timeline-item"
            v-for="(blog, index1) in list.blogListByYear"
            :key="index1"
            :timestamp="blog.date"
          >
            <a :href="'/blog/' + blog.id" class="article-title-link">{{blog.blog}}</a>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Archive",
  components: {},
  data() {
    return {
      blogList: [
        {
          year: "2020",
          blogListByYear: [
            { id: 0, blog: "五块钱如何花三天", date: "07/12" },
            { id: 1,blog: "如何让富婆爱上你", date: "07/11" },
            { id: 2,blog: "全国富婆通讯录", date: "07/10" }
          ]
        },
        {
          year: "2019",
          blogListByYear: [
            { id: 3,blog: "五块钱如何花三天", date: "07/12" },
            { id: 4,blog: "如何让富婆爱上你", date: "07/11" },
            { id: 5,blog: "全国富婆通讯录", date: "07/10" }
          ]
        },
        {
          year: "2018",
          blogListByYear: [
            { id: 6,blog: "五块钱如何花三天", date: "07/12" },
            { id: 7,blog: "如何让富婆爱上你", date: "07/11" },
            { id: 8,blog: "全国富婆通讯录", date: "07/10" }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
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
.my-timeline-item{
    font-size: 16px;
}
</style>
