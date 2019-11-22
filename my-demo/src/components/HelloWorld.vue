<template>
  <div class="hello">
    <h1>Welcome to Vue echarts 练习</h1>
    <div id="main"></div>
    <div id="main1"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawChart1() {
      let myChart1 = this.$echarts.init(document.getElementById("main1"));
      let option = {
        title: {},
        tooltip: {
          text: "销量"
        },
        series: {
          type: "pie",
          data: [
            { name: "A", value: 1212 },
            { name: "B", value: 2323 },
            { name: "C", value: 1919 }
          ]
        }
      };
      myChart1.setOption(option);
    }
  },
  mounted() {
    this.drawChart();
    this.drawChart1();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
#main {
  width: 600px;
  height: 400px;
}
#main1 {
  width: 600px;
  height: 400px;
}
</style>
