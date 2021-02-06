<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-popover placement="bottom" width="310" trigger="click">
      <div class="img-wrapper">
        <img class="qr-code-img" src="../assets/img/Alipay-square.jpg" />
        <img class="qr-code-img" src="../assets/img/WeChat-square.png" />
      </div>
      <el-button slot="reference" plain="" size="medium" type="danger" class="appreciate-btn">赞赏</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "Appreciate",
  components: {}
};
</script>

<style scoped>
.img-wrapper {
  text-align: center;
  
}
.qr-code-img {
  width: 150px;
  border: 1px solid;
  border-radius: 25px;
  margin: 1px;
}
.appreciate-btn{
  margin-top: 5px;
}
</style>
