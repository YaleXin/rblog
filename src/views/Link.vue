<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-divider content-position="center">
      <h3>友链要求</h3>
    </el-divider>
    <p>1.站点稳定运行，定期更新；</p>
    <p>2.非商业性的博客网站，凡涉及污秽、暴力、广告、盗版、破解、网页植入脚本、极低质量内容、违背道德公俗、国家法律的概不添加；</p>
    <p>3.尊重创作版权，转载等参考内容写清来源；</p>
    <p>4.申请友链前请先添加本站为友链,再移步至“最近的吐槽”根据下表填写相关信息，鄙人会在第一时间内添加贵站。</p>
    <el-card class="box-card">
      <div slot="header" style="text-align: center">
        <span style="font-weight: bold;">本站信息</span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="站点名称" ></el-table-column>
        <el-table-column prop="description" label="站点描述" ></el-table-column>
        <el-table-column label="站点链接">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <el-link type="primary" :href=scope.row.link target="_blank">{{ scope.row.link }}</el-link>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.link }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="头像链接">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <el-avatar :size="150" :src=scope.row.avatar></el-avatar>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.avatar }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

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
        this.linkList[0].content.sort(() => {
          return 0.5 - Math.random();
        });
      })
      .catch(e => {});
  },
  activated() {
    document.title = "友情链接";
    this.linkList[0].content.sort(() => {
      return 0.5 - Math.random();
    });
  },
  methods: {},
  data() {
    return {
      tableData: [
        {
          name: "黄阿信的个人博客",
          description: "要么改变世界，要么适应世界",
          link: "https://www.yalexin.top/blog/",
          avatar: "https://www.yalexin.top/img/cat_mouse.jpg"
        }
      ],
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
