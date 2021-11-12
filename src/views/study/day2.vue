<template>
  <div>
    <div class="top">
      <echartsModule
        class="left"
        ref="option"
        style="width: 100%"
        height="300px"
        :options="option"
      />
    </div>
    <div class="conter1">
      <echartsModule
        class="left1"
        ref="option1"
        style="width: 100%"
        height="300px"
        width="49%"
        :options="option1"
      />
      <echartsModule
        class="right1"
        ref="option2"
        style="width: 100%"
        height="300px"
        width="49%"
        :options="option2"
      />
    </div>
  </div>
</template>
<script>
import { echartsModule } from "@/components";
export default {
  components: { echartsModule },
  data() {
    return {
      //echarts相关配置
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      },
      option1: {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      option2: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    console.log("111");
  },
  methods: {
    handelData() {
      //写方法、随便写
    },
  },
};
</script>

<style lang='scss' scoped>
</style>