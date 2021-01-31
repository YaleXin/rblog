<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card class="box-card">
      <router-view></router-view>
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
.box-card{
    height: 100%;
}
</style>
