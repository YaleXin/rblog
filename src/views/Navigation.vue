<!--
 * @Author: YaleXin
 * @Email: me@yalexin.top
-->
<template>
    <div>
        <mb-navigation v-if="isMobie"></mb-navigation>
        <pc-navigation v-else></pc-navigation>
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
    }
}
</script>

<style scoped>

</style>
