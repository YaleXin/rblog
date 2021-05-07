<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="footer">
    <el-divider></el-divider>
    <poetry></poetry>
    <time-info></time-info>
    <copyright></copyright>
    <icp></icp>
  </div>
</template>

<script>
import Poetry from '../components/Poetry.vue';
import TimeInfo from "../components/TimeInfo.vue";
import Icp from "../components/Icp.vue";
import Copyright from "../components/Copyright.vue";
export default {
  name: "Footer",
  components: {
    Poetry,
    Icp,
    TimeInfo,
    Copyright
  },
  created() {}
};
</script>

<style scoped>
.footer {
  text-align: center;
    background: url("../assets/img/bg.png")
}
</style>

