<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div id="admin-div">
    <el-row :gutter="20">
      <el-col :span="3">
        <navigation></navigation>
      </el-col>
      <el-col :span="21" class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import innerHttp from "../network/innerHttp.js";
import Navigation from "./admin/Navigation.vue";
export default {
  name: "Admin",
  components: {
    Navigation
  },
  methods: {
    getUser() {
      innerHttp
        .get("/admin/user/info")
        .then(res => {
          if (res.data !== undefined) {
            this.$store.commit("saveUser", res.data);
          }
        })
        .catch(e => {});
    }
  },
  created() {},
  activated() {
    if (this.$route.path !== "/admin/login") {
      // 如果不是登录路由 就去后台请求session中用户信息
      this.getUser();
      document.title = "后台管理";
    }
    let node = document.getElementById("admin-div").parentElement;
    node.style.maxWidth = "100%";
  }
};
</script>

<style scoped>
</style>
