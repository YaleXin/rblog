<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="wrapper">
    <font-awesome-icon  icon="heartbeat" color="red"/>
    <span>本站已在此等候您</span>
    <span class="timeNumber">{{day}}</span>
    <span>日</span>
    <span class="timeNumber">{{newHour}}</span>
    <span>时</span>
    <span class="timeNumber">{{newMnt}}</span>
    <span>分</span>
    <span class="timeNumber">{{newScd}}</span>
    <span>秒</span>
    <font-awesome-icon   icon="heartbeat" color="red"/>
  </div>
</template>

<script>
export default {
  name: "TimeInfo",
  components: {},
  data() {
    return {
      day: 0,
      hour: 0,
      minuete: 0,
      second: 0
    };
  },
  methods: {

    setTime() {
      this.updateTime();
      setInterval(this.updateTime, 1000);
    },
    updateTime() {
      const buildDate = new Date("2021-1-31 08:00:00");
      const nowDate = new Date();
      const dist = nowDate.getTime() - buildDate.getTime();
      this.day = parseInt(dist / 1000 / 60 / 60 / 24);
      this.hour = parseInt(dist / 1000 / 60 / 60 - this.day * 24);
      this.minuete = parseInt(
        dist / 1000 / 60 - (this.day * 24 + this.hour) * 60
      );
      this.second = parseInt(
        dist / 1000 - (this.day * 24 * 60 + this.hour * 60 + this.minuete) * 60
      );
    }
  },
  created() {
    this.setTime();
  },
  computed: {
    newHour: function() {
      return this.hour.toString().padStart(2, "0");
    },
    newMnt: function() {
      return this.minuete.toString().padStart(2, "0");
    },
    newScd: function() {
      return this.second.toString().padStart(2, "0");
    }
  }
};
</script>

<style scoped >
.timeNumber {
  color: #35b8ff;
}
.wrapper {
  text-align: center;
}
</style>
