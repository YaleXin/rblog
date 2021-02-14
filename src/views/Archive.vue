<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-divider class="total-divider" content-position="center">
      <span style="color: #35b8ff; font-size:2em;">共 {{totalNum}} 篇</span>
    </el-divider>
    <div v-for="(list, index) in blogList" :key="index">
      <el-divider content-position="center">
        <span
          style="color: #35b8ff;font-size:1.2em;"
        >{{list.yearMonth.toString().substring(0, 4)}}-{{list.yearMonth.toString().substring(4, 6)}}: {{list.content.length}} 篇</span>
      </el-divider>
      <el-card>
        <el-timeline>
          <el-timeline-item
            class="my-timeline-item"
            v-for="(blog, index1) in list.content"
            :key="index1"
            :timestamp="blog.createTime.split('T')[0] +' '+ blog.createTime.split('T')[1].split('.')[0]"
          >
            <a target="_blank" :href="'/blog/' + blog.id" class="article-title-link">{{blog.name}}</a>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script>
import innerHttp from "../network/innerHttp.js";
export default {
  name: "Archive",
  components: {},
  created() {
    innerHttp
      .get("/archive")
      .then(res => {
        console.log(res.data.blogs[0]);
        this.blogList = res.data.blogs;
      })
      .catch(e => {});
  },
  computed: {
    totalNum() {
      let total = 0;
      this.blogList.forEach(element => {
        total += element.content.length;
      });
      return total;
    }
  },
  data() {
    return {
      blogList: [
        {
          yearMonth: "",
          content: [
            { id: 0, name: "", createTime: "2021-02-13T09:30:29.000+08:00" }
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
.my-timeline-item {
  font-size: 16px;
}
.total-divider {
  margin-bottom: 30px;
}
</style>
