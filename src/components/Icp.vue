<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
    <div class="wrapper">
        <el-link href="//beian.miit.gov.cn" target="_blank">{{id}}</el-link>
    </div>
</template>

<script>
export default {
    name: 'Icp',
    components: {},
    data(){
        return{
            id: '桂ICP备20003049号-1',
        }
    }
}
</script>

<style scoped>
.wrapper{
    text-align: center
}
</style>
