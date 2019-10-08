<template>
    <view>
        <graceHeader title="ECharts 数据展示组件" desc="来自百度团队的优质数据展示组件"></graceHeader>
        <view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
            <view class="grace-text-small grace-center" style="margin:20upx 0;">饼图示例</view>
            <view class="echartsIn">
                <mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" />
            </view>
            <view class="grace-text-small grace-center" style="margin:20upx 0;">折线图示例</view>
            <view class="echartsIn">
                <mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" />
            </view>
        </view>
    </view>
</template>
<script>
    import * as echarts from '../../threeComponents/echarts/echarts.min.js';
    import mpvueEcharts from '../../threeComponents/echarts/echarts.vue';
    function getPieOption() {
        return {
            animation: false,
            backgroundColor: '#F8F8F8',
            color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
            series: [{
                label: {
                    normal: {
                        fontSize: 14
                    }
                },
                type: 'pie',
                center: ['50%', '50%'],
                radius: [0, '60%'],
                data: [{
                    value: 55,
                    name: '北京'
                }, {
                    value: 20,
                    name: '武汉'
                }, {
                    value: 10,
                    name: '杭州'
                }, {
                    value: 20,
                    name: '广州'
                }, {
                    value: 38,
                    name: '上海'
                }],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 2, 2, 0.3)'
                    }
                }
            }]
        }
    }
    function getLineOption() {
        return {
            animation: false,
            color: ['#37A2DA', '#9FE6B8'],
            legend: {
                data: ['蒸发量', '降水量']
            },
            grid: {
                x: 35,
                x2: 10,
                y: 30,
                y2: 25
            },
            calculable: false,
            xAxis: [{
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }],
            yAxis: [{
                type: 'value',
                splitArea: {
                    show: true
                }
            }],
            series: [{
                name: '蒸发量',
                type: 'line',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            }, {
                name: '降水量',
                type: 'line',
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            }]
        }
    }
    export default {
        data() {
            return {
                echarts,
                pieInit: function (canvas, width, height) {
                    let pieChart = echarts.init(canvas, null, {
                        width: width,
                        height: height
                    })
                    canvas.setChart(pieChart)
                    pieChart.setOption(getPieOption())
                    return pieChart
                },
                lineInit: function (canvas, width, height) {
                    let lineChart = echarts.init(canvas, null, {
                        width: width,
                        height: height
                    })
                    canvas.setChart(lineChart)
                    lineChart.setOption(getLineOption())
                    return lineChart
                }
            }
        },
        methods: {
            goBrowser() {
                // #ifdef APP-PLUS
                plus.runtime.openURL("https://github.com/F-loat/mpvue-echarts");
                // #endif
                // #ifdef MP-WEIXIN
                uni.showModal({
                    content:"请复制链接在浏览器里打开",
                    showCancel:false
                })
                // #endif
            }
        },
        components: {
            mpvueEcharts
        }
    }
</script>
<style>
.echartsIn{width:100%; height: 600upx;}
</style>