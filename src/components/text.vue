<template>
  <div class="hello">
    1111

    <div style="display: flex">
      <select-tree
        v-model="treeValue"
        :options="options || []"
        @change="changeOrg"
        size="mini"
      ></select-tree>
      <select-tree
        v-model="treeValue"
        :options="options || []"
        @change="changeOrg"
      ></select-tree>
    </div>
    <button @click="handelClick">登录次数</button>
    <div class="tap1">
      <div id="main"></div>
      <div id="main2"></div>
    </div>
    <div class="tab2">
      <div id="offer"></div>
    </div>
    <div class="tab3">
      <div id="buyers">
        <wordcloud
          :data="defaultWords"
          nameKey="name"
          valueKey="value"
          spiral="rectangular"
          :color="myColors"
          :showTooltip="true"
          :rotate="rotate"
        >
        </wordcloud>
      </div>
    </div>
    <div class="tab4">
      <div id="radar"></div>
    </div>
    <div id="server"></div>
    <div id="recommend"></div>
    <div id="acvite"></div>
    <div id="contentA"></div>
    <div id="contentB"></div>
  </div>
</template>

<script>
//如果折线图需要非echarts规定格式，需要提供图片，柱状图也一样
//服务类型的扇形，引导线需要更换，指引的是否是key 还是value
//询盘推荐折线图中“全部推荐，会员定向系统推荐 客服推荐”是可以点击切换K线图还是？？？
import * as echarts from "echarts";
import wordcloud from "vue-wordcloud";
import { WordCloud } from "@antv/g2plot";
import SelectTree from "./selectTree.vue";
export default {
  name: "HelloWorld",
  components: {
    wordcloud,
    SelectTree,
  },
  data() {
    return {
      treeValue: "",
      defaultProps: {
        parent: "parentId", // 父级唯一标识
        value: "id", // 唯一标识
        label: "label", // 标签显示
        leader: "leader",
        children: "children", // 子级
      },
      options: [
        {
          parentId: "0",
          id: "A",
          label: "label-A",
          children: [
            {
              parentId: "A",
              id: "A-1",
              label: "label-A-1",
            },
          ],
        },
        {
          parentId: "0",
          value: "B",
          label: "label-B",
          children: [],
        },
      ],
      orgOptions: {},
      platformData: {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: [120, 200, 150, 80, 70, 110, 130],
      },
      platformChart: "",
      checkDomChart: "",
      inquiryData: {
        xData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        yData: [],
      },
      offerDomChart: "",
      offerPriceData: {
        xdata: ["龙门铣加工", "五州加工", "砂型铸造", "各类切割", "车削"],
        ydata: [128, 423, 54, 175, 288, 57],
      },
      myColors: ["#0f0", "#629fc9", "#FF7644", "#c9e0ef", "#3A69F4", "#FFAE44"],
      defaultWords: [
        {
          name: "内容1",
          value: 36,
        },
        {
          name: "内容2",
          value: 36,
        },
        {
          name: "内容3",
          value: 18,
        },
        {
          name: "内容4",
          value: 16,
        },
        {
          name: "内容5",
          value: 15,
        },
        {
          name: "内容6",
          value: 36,
        },
        {
          name: "内容7",
          value: 36,
        },
        {
          name: "内容8",
          value: 36,
        },
        {
          name: "内容9",
          value: 36,
        },
        {
          name: "内容9",
          value: 36,
        },
        {
          name: "内容9",
          value: 36,
        },
        {
          name: "内容9",
          value: 36,
        },
      ],
      rotate: { from: 0, to: 0, numOfOrientation: 0 },
      radarDomChart: "",
      serverDomChart: "",
      recommendDomChar: "",
      acviteDomChart: "",
      acviteDomBChart: "",
      acviteData: [
        { value: 120, name: "邀约活动" },
        { value: 60, name: "出席活动" },
      ],
    };
  },
  mounted() {
    //aanv词云
    let that = this;
    const wordCloud = new WordCloud("contentA", {
      data: that.defaultWords,
      wordField: "name",
      weightField: "value",
      colorField: "name",
      wordStyle: {
        fontFamily: "Verdana",
        fontSize: [8, 32],
        rotation: 0,
      },
      // 返回值设置成一个 [0, 1) 区间内的值，
      // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
      random: () => 0.5,
    });

    wordCloud.render();

    var chartDom = document.getElementById("main");
    this.platformChart = echarts.init(chartDom);
    this.createPlatform(this.platformChart, this.platformData); //柱状图
    this.checkDomChart = echarts.init(document.getElementById("main2"));
    this.inquiryCheck(this.checkDomChart, this.inquiryData); //折线图
    this.offerDomChart = echarts.init(document.getElementById("offer"));
    this.offerPrice(this.offerDomChart, this.offerPriceData);
    this.radarDomChart = echarts.init(document.getElementById("radar")); //雷达图
    this.handelRandar(this.radarDomChart, this.offerPriceData);
    this.serverDomChart = echarts.init(document.getElementById("server")); //饼图
    this.handelServer(this.serverDomChart, []);
    this.recommendDomChar = echarts.init(document.getElementById("recommend")); //折线图
    this.handelRecommend(this.recommendDomChar, []);
    this.acviteDomChart = echarts.init(document.getElementById("acvite")); //半个饼图
    this.handelActive(this.acviteDomChart, this.acviteData);

    this.acviteDomBChart = echarts.init(document.getElementById("contentB")); //半个饼图
    this.handelActiveB(this.acviteDomBChart, this.acviteData);
  },
  methods: {
    changeOrg(val) {
      console.log("1111111111111111", val);
    },
    toPercent(num) {
      var percent = parseFloat(Number(num * 100).toFixed(2)) + "%";
      return percent;
    },
    handelClick() {
      this.platformData.xData.push("11111");
      this.platformData.yData.push(300);
      this.createPlatform(this.platformChart, this.platformData);
    },
    createPlatform(dom, currentData) {
      var option;

      option = {
        color: ["#3A69F4"],
        xAxis: {
          type: "category",
          data: currentData.xData,
        },
        yAxis: {
          type: "value",
        },
        legend: {
          type: "plain", // 图列类型，默认为 'plain'
          top: "1%", // 图列相对容器的位置 top\bottom\left\right
          left: "2%",
          selected: {
            // '销量': true  // 图列选择，图形加载出来会显示选择的图列，默认为true
          },
          textStyle: {
            // 图列内容样式
            color: "#fff", // 字体颜色
            backgroundColor: "black", // 字体背景色
          },
          tooltip: {
            // 图列提示框，默认不显示
            show: true,
            color: "red",
          },
          data: [
            // 图列内容
            {
              name: "登录次数", //必须要与series的name一致。
              icon: "rect",
              textStyle: {
                color: "#666", // 单独设置某一个图列的颜色
                backgroundColor: "#fff", // 单独设置某一个图列的字体背景色
              },
            },
          ],
        },
        series: [
          {
            name: "登录次数",
            data: currentData.yData,
            type: "bar",
            showBackground: false,
            // barWidth: 20 //宽度可以不要如果一个月30条数据的时候就为细一点
          },
        ],
      };
      dom.clear();
      dom.setOption(option, true);
    },
    inquiryCheck(dom, currentData) {
      let options = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            {
              name: "邮件营销",
              icon:
                "image://https://img.lanrentuku.com/img/allimg/1206/5-120601154104-50.gif",
            },
            {
              name: "联盟广告",
              icon:
                "image://https://img.lanrentuku.com/img/allimg/1206/5-120601154104-50.gif",
            },
            {
              name: "视频广告",
              icon:
                "image://https://img.lanrentuku.com/img/allimg/1206/5-120601154104-50.gif",
            },
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          //数据格式为这种数组，可以构造
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      };
      dom.clear();
      dom.setOption(options, true);
    },
    offerPrice(dom, currentData) {
      let _option = {
        tooltip: {
          formatter: (params) => {
            return this.toPercent(params.value);
          },
        },
        xAxis: {
          show: false,
          // axisLine: {
          //   lineStyle: {
          //     color: "#0f0",
          //     width: 1
          //   }
          // },
          // axisLabel: {
          //   show: true,
          //   textStyle: {
          //     color: "#c3dbff", //更改坐标轴文字颜色
          //     fontSize: 12 //更改坐标轴文字大小
          //   }
          // },
          // splitLine: {
          //   //网格线
          //   show: false,
          //   lineStyle: {
          //     color: "#192f73",
          //     width: 1
          //   }
          // }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#ccc",
              width: 1,
            },
          },
          axisTick: {
            show: false, //不显示刻度线
          },
          axisLabel: {
            margin: 21, //离开右边的距离
            textStyle: {
              color: "#666", //更改坐标轴文字颜色
              fontSize: 12, //更改坐标轴文字大小
            },
            formatter: function (value, index) {
              return value;
            },
          },
          inverse: true,
          data: currentData.xdata,
        },
        grid: {
          top: "0px",
          left: "10%",
          right: "0px",
          bottom: "0px",
        },
        series: [
          {
            type: "bar",
            color: ["#3A69F4"],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#666",
                    fontSize: 12,
                  },
                },
              },
            },
            data: currentData.ydata,
          },
        ],
      };
      dom.clear();
      dom.setOption(_option, true);
    },
    //慈云
    wordClickHandler(name, value, vm) {
      console.log("wordClickHandler", name, value, vm);
    },
    //雷达图 总曝光量还有title需要重新写
    handelRandar(dom, currentData) {
      let option = {
        radar: {
          // shape: 'circle',
          name: {
            color: "#666",
            fontSize: 12,
          },
          //十字交叉的颜色
          axisLine: {
            lineStyle: {
              color: ["#eeeeee"],
              width: 4,
            },
          },
          indicator: [
            { name: "名片收藏数", max: 6500 },
            { name: "档案收藏数", max: 16000 },
            { name: "分享数", max: 30000 },
            { name: "点赞数", max: 38000 },
            { name: "访问次数", max: 52000 },
            { name: "访问人数", max: 25000 },
          ],
          splitLine: {
            show: true,
            lineStyle: {
              width: 4,
              color: ["#eeeeee"],
              // 图表背景网格线的颜色
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["#fff"],
              // 图表背景网格的颜色
            },
          },
        },
        series: [
          {
            name: "PC",
            type: "radar",
            tooltip: {
              trigger: "item",
            },
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "PC",
                symbol: "none",
                lineStyle: {
                  // 单项线条样式。
                  normal: {
                    color: "#1288DB",
                    opacity: 0.7, // 图形透明度
                  },
                },
                areaStyle: {
                  normal: {
                    color: "rgba(58,105,244,0.15)",
                  },
                },
              },
              {
                value: [0, 0, 28000, 26000, 42000, 0],
                name: "小程序",
                symbol: "none",
                lineStyle: {
                  // 单项线条样式。
                  normal: {
                    color: "#12D9C8",
                    opacity: 0.7, // 图形透明度
                  },
                },
                areaStyle: {
                  // 单项区域填充样式
                  normal: {
                    color: "rgba(18,217,200,0.15)", // 填充的颜色。[ default: "#000" ]
                  },
                },
              },
            ],
          },
        ],
      };
      dom.clear();
      dom.setOption(option, true);
    },
    //饼图
    handelServer(dom, currentData) {
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          right: "7%",
          bottom: "13%",
          icon: "circle",
          textStyle: {
            color: "#666",
            fontSize: 14,
            backgroundColor: "#fff", //这个不能去掉，否则lineheight失效
            lineHeight: 28,
          },
        },
        color: ["#FFAE44", "#2FE0EB", "#1288DB", "#8284F0", "#FF7644"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"], //k可以调节图的大小
            avoidLabelOverlap: false,
            //中间白色间距
            itemStyle: {
              borderRadius: 1,
              borderColor: "#fff",
              borderWidth: 4,
            },

            labelLine: {
              show: true,
            },
            data: [
              { value: 1048, name: "邀约活动" },
              { value: 735, name: "推荐询盘跟进" },
              { value: 580, name: "授盘跟进" },
              { value: 484, name: "邀约Webex" },
              { value: 300, name: "出席Webex" },
            ],
          },
        ],
      };
      dom.clear();
      dom.setOption(option, true);
    },
    //折线图
    handelRecommend(dom, currentData) {
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            itemStyle: {
              color: "#2FE0EB",
            },
            areaStyle: {
              // 区域填充样式
              color: {
                // 填充的颜色 // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: " rgba(104,241,246,0.59)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(55,223,234,0.00)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            xAxisIndex: 0,
          },
        ],
      };
      dom.clear();
      dom.setOption(option, true);
    },
    handelActive(dom, currentData) {
      let num = (currentData[1].value / currentData[0].value) * 100 + "%";

      let option = {
        tooltip: {
          trigger: "item",
        },
        title: {
          text: num,
          left: "center",
          top: "50%",
          textStyle: {
            color: "#27D9C8",
            fontSize: 36,
            align: "center",
          },
        },
        graphic: {
          type: "text",
          left: "center",
          top: "40%",
          style: {
            text: "出席率",
            textAlign: "center",
            fill: "#333",
            fontSize: 20,
            fontWeight: 700,
          },
        },
        legend: {
          orient: "vertical",
          right: "7%",
          bottom: "13%",
          icon: "none",
          textStyle: {
            color: "#666",
            fontSize: 14,
            backgroundColor: "#fff", //这个不能去掉，否则lineheight失效
            lineHeight: 28,
            rich: {
              a: {
                fontSize: 14,
                verticalAlign: "top",
                align: "center",
                padding: [20, 15, 25, 0],
              },
              b: {
                fontSize: 24,
                align: "center",
                padding: [20, 15, -10, 0],
                lineHeight: 25,
                fontWeight: "bold",
              },
            },
          },
          formatter: function (name) {
            let arr = ["{a|" + name + "}", "{b|" + 1234 + "}"];
            return arr.join("\n");
          },
        },
        color: ["#FFAE44", "#2FE0EB", "#1288DB", "#8284F0", "#FF7644"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"], //k可以调节图的大小
            avoidLabelOverlap: false,
            //中间白色间距
            itemStyle: {
              borderRadius: 1,
              borderColor: "#fff",
              borderWidth: 4,
            },
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
            data: [
              { value: 1048, name: "邀约活动" },
              { value: 1048, name: "推荐询盘跟进" },
            ],
          },
        ],
      };
      dom.clear();
      dom.setOption(option, true);
    },
    handelActiveB(dom, currentData) {
      let option = {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          right: "7%",
          bottom: "13%",
          icon: "circle",
          textStyle: {
            color: "#666",
            fontSize: 14,
            backgroundColor: "#fff", //这个不能去掉，否则lineheight失效
            lineHeight: 28,
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            color: ["#FFAE44", "#2FE0EB", "#1288DB", "#8284F0", "#FF7644"],
            itemStyle: {
              borderRadius: 1,
              borderColor: "#fff",
              borderWidth: 2,
            },
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
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
      };
      dom.clear();
      dom.setOption(option, true);
    },
  },
};
</script>
<style scoped>
.tap1 {
  display: flex;
}
#main,
#main2 {
  width: 40%;
  height: 500px;
}
#main2,
#offer {
  width: 40%;
  height: 500px;
}
#offer {
  height: 270px;
}
#buyers {
  width: 40%;
  height: 300px;
  margin: 0 auto;
}
#radar {
  width: 45%;
  height: 320px;
}
#server {
  width: 50%;
  height: 285px;
}
#recommend,
#acvite,
#contentA,
#contentB {
  width: 50%;
  height: 335px;
}
</style>
