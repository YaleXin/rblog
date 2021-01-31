<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <span  v-html="poetryContent">
    </span>
  </div>
</template>

<script>

import jinriHttp from "../network/jinriHttp.js";
export default {
  name: "Poetry",
  components: {},
  data() {
    return {
      poetryContent: "&nbsp;"
    };
  },
  created() {
    jinriHttp({
      url: "/all.json"
    })
      .then(rep => {
        this.poetryContent = rep.data.content
      })
      .catch(e => {});
  }
};
</script>

<style scoped>
</style>
