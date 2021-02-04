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
import Navigation from "./admin/Navigation.vue";
export default {
  name: "Admin",
  components: {
    Navigation
  },
  created() {},
  activated() {
    let node = document.getElementById("admin-div").parentElement;
    node.style.maxWidth = "100%";
  }
};
</script>

<style scoped>

</style>
