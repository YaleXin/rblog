<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
    <div>
        <mb-navigation @mbClick="choose" v-if="isMobie"></mb-navigation>
        <pc-navigation @pcClick="choose" v-else></pc-navigation>
    </div>
</template>

<script>

import MbNavigation from "./MbNavigation.vue";
import PcNavigation from "./PcNavigation.vue";

export default {
    name: 'Navigation',
    components: {
        MbNavigation,
        PcNavigation,
    },
    data(){
        return {
            isMobie: false,
        }
    },
    created() {
        const wd = document.body.clientWidth;
        if (wd <= 700) this.isMobie = true;
    },
    methods: {
        choose(index) {
            this.$emit('childClick', index)
        },
    },
}
</script>

<style scoped>

</style>
