<template>
    <div class="ydlTrendDiaBox">
        <div class="meter_select">
            <span>区域选择</span>
            <el-select v-model="filters.regionCode" @change="areaChange" placeholder="请选择">
                <el-option
                    v-for="item in lfOptions"
                    :key="item.regionCode"
                    :label="item.regionName"
                    :value="item.regionCode"
                ></el-option>
            </el-select>
            <span>时间</span>
            <div class="meter_date">
                <el-date-picker
                    v-model="date1"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="_"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </div>

            <el-button @click="goToSearch">查询</el-button>
            <el-button type="primary" @click="exportList">导出</el-button>
        </div>
        <div class="meter_table_green">
            <el-table :data="tableData" stripe>
                <el-table-column property="index" label="序号" width="80" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.$index===tableData.length-1">合计</span>
                        <span v-else>{{scope.$index+1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="regionName" label="区域" align="center"></el-table-column>
                <el-table-column property="companyNum" label="企业数量" align="center"></el-table-column>
                <el-table-column property="alertCompanyNum" label="报警企业数量" align="center"></el-table-column>
                <el-table-column property="dod" label="环比变化率" align="center"></el-table-column>
                <el-table-column property="alertNum" label="报警次数" align="center"></el-table-column>
                <el-table-column property="alertCompanyRatio" label="报警占比" align="center"></el-table-column>
            </el-table>
        </div>
        <h2 class="secondTitle">
            <em></em>
            变化趋势
        </h2>
        <div class="eLine_charts">
            <div class="charts_box">
                <div id="line_tendency2" class="line_tendency_box" style="height: 450px"></div>
            </div>
        </div>
    </div>
</template>

<script>
var URLHOST = "http://120.52.96.42:8080";
if (process.env.BASE_API === "prod") {
    URLHOST = "http://" + window.location.hostname + ":8198";
}
import {
    get_alertCompanyQueryList,
    get_lfRelationList,
    get_alertCompanyQueryLineChartByCounty
} from "../api/api";
import meterPie from "@/components/echart_pie";
import greenLine from "@/components/green_line";
import eLine from "../components/echarts_line.vue";
export default {
    props: {},
    data() {
        return {
            lfOptions: [],
            filters: {
                regionCode: "1310"
            },
            date1: [],
            pickerMinDate: "",
            pickerOptions: {
                onPick: ({ maxDate, minDate }) => {
                    this.pickerMinDate = minDate.getTime();
                    if (maxDate) {
                        this.pickerMinDate = "";
                    }
                },
                disabledDate: time => {
                    if (this.pickerMinDate !== "") {
                        const day30 = (30 - 1) * 24 * 3600 * 1000;
                        let maxTime = this.pickerMinDate + day30;
                        if (maxTime > new Date().getTime() - 24 * 3600 * 1000) {
                            maxTime = new Date().getTime() - 24 * 3600 * 1000;
                        }
                        return time.getTime() > maxTime;
                    }
                    return time.getTime() > Date.now() - 24 * 3600 * 1000;
                }
            },
            tableData: []
        };
    },
    methods: {
        areaChange(val) {
            this.filters.regionCode = val;
            this.getList();
            this.getTrendLineData();
        },
        qxYdDiaBjChange(val) {
            this.qxYdDiaBjPage = val;
        },
        initLineTendency(result) {
            let qushiDom = document.getElementById("line_tendency2");
            let qushiChart = this.$echarts.init(qushiDom);
            let data = result.values.map((item, index) => {
                return {
                    name: item.name,
                    type: "line",
                    showSymbol: false,
                    data: item.data
                };
            });
            let option = {
                color: [
                    "#97CFA2",
                    "#176661",
                    "#49FCF8",
                    "#1BAAE9",
                    "#F9F248",
                    "#E62767",
                    "#403C80",
                    "#881752",
                    "#313591",
                    "#F39F12",
                    "#3E1155"
                ],
                legend: {
                    itemWidth: 25, //图例的宽度
                    itemHeight: 3, //图例的高度
                    itemGap: 15,
                    left: "0",
                    top: "0",
                    top: "0",
                    width: "100%",
                    align: "right",
                    zlevel: 3,
                    backgroundColor: "#fff",
                    textStyle: {
                        color: "#529F15"
                    },
                    icon: "roundRect",
                    data: result.dataType
                },
                grid: {
                    left: "10",
                    right: "20",
                    bottom: "20",
                    containLabel: true
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "line"
                    }
                },
                xAxis: {
                    data: result.names,
                    axisTick: {
                        alignWithLabel: true,
                        show: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#979797"
                        }
                    },
                    axisLabel: {
                        color: "#529F15"
                    }
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#529F15"
                    }
                },
                series: data
            };

            qushiChart.showLoading();

            setTimeout(() => {
                // setOption前隐藏loading事件
                qushiChart.hideLoading();
                qushiChart.setOption(option, true);
            }, 1000);
        },
        goToSearch() {
            this.getList();
            this.getTrendLineData();
        },
        // 获取应激状态
        getList() {
            let para = Object.assign({}, this.filters);
            if (this.date1) {
                para.beginDate = this.date1[0];
                para.endDate = this.date1[1];
            } else {
                para.beginDate = "";
                para.endDate = "";
            }

            get_alertCompanyQueryList(para).then(res => {
                if (res.data.code + "" === "0") {
                    this.tableData = res.data.result;
                    console.log(this.tableData)
                } else {
                    this.$message.error(res.data.message || "请稍后再试~");
                }
            });
        },
        // 获取区县数据
        getQxListData() {
            let para = {};
            get_lfRelationList(para).then(res => {
                if (res.data.code + "" === "0") {
                    this.lfOptions = res.data.result;
                } else {
                    this.$message.error(res.data.message || "请稍后再试~");
                }
            });
        },
        // 获取趋势图数据
        getTrendLineData() {
            let para = {
                startdate: this.date1[0],
                enddate: this.date1[1],
                regioncode: this.filters.regionCode
            };
            let that = this;
            let qushiDom = document.getElementById("line_tendency2");
            let qushiChart = this.$echarts.init(qushiDom);
            qushiChart.showLoading({
                text: "loading",
                color: "#0091FF",
                fontSize: "14px",
                textColor: "#000",
                maskColor: "rgba(255, 255, 255, 0.2)",
                zlevel: 0
            });
            get_alertCompanyQueryLineChartByCounty(para).then(res => {
                if (res.data.code + "" === "0") {
                    //this.initLineTendency(res.data.result);
                    var result = res.data.result;
                    let data = result.values.map((item, index) => {
                        return {
                            name: item.name,
                            type: "line",
                            showSymbol: false,
                            data: item.data
                        };
                    });
                    let option = {
                        color: [
                            "#97CFA2",
                            "#176661",
                            "#49FCF8",
                            "#1BAAE9",
                            "#F9F248",
                            "#E62767",
                            "#403C80",
                            "#881752",
                            "#313591",
                            "#F39F12",
                            "#3E1155"
                        ],
                        legend: {
                            itemWidth: 25, //图例的宽度
                            itemHeight: 3, //图例的高度
                            itemGap: 15,
                            left: "0",
                            top: "0",
                            top: "0",
                            width: "100%",
                            align: "right",
                            zlevel: 3,
                            backgroundColor: "#fff",
                            textStyle: {
                                color: "#529F15"
                            },
                            icon: "roundRect",
                            data: result.dataType
                        },
                        grid: {
                            left: "10",
                            right: "20",
                            bottom: "20",
                            containLabel: true
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "line"
                            }
                        },
                        xAxis: {
                            data: result.names,
                            axisTick: {
                                alignWithLabel: true,
                                show: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#979797"
                                }
                            },
                            axisLabel: {
                                color: "#529F15"
                            }
                        },
                        yAxis: {
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                color: "#529F15"
                            }
                        },
                        series: data
                    };
                    qushiChart.hideLoading();
                    qushiChart.setOption(option, true);
                } else {
                    this.$message.error(res.data.message || "请稍后再试~");
                }
            });
        },
        exportList() {
            let url =
                URLHOST +
                "/electric/alertCompanyQueryListExportXls?beginDate=" +
                this.date1[0] +
                "&endDate=" +
                this.date1[1] +
                "&regionCode=" +
                this.filters.regionCode;
            window.location.href = url;
        }
    },
    mounted() {
        let now = new Date().getTime() - 24 * 1000 * 3600;
        let end = new Date(now);
        let e =
            end.getFullYear() +
            "-" +
            (end.getMonth() + 1) +
            "-" +
            end.getDate();
        let start = new Date(end.getTime() - 6 * 24 * 3600 * 1000);
        let s =
            start.getFullYear() +
            "-" +
            (start.getMonth() + 1) +
            "-" +
            start.getDate();
        this.date1 = [s, e];
        this.getQxListData();
        this.getList();
        this.getTrendLineData();
    }
};
</script>
<style lang="scss" scoped>
.ydlTrendDiaBox {
    padding: 0 10px;
    .meter_select {
        padding: 17px 0 31px 10px;
    }
}
</style>