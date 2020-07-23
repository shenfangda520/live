<template>
    <div class>
        <div class="child_echart_box">
            <div id="gline" style="height:350px;width:100%;"></div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import {get_netWorkRank} from "../api/api";
export default {
    props: {
       
    },
    data() {
        return {
            eData: [],
            zsData:[],
            qData:[],
            rateData:[],
        };
    },
    methods: {
        initLinePie() {
            let that = this;
            let pieDom = document.getElementById("gline");
            let pieChart = this.$echarts.init(pieDom);
        
            let pieOpt = {
                tooltip: {
                    show: true,
                    trigger: "item",
                    backgroundColor: "none",
                    formatter: function(params, ticket, callback) {
                        let tipData = that.zsData[params.dataIndex]
                        return (
                            "<div style='width:65px;height:47px;color:#529F15;text-align:center;padding-top:7px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAvCAMAAACL11ddAAAAt1BMVEUAAABztQZvvSYmrQBuuSlnuSJtuitsviZvuilerxtuuyptuSZruCpuuilvuCFtuSdrvSP///5vuiduuSptuiluuyf9/vtvuilvuiptuilwuyxssyD7/fj8/vr5/fbo9NzU7MDt9uJvuSpuuipuuylrtSiVxlX0++/s9eHy+Ov1+vL3/PPM57Tc7srM5LHo89zy+u2Bw0N8vzyCwEOSyGT8/vrs9uXl89i/4KO73pqj1XaXzWX///9gLIEaAAAAPHRSTlMAAw0BGAcqCz4JTx0SIQ8tFfpANzEn5CRNOykX7OezsX1iVUlEJhLdxr2cm4yKhm1jVUw5HPHMvHRtYVtF+eCiAAAB5klEQVRIx+3WyXLjIBAGYEsGYYZFK5Ll3U7s7Htm1/s/1zRDJDw+jK3OJYf8Bx9U9GegioZBl+FwGJwYGDo4DFRTyjljLDwSGMI5pcEBAv9Od4+LMm1OSFouHncUZvIPQNm6bHqkXDNqCQ/sbpqeudkB4QF93fTOtQaiBcJ1g8g6BMIJ7HWOEeavzAkBlQ8NKg+SBnYKlE0XOGExZXRoBS1KnFAK/VfgUqU4IVWSgxDwpGqQqRIegMCIwQqGMCdMsMKkFSKsEDkhfI8QfgqfwqHASIQ9m1F3LrD9oTsX5gonXBkQXH9Y4YSV7Q+uR73MMMDsRUn+1ifjFWoKse2Trldv82V/YJlvba9294WIR8vewCgWkgZvd1aiiux+1msP7rNCJay99WhIqmL0fHs5P+39ML+8fR4VFQn3rl5NVJxn52fj8fiLz2bz3dV822y6jzDk7DzLY0W0A9pZJGIbF3ldj7pkID5dWODiCWqy9ntd50W8FYmbgSeYnApVmUnkA2L2G3bn668MarrPE1MpMZXMAZ4AQ8uE7EcoU9Q/0/RHXRgliE8iNdQDcOwtp6Xdnbs7u2ap//eW88h+QLS7Y6LIwJptjY8tPxK/O0QI4taMCRA81DrkDsARYEA9DvBvbfgZfPD8AZdjt1rOjqgeAAAAAElFTkSuQmCC) no-repeat;'>" +
                            tipData +
                            "家</div>"
                        );
                    },
                    position: function(point, params, dom, rect, size) {
                        // 固定在顶部
                        return [point[0], point[1] - 30];
                    }
                },
                title: {
                    text: "",
                    left: "5%",
                    top: "0%"
                },
                grid: {
                    left: '10',
                    right: 70,
                    top: "2%",
                    bottom: "0",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "value",
                        name: "",
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "category",
                        inverse: true,
                        axisLabel: {
                            color: "#529F15",
                            fontSize: "14",
                            margin: 20
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        data: this.qData
                    },
                    {
                        type: "category",
                        inverse: true,
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        data: this.eData
                    }
                ],
                series: [
                    {
                        name: "",
                        type: "bar",
                        data: that.eData,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        barWidth: "20",
                        itemStyle: {
                            color: function(params) {
                                var colorList = [  ["#529F15", "#75DA25"], ["#FF8226", "#FFB026"], ["#FF1717", "#FF8282"] ];
                                let tst = that.rateData[params.dataIndex];
                                if(params.data < 100){
                                    return new echarts.graphic.LinearGradient(
                                        0,  0,  0, 1,
                                        [{
                                            offset: 0,
                                            color: colorList[1][0]
                                        }, {
                                            offset: 1,
                                            color: colorList[1][1]
                                        }]
                                    );
                                } else {
                                    return new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [{
                                            offset: 0,
                                            color: colorList[0][0]
                                        }, {
                                            offset: 1,
                                            color: colorList[0][1]
                                        }]
                                    );
                                }
                                // 2020年1月1日 李鹏飞策略  达到100%为绿色，未达到100%为橙色 
                                // 其实就是分成已完成、未完成两个颜色
                                // if (params.data < 25 || params.data == 25) {
                                //     return new echarts.graphic.LinearGradient(
                                //         0, 0, 0, 1,
                                //         [{
                                //             offset: 0,
                                //             color: colorList[0][0]
                                //         }, {
                                //             offset: 1,
                                //             color: colorList[0][1]
                                //         }]
                                //     );
                                // } else if ( (params.data < 50 && params.data > 25) || params.data == 50 ) {
                                //     return new echarts.graphic.LinearGradient(
                                //         0,  0,  0, 1,
                                //         [{
                                //             offset: 0,
                                //             color: colorList[1][0]
                                //         }, {
                                //             offset: 1,
                                //             color: colorList[1][1]
                                //         }]
                                //     );
                                // } else {
                                //     return new echarts.graphic.LinearGradient(
                                //         0, 0, 0, 1,
                                //         [{
                                //             offset: 0,
                                //             color: colorList[2][0]
                                //         }, {
                                //             offset: 1,
                                //             color: colorList[2][1]
                                //         }]
                                //     );
                                // }
                            },
                            barBorderRadius: 13
                        }
                    },
                    {
                        type: "bar",
                        barWidth: 20,
                        xAxisIndex: 0,
                        barGap: "-100%",
                        data: [
                            100,
                            100,
                            100,
                            100,
                            100,
                            100,
                            100,
                            100,
                            100,
                            100,
                            100
                        ],
                        tooltip:{
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: "#EFEFEF",
                                barBorderRadius: 14
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "right",
                                color: "#529F15",
                                fontSize: 14,
                                formatter: function(param) {
                                    return that.rateData[param.dataIndex];
                                }
                            }
                        },
                        emphasis:{
                            itemStyle: {
                                color: "#EFEFEF",
                                barBorderRadius: 14
                            },
                            label: {
                                show: false
                            },
                        },
                        zlevel: -1
                    }
                ]
            };
            pieChart.setOption(pieOpt, true);
        },
        getData(){
            let para = {};
            get_netWorkRank(para).then(rest=>{
                if(rest.data.code + '' === '0'){
                    let tmp = rest.data.result;
                    let qx = [];
                    let value = [];
                    let rate = [];
                    let jisuan = [];
                    tmp.forEach((item,index)=>{
                        qx.push(item.regionName);
                        value.push(item.lwNum);
                        // let total = parseInt(item.total,10);
                        let a = 100/item.totalCompanyQuantity*item.lwNum;
                        if(a>100){
                            a = 100;
                        }
                        jisuan.push(a);
                        rate.push(item.lwRate);
                    })
                    this.zsData = value;
                    this.eData = jisuan;
                    this.qData = qx;
                    this.rateData = rate;
                    this.initLinePie();
                }else{
                    this.$message.error(rest.data.message || '请稍后再试~');
                }
            })
        }
    },
    mounted() {
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
    padding-right: 0;
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