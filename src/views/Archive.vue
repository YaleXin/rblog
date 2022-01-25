<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div id="archive-content">
    <!--  height: '800px' -->
    <div ref="heatmap" :style="{ width: '100%' }">
    </div>
    <el-divider class="total-divider" content-position="center">
      <span style="color: #35b8ff; font-size:2em;">共 {{totalNum}} 篇</span>
    </el-divider>
    <div v-for="(list, index) in blogList" :key="index">
      <el-divider content-position="center">
        <span
          style="color: #35b8ff;font-size:1.2em;"
        >{{list.yearMonth.toString().substring(0, 4)}}-{{list.yearMonth.toString().substring(4, 6)}}: {{list.content.length}} 篇</span>
      </el-divider>
      <el-card>
        <el-timeline>
          <el-timeline-item
            class="my-timeline-item"
            v-for="(blog, index1) in list.content"
            :key="index1"
            :timestamp="blog.createTime.substr(5,99)"
          >
            <a
              target="_blank"
              :href="applicationPre()+ '/blog/' + blog.id"
              class="article-title-link"
            >{{blog.name}}</a>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script>
import innerHttp from "../network/innerHttp.js";
export default {
  name: "Archive",
  components: {},
  created() {
    const loading = this.$loading({
      lock: true, //lock的修改符--默认是false
      text: "Loading", //显示在加载图标下方的加载文案
      spinner: "el-icon-loading", //自定义加载图标类名
      background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
      target: document.querySelector("#archive-content") //loadin覆盖的dom元素节点
    });
    setTimeout(() => {
      loading.close();
    }, 3000);
    innerHttp
      .get("/archive")
      .then(res => {
        console.log(res.data.blogs);
        this.blogList = res.data.blogs;
        this.initHeatmapData();
        this.drawLine();
        loading.close();
      })
      .catch(e => {});
  },
  mounted() {},
  methods: {
    applicationPre() {
      console.log(process.env.NODE_ENV);
      // return process.env.NODE_ENV === "production" ? "/blog" : "";
      return "/blog";
    },
    drawLine() {
      this.heatmap = this.$echarts.init(this.$refs.heatmap);
      console.log(this.heatmapOption);
      this.heatmap.setOption(this.heatmapOption);
      //做到每个图表根据屏幕变化而自适应宽高
      window.addEventListener("resize", () => {
        this.heatmap.resize();
      });
    },
    initHeatmapData() {
      let totalMonth = this.blogList.length;
      let index = 0,
        cnt = 0,
        startTop = 120;
      while (index != totalMonth) {
        // 正在处理的年份
        let nowYear = parseInt(this.blogList[index].yearMonth / 100);
        this.heatmapOption.calendar.push({
          top: startTop + cnt * 150,
          left: "10%",
          right: "10%",
          cellSize: ["auto", 13],
          // 范围
          range: [nowYear.toString()],
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: {
            show: true,
            margin: 15,
            color: "#ccc",
            fontFamily: "sans-serif",
            fontWeight: "bolder",
            position: null,
            formatter: null,
            fontSize: 18
          }
        });
        // 获得该年的热力图数据和下一年开始的下标
        let resultData = this.handleHeatmapDataByYear(nowYear, index);
        this.heatmapOption.series.push({
          type: "heatmap",
          calendarIndex: cnt,
          coordinateSystem: "calendar",
          data: resultData.data
        });
        index = resultData.newIndex;
        cnt++;
      }
      this.$refs.heatmap.style.height = (cnt * 180).toString() + 'px' ;
    },
    handleHeatmapDataByYear(year, index) {
      let date = +this.$echarts.number.parseDate(year + "-01-01");
      let end = +this.$echarts.number.parseDate(+year + 1 + "-01-01");
      let dayTime = 3600 * 24 * 1000;
      let data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          this.$echarts.format.formatTime("yyyy-MM-dd", time),
          // 初始化每天 0 篇文章
          0
        ]);
      }
      let newIndex = index,
        y,
        offet;
      while (true) {
        if (newIndex >= this.blogList.length) break;
        y = parseInt(this.blogList[newIndex].yearMonth / 100);
        if (y != year) break;
        let content = this.blogList[newIndex].content;
        content.forEach(blog => {
          offet = parseInt((new Date(blog.createTime) - date) / dayTime);
          data[offet][1]++;
        });
        newIndex++;
      }
      let resultData = { newIndex: newIndex, data: data };
      return resultData;
    }
  },
  activated() {
    document.title = "归档";
  },
  computed: {
    totalNum() {
      let total = 0;
      this.blogList.forEach(element => {
        total += element.content.length;
      });
      return total;
    },
    totalYear() {
      let yearSet = new Set();
      this.blogList.forEach(element => {
        yearSet.add(parseInt(parseInt(element.yearMonth) / 100));
      });
      return yearSet.size;
    }
  },
  data() {
    return {
      blogList: [
        {
          yearMonth: "",
          content: [
            { id: 0, name: "", createTime: "2021-02-13T09:30:29.000+08:00" }
          ]
        }
      ],
      heatmapData: [],
      heatmapOption: {
        title: {
          top: 30,
          left: "center",
          text: "更新频率"
        },
        tooltip: {
          position: "top",
          formatter: p => {
            let format = this.$echarts.format.formatTime(
              "yyyy-MM-dd",
              p.data[0]
            );
            return format + ": " + p.data[1] + "篇";
          }
        },
        visualMap: {
          type: "piecewise",
          orient: "horizontal",
          left: "center",
          top: 65,
          pieces: [
            { gte: 4, color: "#006600", label: "可能有误" },
            { min: 3, max: 3, color: "#30a14e", label: "火力全开" },
            { min: 2, max: 2, color: "#40c463", label: "不太可能" },
            { min: 1, max: 1, color: "#9be9a8", label: "终于写了" },
            { lte: 0, color: "#ebedf0", label: "懒人一个" }
          ]
        },
        calendar: [
        ],
        series: [
        ]
      }
    };
  }
};
</script>

<style scoped>
a,
a:link,
a:visited,
a:focus {
  text-decoration: none;
  color: #000;
}
.article-title-link {
  position: relative;
  /* text-align: center; */
}
.article-title-link::after {
  content: "";
  width: 0;
  height: 3px;
  background: black;
  position: absolute;
  top: 100%;
  left: 50%;
  transition: all 0.5s;
}

.article-title-link:hover::after {
  left: 0%;
  width: 100%;
}
.my-timeline-item {
  font-size: 16px;
}
.total-divider {
  margin-bottom: 30px;
}
</style>
