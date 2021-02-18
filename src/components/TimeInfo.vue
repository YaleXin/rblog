<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="wrapper">
    <span class="with-love heartbeat-animate">
      <i class="fa fa-heartbeat" color="red"></i>
    </span>
    <span>本站已在此等候您</span>
    <span class="timeNumber">{{day}}</span>
    <span>日</span>
    <span class="timeNumber">{{newHour}}</span>
    <span>时</span>
    <span class="timeNumber">{{newMnt}}</span>
    <span>分</span>
    <span class="timeNumber">{{newScd}}</span>
    <span>秒</span>
    <span class="with-love heartbeat-animate">
      <i class="fa fa-heartbeat" color="red"></i>
    </span>
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
.heartbeat-animate {
  animation: iconAnimate 1.33s ease-in-out infinite;
}
.with-love {
    display: inline-block;
    margin: 0 5px;
    color: #ff0000;
}
.timeNumber {
  color: #35b8ff;
}
.wrapper {
  text-align: center;
}

@-moz-keyframes iconAnimate {
  0%, 100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  10%, 30% {
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
    transform: scale(0.9);
  }
  20%, 40%, 60%, 80% {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
  50%, 70% {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
}
@-webkit-keyframes iconAnimate {
  0%, 100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  10%, 30% {
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
    transform: scale(0.9);
  }
  20%, 40%, 60%, 80% {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
  50%, 70% {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
}
@-o-keyframes iconAnimate {
  0%, 100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  10%, 30% {
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
    transform: scale(0.9);
  }
  20%, 40%, 60%, 80% {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
  50%, 70% {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
}
@keyframes iconAnimate {
  0%, 100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  10%, 30% {
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
    transform: scale(0.9);
  }
  20%, 40%, 60%, 80% {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
  50%, 70% {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
