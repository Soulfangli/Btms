<template>
    <div>
        <h3 v-if="options.showTitle" class="showTitle">{{ options.titleName }}</h3>
        <div ref="myEchart" :style="{ height: height, width: width, zoom: zoom }"></div>
    </div>
</template>

<script>
export default {
    name: 'echarts',
    data() {
        return {
            zoom: 1,
            mychart: null
        }
    },
    props: {
        height: { type: String, default: '350px' },
        width: { type: String, default: '100%' },
        options: { type: Object, default: () => {} },
        name: { type: String, default: '' },
        map: { type: Object, default: null }
    },
    computed: {
        style() {
            return {
                height: this.height,
                width: this.width
            }
        },
        myOptions: function() {
            return this.options || {}
        }
    },
    mounted() {
        this.zoom = this.detectZoom()
        this.InitChart()
        console.log('echart')
        this.$nextTick(() => {
            this.myChart.resize()
        })
    },
    destroyed() {
        this.myChart.clear()
    },
    methods: {
        //图片下载
        downloadImg() {
            let img = this.myChart.getDataURL({
                type: 'png',
                backgroundColor: '#fff'
            })
            var myDate = new Date()
            let year = myDate.getFullYear()
            let month = myDate.getMonth()
            let day = myDate.getDate()
            let name = `${this.name}${year}-${month + 1}-${day}`
            let a = document.createElement('a')
            a.setAttribute('href', img)
            a.setAttribute('download', name)
            a.click()
        },
        throttle(fn,delay = 800) {//一定时间内只执行一次
            let canRun = true; // 通过闭包保存一个标记
            return function () {
                if (!canRun) return;//在delay时间内，直接返回，不执行fn
                canRun = false;
                setTimeout(() => { 
                    fn.apply(this, arguments);
                    canRun = true;//直到执行完fn,也就是delay时间后，打开开关，可以执行下一个fn
                }, delay);
            };
        },  
        //echarts图表初始化
        InitChart() {
            let that = this;
            this.myChart = this.$echarts.init(this.$refs.myEchart);
            this.myOptions.color = ['#FF9D47', '#82DE8A', '#FFd35C', '#FF8080', '#70A9FF', '#BB70FF', '#40E0D0', '#7B68EE', '#3CB371', '#CD5C5C']
            this.myChart.on('click', function(params) {
                that.$emit('handleClickCharts', params)
            })
            if (this.map) {
                this.$echarts.registerMap('shanghai', this.map)
            }
            this.myChart.clear();
            this.setOption(); // 绘制图表
            window.onresize = () => {
                this.zoom = this.detectZoom()
                this.throttle(this.myChart.resize())
            }
        },
        // 绘制图表
        setOption() {
            this.myChart.setOption(this.myOptions)
        },
        clear() {
            this.myChart.clear()
        },
        dispose() {
            this.myChart.dispose()
        },
        //获取当前缩放
        detectZoom() {
            let isMac = /macintosh|mac os x/i.test(navigator.userAgent)
            let ratio = 0
            //mac devicePixelRatio值会比正常缩放比大一倍
            if (isMac) {
                ratio = window.devicePixelRatio / 2
            } else {
                ratio = window.devicePixelRatio
            }
            return ratio
        }
    }
}
</script>
<style lang="scss" scoped>
.showTitle {
    display: flex;
    justify-content: center;
    margin: 100px 0px -10px;
}
</style>
