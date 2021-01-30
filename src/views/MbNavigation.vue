<!--
 * @Author: YaleXin
 * @Email: me@yalexin.top
-->
<template>
  <div>
    <div class="nvg-top">
      <el-row type="flex" justify="center">
        <el-col :span="2">
          <div class="icon-div">
            <font-awesome-icon @click="showNvg=true" icon="bars" size="lg" />
          </div>
        </el-col>
        <el-col :span="22"></el-col>
      </el-row>
    </div>

    <el-drawer :visible.sync="showNvg" direction="ltr" size="70%">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-avatar :size="100" src="https://blog.yalexin.top/images/cat_mouse.jpg"></el-avatar>
        </el-col>
      </el-row>

      <el-row :span="10">
        <el-col>
          <el-menu default-active="1"
          @select="handleSelect"
          >
            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
              </template>
            </el-menu-item>

            <el-menu-item index="2">
              <template slot="title">
                <i class="el-icon-collection-tag"></i>
                <span>分类</span>
              </template>
            </el-menu-item>

            <el-menu-item index="3">
              <template slot="title">
                <i class="el-icon-price-tag"></i>
                <span>标签</span>
              </template>
            </el-menu-item>

            <el-menu-item index="4">
              <template slot="title">
                <i class="el-icon-link"></i>
                <span>友链</span>
              </template>
            </el-menu-item>

            <el-menu-item index="5">
              <template slot="title">
                <i class="el-icon-mic"></i>
                <span>最近的吐槽</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "MbNavigation",
  components: {},
  data() {
    return {
      showNvg: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.showNvg = false;
    }
  }
};
</script>

<style scoped>
.nvg-top {
  background-color: #555;
  width: 100% !important;
  height: 50px;
}
.icon-div {
  padding-top: 50%;
  padding-bottom: 50%;
  padding-left: 5px;
}
</style>
