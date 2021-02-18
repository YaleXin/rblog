<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <div class="nvg-top">
      <el-row type="flex" justify="center">
        <el-col :span="2">
          <div class="icon-div">
            <font-awesome-icon @click="showNvg=true" icon="bars" size="lg" />
          </div>
        </el-col>
        <el-col class="motto-wrapper" :span="22">
          <div class="motto">要么改变世界，要么适应世界</div>
        </el-col>
      </el-row>
    </div>

    <el-drawer :visible.sync="showNvg" direction="ltr" size="70%">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <img src="//qiniu.yalexin.top/cat_mouse.jpg" width="90px" height="90px" style="border-radius: 50%;" alt="">
        </el-col>
      </el-row>

      <el-row :span="10">
        <el-col>
          <el-menu :default-active="activeIndex" @select="handleSelect">
            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
              </template>
            </el-menu-item>

            <el-menu-item index="2">
              <template slot="title">
                <i class="el-icon-collection-tag"></i>
                <span>分类</span>
              </template>
            </el-menu-item>

            <el-menu-item index="3">
              <template slot="title">
                <i class="el-icon-price-tag"></i>
                <span>标签</span>
              </template>
            </el-menu-item>

            <el-menu-item index="4">
              <template slot="title">
                <i class="el-icon-link"></i>
                <span>友链</span>
              </template>
            </el-menu-item>

            <el-menu-item index="5">
              <template slot="title">
                <i class="el-icon-mic"></i>
                <span>最近的吐槽</span>
              </template>
            </el-menu-item>

            <el-menu-item index="6">
              <template slot="title">
                <i class="el-icon-data-line"></i>
                <span>归档</span>
              </template>
            </el-menu-item>
            
            <el-menu-item index="7">
              <div>
                <el-form :inline="true" :model="searchForm" @submit.native.prevent>
                  <el-input
                    placeholder="搜一搜？按下回车即可搜索"
                    prefix-icon="el-icon-search"
                    @keyup.native.enter="onSubmit"
                    v-model="searchForm.content"
                  ></el-input>
                </el-form>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { EventBus } from "../eventBus/index.js";
export default {
  name: "MbNavigation",
  components: {},
  data() {
    return {
      showNvg: false,
      searchForm: {
        content: ""
      }
    };
  },
  computed: {
    activeIndex: function() {
      const routePath = this.$route.path;
      let activeIndex = "0";
      if (routePath.indexOf("/category/") > -1) {
        activeIndex = "2";
      } else if (routePath.indexOf("/tag/") > -1) {
        activeIndex = "3";
      } else {
        switch (routePath) {
          case "/":
          case "/home":
            activeIndex = "1";
            break;
          // case "/category":
          //   activeIndex = "2";
          //   break;
          // case "/tag":
          //   activeIndex = "3";
          //   break;
          case "/link":
            activeIndex = "4";
            break;
          case "/talk":
            activeIndex = "5";
            break;
          case "/archive":
            activeIndex = "6";
            break;
          case "/search":
            activeIndex = "7";
            break;
          default:
            activeIndex = "-1";
        }
      }
      return activeIndex;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key !== "7") this.showNvg = false;
      this.$emit("mbClick", key);
    },
    onSubmit() {
      this.$router.replace("/search").catch(e => {});
      EventBus.$emit("searchSubmit", this.searchForm.content);
      this.showNvg = false;
    }
  }
};
</script>

<style scoped>
.nvg-top {
  background-color: #555;
  width: 100% !important;
  height: 50px;
}
.icon-div {
  padding-top: 50%;
  padding-bottom: 50%;
  padding-left: 5px;
  color: white;
}
.motto-wrapper {
  color: white;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
