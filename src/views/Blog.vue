<!--
 * @Author: YaleXin
 * @Email: me@yalexin.top
-->
<template>
  <div>
      <navigation></navigation>
      <body></body>
    <footer></footer>
  </div>
</template>

<script>
import Navigation from './Navigation.vue';
import Body from "./Body.vue";
import Footer from "./Footer.vue";
export default {
  name: "Blog",
  components: {
    Navigation,
    Body,
    Footer
  }
};
</script>

<style scoped>
</style>
