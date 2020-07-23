<template>
    <div  class="echarts_wrap">
        <span class="unit">{{colorFlag ? '单位（度）' : '单位（个）'}}</span>
        <div :id="index" style="height:100%"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        props: {
            colorFlag: {
                type: Boolean
            },
            index:{
                type: Number
            },
            lineData:{
                type: Object
            }
        },
        data(){
            return {
                lineDataNew: {}
            }
        },
        methods: {
            initELine(){
                let that = this;
                let xName = this.lineDataNew.names;
                let yValue = this.lineDataNew.values;
                let max = Math.max(...yValue);
                let min = Math.min(...yValue)
                let maxIndex = yValue.indexOf((max+''));
                let minIndex = yValue.indexOf((min+''));
                let lineDom = document.getElementById(this.index);
                let lineChart = this.$echarts.init(lineDom);
                let option = {
                    tooltip : {
                        trigger: 'axis',
                        formatter: "{a} : {c}"
                    },
                    xAxis: {
                        type : 'category',
                        boundaryGap : false,
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            color:'#B1B5B8',
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#F7E6D0'
                            },
                        },
                        data : xName
                    },
                    grid: {
                        show: false,
                        top: '10%',
                        left: '2%',
                        right: '5%',
                        containLabel: true
                    },
                    yAxis : {
                        type: 'value',
                        axisPointer: {
                          show: false
                        },
                        axisTick:{
                            show: false
                        },
                        axisLabel:{
                            color:'#404447'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#F7E6D0'
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#F7E6D0'
                            }
                        }
                    },
                    series: [
                        {
                            name:  this.colorFlag ?'用电量':'报警数',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            markPoint : {
                                symbol: this.colorFlag ?
                                  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACW0lEQVQ4jXVTTUhUURg99++9gZRQirBEcwIXatjGaNWiJhhJaZfbFkpIErhq1aJdRBgtgkKjoNq4MjAYY5SKWoS0mDBLsMERIYmwkkLfffe7N+4b/GEmD9zHu49zzvf7mHMOu9H3fKLNmrDfmqDbxGGLpQCWgqI1Kkekxl4Ots7v5m8bXJoeDawJR4wJB60JOZkQFAcgCmFNYgIyyjoKRsmq4fyVoxvbBpff3Q6IUi8oDjOJ0KRAXlRhQt6EFKxRM5ZUd36oRUvvIpS+4xjL+FwcYzhxsBHZ5g6k99f7GFhcW8fE/De8L/2BD8gkzjCwEQBD7GrhWjuZsEAmFD5iz5HT6G3uwv8wPreMJx9WfQawFBKR7ORCRv1CRkLICJ0HGvcUe1zsaMKp5hoIGYNLLbiI+7lQOiukhlARzjWcrBJV4kJbA5jU3sAbZSUXURrJIBya9h2uElTiWH0tfEDPh0Nali+sirgXPNOXy+BAgOZc6KL/4FNa2SztIdtB8fdaYsBFoilxIeNcuZ4Ib9enqgSVmCp9SrhCaQih85xx/ZCLmLjQWIhmMf1zskq0hcnlWRR+LYJ7AxmRkNGYeHVr4fvrjaeHGEOXr7C4+QUrGyuo5XWoEbUgR/j6dxnjS3m8Wf2Y9ICVW3b/WU/f4/ImynjYElodWMa31mfyebWQrDNRqrzOJgSXYaJ0DjNwGPbv3D+u1+U0E/F5LvQ9IWPLVbIo4MrP29dbPlJuWi6jB0JFPY/ODvjx7fyNW7jxo7fdkhogE2SJgrQzgSYTLJFJ5YmCsbvHb85tkwH8A5oqKPJZhVwaAAAAAElFTkSuQmCC'
                                : 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACF0lEQVQ4jXWTz2sTQRTHP7PZX8GLLCIeRDQHkaQahF5zsARJ0T9B7CViqyL0f/Bc8VCxGg+i9dCbB6GU0hbqzYOGhFJFqiKVHjR4kc3OJBmZ3Wxak/YLb2d3ed/ve/PmO0JrzUG0HhTySKpIPUnEOZSGiB0UyyhdCxa3tw7mDwRaCxddIuaI9AwSi6hniCBN6GRVuofkGR09Gyx9CgcCrdeXXCRviXQ5TjbEODSD70QgXddQTAZL29KOy/vWQ4Qu95vCOVvCL05hnxqL/3R+NGivv0B9WAfijieAOeCe+L1SLCB1nUhkTMVsfoZscZrDEK48IXzzKOlK0UVRtPBEFdfK4IJzpnQk2SB7dRrn8gR4AlyRwaZqBCp4YMK/MDVCGoZ/5SY4gBOLVGxccmgRp9nH8yOEYdinx8CzzPjNvHJGID3RkeRDIUxlM0uTr6WFa+3gingLnb9bh1H+Q2evSbJlbbbw3cJhOVZ0Be1fiyOEYbTrL0kKWqaTVSPwHEd0jYgKNwn3aiOkFGH9KernRv8U6OKKWuLE3fF5FHcSp2mcbAn/xA3sY30j/WnS/vwK9XWj78zYnY+D+427iRMdMQucB2I3qvAd6svm/j1Ibe2nsxZroA0HyzyCk+8lDtdwmMcRvXSo8WxMu+bdkD3RwxMLeFwPbjeM/P5tTNHaHS+guIWkguzlUEgk34j0KlLXgvLH5iAZ+AfyYderUeWhQwAAAABJRU5ErkJggg==',
                                symbolSize: [10, 10],
                                data : [
                                    {name : '最大值', value : max, xAxis: maxIndex, yAxis: max},
                                    {name : '最小值', value : min, xAxis: minIndex, yAxis: min}
                                ],
                                label:{
                                    show: false
                                }
                            },
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: this.colorFlag ? 'rgba(233,253,218,0.8)' : 'rgba(252,254,224,0.8)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: this.colorFlag ? 'rgba(219,233,252,0.8)' : 'rgba(252,225,219,0.8)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },
                            lineStyle: {
                                width: 3,
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: this.colorFlag ? '#88F639' : '#EDF635'// 0% 处的颜色
                                    }, {
                                        offset: 1, color: this.colorFlag ? '#3A88ED' : '#ED3814'// 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },
                            data: yValue
                        },
                        {
                            name: this.colorFlag ?'用电量':'报警数',
                            type: 'bar',
                            smooth: true,
                            // symbol: false,
                            // symbolSize: 0,
                            barWidth: 6,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(255,255,255,0)'
                                }
                            },
                            emphasis: {
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: this.colorFlag ? 'rgba(58,136,237,0.6)' : 'rgba(213,69,13,0.6)'
                                    }, {
                                        offset: 1,
                                        color: this.colorFlag ? 'rgba(136,246,57,0.6)' : 'rgba(237,248,53,0.6)'
                                    }]),
                                }
                            },
                            data: yValue
                        },
                    ]

                };
                lineChart.setOption(option, true);
            }
        },
        mounted(){
            this.initELine()
        },
        watch: {
            lineData: {
                handler: function(newValue, oldValue) {
                    if (newValue) {
                        this.lineDataNew = newValue;
                        this.initELine();
                    }
                },
                deep: true
            }
        }

    }
</script>

<style lang="scss" scoped>
.echarts_wrap{
    height: 100%;
    .unit{
        padding-right: 25px;
        font-size: 12px;
        color: #B1B5B8;
        float: right;
        position: relative;
        top: 5px;
    }
}
</style>
