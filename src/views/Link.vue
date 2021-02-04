<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-row v-for="(linkCategory, index) in linkList" :key="index">
      <h3>{{linkCategory.type}}</h3>
      <el-row v-for="(link, index) in linkCategory.contentList" :key="index" class="link-item">
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
            <a style="color: #35b8ff" :href=" '//'+ link.link" target="_blank"> {{link.link}} </a>
          </p>
          <p>{{link.dscr}}</p>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Link",
  components: {},
  data() {
    return {
      linkList: [
        {
          type: "在线处理工具",
          contentList: [
            {
              name: "黄阿信的个人博客1",
              avatar: "https://www.yalexin.top/images/cat_mouse.jpg",
              dscr: "要么改变世界，要么适应世界",
              link: "www.yalexin.top"
            },
            {
              name: "黄阿信的个人博客2",
              avatar: "https://www.yalexin.top/images/cat_mouse.jpg",
              dscr: "要么改变世界，要么适应世界",
              link: "www.yalexin.top"
            }
          ]
        },
        {
          type: "博客",
          contentList: [
            {
              name: "黄阿信的个人博客1",
              avatar: "https://www.yalexin.top/images/cat_mouse.jpg",
              dscr: "要么改变世界，要么适应世界",
              link: "www.yalexin.top"
            },
            {
              name: "黄阿信的个人博客2",
              avatar: "https://www.yalexin.top/images/cat_mouse.jpg",
              dscr: "要么改变世界，要么适应世界",
              link: "www.yalexin.top"
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
