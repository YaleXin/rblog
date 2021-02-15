<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
      <el-menu-item index="1">
        <i class="el-icon-document"></i>
        <span slot="title">博客</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-collection-tag"></i>
        <span slot="title">分类</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-price-tag"></i>
        <span slot="title">标签</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-comment"></i>
        <span slot="title">评论</span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-dropdown>
          <span class="el-dropdown-link">
            用户
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="logined" @click.native="handleSelect('5-1', null)">修改信息</el-dropdown-item>
            <el-dropdown-item v-if="logined" @click.native="handleSelect('5-2', null)">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import innerHttp from "../../network/innerHttp.js";
export default {
  name: "Navigation",
  components: {},
  methods: {
    handleSelect(key, keyPath) {
      if (key === "5-2") {
        console.log("try to logout");
        this.logout();
      } else {
        this.changeAdminRoute(key);
      }
    },
    logoutSuccess() {
      this.$message({
        message: "注销成功",
        type: "success",
        showClose: true
      });
      this.$store.commit("removeUser");
      this.$router.replace("/admin/login").catch(e => {});
    },
    logout() {
      innerHttp
        .delete("/admin/logout/")
        .then(res => {
          if (res.data > 0) {
            this.logoutSuccess();
          }
        })
        .catch(e => {});
    },
    changeAdminRoute(index) {
      switch (index) {
        case "1":
          this.$router.replace("/admin/blog").catch(e => {});
          break;
        case "2":
          this.$router.replace("/admin/category").catch(e => {});
          break;
        case "3":
          this.$router.replace("/admin/tag").catch(e => {});
          break;
        case "4":
          this.$router.replace("/admin/comment").catch(e => {});
          break;
        case "5":
        case "5-1":
          this.$router.replace("/admin/user").catch(e => {});
          break;
        default:
          this.$router.replace("/admin/index").catch(e => {});
      }
    }
  },
  computed: {
    activeIndex() {
      let activeIndex = "-1";
      const routePath = this.$route.path;
      switch (routePath) {
        case "/admin/blog":
          activeIndex = "1";
          break;
        case "/admin/category":
          activeIndex = "2";
          break;
        case "/admin/tag":
          activeIndex = "3";
          break;
        case "/admin/comment":
          activeIndex = "4";
          break;
        default:
          activeIndex = "-1";
      }
      return activeIndex;
    },
    logined() {
      return this.$store.state.user.id > 0;
    }
  }
};
</script>

<style scoped>
</style>
