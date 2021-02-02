<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card class="box-card-wrapper">
      <div class="box-card">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {}
};
</script>

<style scoped>
.box-card {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
