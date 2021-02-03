<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        首页
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-collection-tag"></i>分类
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-price-tag"></i>标签
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-link"></i>友链
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-mic"></i>最近的吐槽
      </el-menu-item>

      <el-menu-item index="6">
        <div>
          <el-form :inline="true" :model="searchForm">
            <el-input
              placeholder="搜一搜？"
              prefix-icon="el-icon-search"
              @keyup.native.enter="onSubmit"
              v-model="searchForm.content"
            ></el-input>
          </el-form>
        </div>
      </el-menu-item>
      <el-menu-item index="7">
        要么改变世界，要么适应世界
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "PcNavigation",
  components: {},
  data() {
    return {
      searchForm: {
        content: ""
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$emit("pcClick", key);
    },
    onSubmit() {
      alert("submit" + this.searchForm.content);
    },
    getRout() {
      const routePath = this.$route.path;
      console.log(routePath);
    }
  },
  created() {},
  mounted() {},
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
          default:
            activeIndex = "-1";
        }
      }
      return activeIndex;
    }
  }
};
</script>

<style scoped>
</style>
