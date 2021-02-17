<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-row v-for="(linkCategory, index) in linkList" :key="index">
      <el-divider content-position="center">
        <h3>{{linkCategory.type}}</h3>
      </el-divider>

      <el-row v-for="(link, index) in linkCategory.content" :key="index" class="link-item">
        <div class="avatar-wrapper">
          <img :src="link.avatar" class="link-avatar" alt />
        </div>
        <div class="info-wrapper">
          <p style="font-size: 0.8em;">
            <i class="fa fa-bookmark" aria-hidden="true"></i>
            {{link.name}}
          </p>
          <p style="font-size: 0.8em;">
            <i class="fa fa-link" aria-hidden="true"></i>
            <a style="color: #35b8ff" :href=" '//'+ link.url" target="_blank">{{link.url}}</a>
          </p>
          <p>{{link.description}}</p>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import innerHttp from "../network/innerHttp.js";
export default {
  name: "Link",
  components: {},
  created() {
    innerHttp
      .get("/link")
      .then(res => {
        console.log(res.data.links);
        this.linkList = res.data.links;
      })
      .catch(e => {});
  },
  activated() {
    document.title = "友情链接";
  },
  methods: {},
  data() {
    return {
      linkList: [
        {
          id: 1,
          type: "博客链接",
          content: [
            {
              id: 1,
              name: "黄阿信的博客",
              description: "要么改变世界，要么适应世界",
              url: "www.yalexin.com",
              avatar: "https://www.yalexin.top/images/cat_mouse.jpg"
            },
            {
              id: 2,
              name: "黄阿信的hexo博客",
              description: "要么改变世界，要么适应世界",
              url: "https://yalexin.gitee.io/",
              avatar: "https://qiniu.yalexin.top/home.png"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.link-item {
  align-items: flex-start;
  display: flex;
  text-align: left;
}

.avatar-wrapper {
  margin-right: 1rem;
  margin-left: 1rem;
  width: 80px;
  height: 80px;
  margin-top: 15px;
}
.info-wrapper {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
}
.link-avatar {
  max-width: 100%;
  height: auto;
  display: block;
  margin: auto;
  border-radius: 9px;
}
</style>
