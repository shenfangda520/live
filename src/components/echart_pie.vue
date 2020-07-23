<template>
    <div :id="domId" style="height: 100%"></div>
</template>

<script>
import echarts from "echarts";
export default {
    props: {
        pieData: {
            type: Array
        },
        domId: {
            type: String
        }
    },
    data() {
        return {
            pieDataNew: []
        };
    },
    methods: {
        initMeterPie() {
            let that = this;
            let pieDom = document.getElementById(this.domId);
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
                    orient: "vertical",
                    itemWidth: 30,
                    itemHeight: 12,
                    right: 22,
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
                                width: 90
                            },
                            b: {
                                align:"right",
                                fontWeight: "bold",
                                width: 60
                            }
                        }
                    },
                    formatter: name => {
                        let total = 0;
                        let target;
                        for (let i = 0; i < data.length; i++) {
                            total += data[i].value;
                            if (data[i].name === name) {
                                target = data[i].value;
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
                        radius: "60%",
                        center: ["35%", "50%"],

                        data: data,
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
        }
    },
    mounted() {
        this.pieDataNew = this.pieData;
        this.initMeterPie();
    },
    watch: {
        pieData: {
            handler: function(newValue, oldValue) {
                console.log(newValue, "---333---", oldValue);
                if (newValue) {
                    this.pieDataNew = newValue;
                    this.initMeterPie();
                }
            },
            deep: true
        }
    }
};
</script>


