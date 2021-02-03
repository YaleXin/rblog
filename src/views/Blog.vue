<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation @childClick="navigationClick"></navigation>
    <main-content class="mainBody"></main-content>

    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import MainContent from "./Main.vue";
import BlogFooter from "./Footer.vue";
import ToTop from "../components/ToTop.vue";
export default {
  name: "Blog",
  components: {
    Navigation,
    MainContent,
    BlogFooter,
    ToTop
  },
  methods: {
    navigationClick(index) {
      switch (index) {
        case "1":
          this.$router.replace("/home").catch(e => {});
          break;
        case "2":
          this.$router.replace("/category/-1").catch(e => {});
          break;
        case "3":
          this.$router.replace("/tag/-1").catch(e => {});
          break;
        case "4":
          this.$router.replace("/link").catch(e => {});
          break;
        case "5":
          this.$router.replace("/talk").catch(e => {});
          break;
        default:
          this.$router.replace("/home").catch(e => {});
      }
    },
    toHome() {},
    toCategory() {},
    toTag() {},
    toLink() {},
    toTalk() {}
  },
  created() {}
};
</script>

<style scoped>
.mainBody {
  min-height: 300px;
  overflow: auto;
}
</style>
