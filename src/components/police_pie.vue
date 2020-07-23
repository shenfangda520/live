<template>
    <div >
        <div class="child_echart_box">
            <div class="echart_box_item disflex">
              
                <a :class="wym=='week'?'act':''" @click="typeSwtich('week')">周</a>
                <a :class="wym=='month'?'act':''" @click="typeSwtich('month')">月</a>
                <a :class="wym=='year'?'act':''" @click="typeSwtich('year')">年</a>
            </div>
            <div id="baojingPie" style="height:470px;width:100%;"></div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import {get_alertCompanyQuantityProportionInfo} from "../api/api";
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
            let pieDom = document.getElementById('baojingPie');
            let pieChart = this.$echarts.init(pieDom);
            let data = this.pieDataNew;
            let pieOpt = {
                color: [
                    "#91C7AE",
                    "#546570",
                    "#79838A",
                    "#BDA29A",
                    "#CA8622",
                    "#749F83",
                    "#61A0A8",
                    "#2F4554",
                    "#D48265",
                    "#C23531",
                    "#C4CCD3"
                ],

                title: {
                    show: false,
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    orient: "vertical",
                    itemWidth: 30,
                    itemHeight: 12,
                    right: 32,
                 
                    selectedMode: false,
                    borderRadius: 0,
                    borderWidth: 0,
                    top: "middle",
                    padding: [0, 0, 12, 0],
                    textStyle: {
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#529F15",
                        rich: {
                            a: {
                                fontWeight: "bold",
                                width: 60
                            },
                            b: {
                                fontWeight: "bold",
                                align: "right",
                                width: 60
                            }
                        }
                    },
                    formatter: name => {
                        let total = 0;
                        let target;
                        for (let i = 0; i < result.length; i++) {
                            total += result[i].value;
                            if (result[i].name === name) {
                                target = result[i].value;
                            }
                        }
                        let arr = ["{a|" + name + "}{b|" + target + "}"];

                        return arr.join("\n");
                    }
                },
                series: [
                    {
                        name: "用电量占比",
                        type: "pie",
                        radius: "65%",
                        center: ["35%", "50%"],

                        data: result,
                        label: {
                            show: false
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
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
            get_alertCompanyQuantityProportionInfo(para).then(rst=>{
                console.log(rst)
                if(rst.data.code + '' === '0'){
                    let tmp = rst.data.result;
                    if(tmp.length>0){
                        this.initMeterPie(tmp);
                    } 

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
    margin: 16px 0 0px;
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