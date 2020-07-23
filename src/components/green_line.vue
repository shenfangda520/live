<template>
    <div class>
        <div class="child_echart_box">
            <div class="echart_box_item disflex">
              
                <a :class="wym=='week'?'act':''" @click="typeSwtich('week')">周</a>
                <a :class="wym=='month'?'act':''" @click="typeSwtich('month')">月</a>
                <a :class="wym=='year'?'act':''" @click="typeSwtich('year')">年</a>
            </div>
            <div id="gline" style="height:470px;width:100%;"></div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import {get_proportionHistogram} from "../api/api";
export default {
    props: {
        flagType: {
            type: String
        } 
    },
    data() {
        return {
            wym: ''
        };
    },
    methods: {
        typeSwtich(tmp){
            this.wym = tmp;
            this.getData();
        },
        initMeterPie(result) {
            let that = this;
            let pieDom = document.getElementById("gline");
            let pieChart = this.$echarts.init(pieDom);
           
            let pieOpt = {
                backgroundColor: "rgba(82,159,21,0.1)",

                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                grid: {
                    top: "15%",
                    right: "2%",
                    left: "2%",
                    height: "70%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: result.names,
                        axisLine: {
                            lineStyle: {
                                color: "#777"
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval:0,
                            margin: 10,
                            color: "#529F15",
                            textStyle: {
                                fontSize: 14,
                                fontWeight: "bold"
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        axisLabel: {
                            formatter: "{value}",
                            color: "#529F15",
                            textStyle: {
                                fontSize: 14,
                                fontWeight: "bold"
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#777"
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: "bar",
                        data: result.values,
                        barWidth: "30px",
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#C6D800" // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#529F15" // 100% 处的颜色
                                        }
                                    ],
                                    false
                                )
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            };
            pieChart.setOption(pieOpt, true);
        },
        getData(){
            let para = {
                flag: this.wym
            };
            get_proportionHistogram(para).then(rst=>{
                console.log(rst)
                if(rst.data.code + '' === '0'){
                    let tmp = rst.data.result;
                    this.initMeterPie(tmp);

                }else{
                    this.$message.error(rst.data.message || '请稍后再试~');
                }
            })
        }
    },
    mounted() {
        this.wym = this.flagType || 'year';
        this.getData();
    }
};
</script>
<style lang="scss" scoped>
.lay_tit {
    height: 27px;
    border-bottom: 1px #d9eccc solid;
    color: #529f15;
    font-size: 14px;
    font-weight: bold;
    line-height: 27px;
    padding-left: 12px;
    position: relative;
    i {
        display: inline-block;
        position: relative;
        top: 2px;
        width: 3px;
        height: 14px;
        background: #529f15;
        margin-right: 8px;
    }
    span {
        font-weight: normal;
        position: absolute;
        font-size: 12px;
        color: #529f15;
        right: 15px;
        em {
            font-weight: bold;
        }
    }
}
.disflex {
    display: flex;
}
.child_echart_box {
    padding: 0 20px;
    width: 100%;
    height: 100%;
}
.echart_box_item {
    width: 100%;
    margin: 27px 0 20px;
    padding-right: 15px;
    justify-content: flex-end;

    a {
        width: 38px;
        height: 26px;
        display: inline-block;
        border: 1px solid rgba(82, 159, 21, 1);
        border-right: 0;
        font-size: 16px;
        font-weight: bold;
        line-height: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: rgba(82, 159, 21, 1);
        transition: all 0.3s;
        &.act {
            background: #529f15;
            color: #fff;
        }
        &:nth-last-of-type(1) {
            border-right: 1px solid rgba(82, 159, 21, 1);
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }
        &:nth-of-type(1) {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }
    }
}
</style>