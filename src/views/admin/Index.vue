<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <span>
      欢迎您，
      <h1>{{nickname}}</h1>
    </span>
  </div>
</template>

<script>
import innerHttp from "../../network/innerHttp.js";
export default {
  name: "Index",
  components: {},
  data() {
    return {};
  },
  activated() {},
  computed: {
    nickname() {
      let nickname = this.$store.state.user.nickname;
      return nickname;
    }
  }
};
</script>

<style scoped>
</style>
