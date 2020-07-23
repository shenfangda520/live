<template>
    <div class="qxYdDetail_dia">
        <section class="flex_wrap two_flex">
            <div class="module">
                <h3 class="sub_title">
                    <i></i>区域情况汇总
                </h3>
                <section class="dia_area_box">
                    <div class="left">
                        <h4>
                            今日累计用电量
                            <em>(度)</em>
                        </h4>
                        <span>{{tjInfoData.quantity}}</span>
                       <!--  <p>{{name}}企业联网进度</p>
                        <section>
                            <span :style="{width:netData.lwRate}">已联网{{netData.lwRate}}</span>
                        </section> -->
                    </div>
                    <div class="right">
                        <em class="border"></em>
                        <p>
                            同前一天环比变化
                            <span>{{tjInfoData.dayRatio}}</span>
                        </p>
                        <p>
                            同前一周均值环比
                            <span>{{tjInfoData.weekRatio}}</span>
                        </p>
                        <p>
                            同前一月均值环比
                            <span>{{tjInfoData.monthRatio}}</span>
                        </p>
                    </div>
                </section>
            </div>
            <div class="module">
                <h3 class="sub_title">  <i></i>用电量变化趋势 
                <label class="tab">
                    <em :class="typeFlag=='week'?'cur':''" @click="ydlLineSwtich('week')">周</em>
                    <em :class="typeFlag=='month'?'cur':''" @click="ydlLineSwtich('month')">月</em>
                    <em :class="typeFlag=='year'?'cur':''" @click="ydlLineSwtich('year')">年</em>
                </label>
                </h3>
                <section class="ydlhbqu_linebox" id="qxYdDetailDiaYdTrend"></section>
            </div>
        </section>
        <section class="flex_wrap two_flex">
            <div class="module pie_box">
                <h3 class="sub_title">
                    <i></i>用电行业占比
                </h3>
                <em class="border"></em>
                <span class="unit">单位（度）</span>
                <section style="height: 263px;" v-if="vifydl" id="qxYdDetailDiaYdZb"></section>
                <section style="height: 263px;" v-else>
                    <div style="padding: 40px;font-size: 14px;color: #999;text-align: center">暂无数据</div>
                </section>
            </div>
            <div class="module pie_box">
                <em class="border"></em>
                <h3 class="sub_title">
                    <i></i>报警企业行业占比
                </h3>
                <span class="unit">单位（个）</span>
                <section style="height: 263px;" v-if="bjshuju" id="qxYdDetailDiaBjZb"></section>
                <section style="height: 263px;" v-else>
                    <div style="padding: 40px;font-size: 14px;color: #999;text-align: center">暂无数据</div>
                </section>
            </div>
        </section>
        <section class="flex_wrap two_flex">
            <div class="module">
                <h3 class="sub_title">
                    <i></i>企业报警排名
                    <label class="tab">
                        <em :class="bjFlag=='week'?'cur':''" @click="bjSwtich('week')">周</em>
                        <em :class="bjFlag=='month'?'cur':''" @click="bjSwtich('month')">月</em>
                        <em :class="bjFlag=='year'?'cur':''" @click="bjSwtich('year')">年</em>
                    </label>
                </h3>
                <section class="qxyd_dia_table_list">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="rowNo" label="排名" width="80" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.rowNo=='1'" class="one">{{scope.row.rowNo}}</span>
                                <span v-else-if="scope.row.rowNo=='2'" class="two">{{scope.row.rowNo}}</span>
                                <span v-else-if="scope.row.rowNo=='3'" class="three">{{scope.row.rowNo}}</span>
                                <span v-else>{{scope.row.rowNo}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="companyName" label="企业名称">
                            <template slot-scope="scope">
                                <span v-if="scope.row.rowNo=='1'" class="one">{{scope.row.companyName}}</span>
                                <span v-else-if="scope.row.rowNo=='2'" class="two">{{scope.row.companyName}}</span>
                                <span v-else-if="scope.row.rowNo=='3'" class="three">{{scope.row.companyName}}</span>
                                <span v-else>{{scope.row.companyName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="alertQuantity" label="报警次数" width="80" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.rowNo=='1'" class="one">{{scope.row.alertQuantity}}</span>
                                <span v-else-if="scope.row.rowNo=='2'" class="two">{{scope.row.alertQuantity}}</span>
                                <span v-else-if="scope.row.rowNo=='3'" class="three">{{scope.row.alertQuantity}}</span>
                                <span v-else>{{scope.row.alertQuantity}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="meter-pagerbox" v-if="bjTotal>0">
                        <el-pagination
                            @current-change="bjChange"
                            :current-page.sync="bjPage"
                            :page-size="bjPageSize"
                            layout="total, prev, pager, next"
                            :total="bjTotal"
                        ></el-pagination>
                    </div>
                </section>
            </div>
            <div class="module">
                <h3 class="sub_title">
                    <i></i>今日企业报警信息
                </h3>
                <section class="qxyd_dia_table_list">
                    <el-table :data="tableData1" style="width: 100%">
                        <el-table-column prop="rowNo" label="排名" width="60" align="center">
                            
                        </el-table-column>
                        <el-table-column prop="companyName" label="企业名称" >
                            <template slot-scope="scope">
                                <span v-if="scope.row.companyName.length > 12" :title="scope.row.companyName">{{scope.row.companyName}}</span>
                                <span v-else>{{scope.row.companyName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="alertTime" label="报警时间"  width="180" align="center"></el-table-column>
                    </el-table>
                    <div class="meter-pagerbox" v-if="qyTotal>0">
                        <el-pagination
                            @current-change="qyChange"
                            :current-page.sync="qyPage"
                            :page-size="qyPageSize"
                            layout="total, prev, pager, next"
                            :total="qyTotal"
                        ></el-pagination>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>

<script>

import {
    get_dashBoardAlertBjRank,
    get_dashBoardAlertCompanyToday,
    get_dashBoardAlertProportionPie,
    get_dashBoardAtertElectricTj, 
    get_dashBoardAlertYdlHyZbPie,
    get_dashBoardAlertTrendRegion,
    get_dashBoardAlertNetOnlineProgess
} from "../api/api";

export default {
    props: { 
        code:{
            type: String
        },
        name: {
            type: String
        }
    },
    data() {
        return {
            tjInfoData: {
                quantity: 0
            },
            typeFlag: 'week',
            bjFlag: 'week',
            netData:{},
            tableData:[],
            tableData1:[],
            bjPageSize: 4,
            qyPageSize: 4,
            bjPage: 1,
            bjTotal: 0,
            qyPage: 1,
            qyTotal: 0,
            bjshuju:true,
            vifydl:true
        };
    },
    methods: {
        bjChange(val) {
            this.bjPage = val;
            this.getBjHyRankData();
        },
        qyChange(val){
            this.qyPage = val;
            this.getBjQyRankData();
        },
        initqxYdDiaHyZb(pieData) {
            let diaYdZbDom = document.getElementById("qxYdDetailDiaYdZb");
            let diaYdZbChart = this.$echarts.init(diaYdZbDom);
            let data = pieData;
            let zhanbiOpt = {
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
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    itemWidth: 30,
                    itemHeight: 12,
                    right: 42,
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
                                width: 80
                            },
                            b: {
                                align: "right",
                                fontWeight: "bold",
                                width: 50
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
                    // orient: 'vertical',
                    // left: 'right',
                    // data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name: "",
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
            diaYdZbChart.setOption(zhanbiOpt, true);
        },
        initqxYdDiaBjZb(pieData) {
            let diaYdZbDom = document.getElementById("qxYdDetailDiaBjZb");
            let diaYdZbChart = this.$echarts.init(diaYdZbDom);
            let data = pieData;
            let zhanbiOpt = {
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
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    itemWidth: 30,
                    itemHeight: 12,
                    right: 42,
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
                                width: 80
                            },
                            b: {
                                width: 50,
                                align: "right",
                                fontWeight: "bold"
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
                    // orient: 'vertical',
                    // left: 'right',
                    // data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name: "",
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
            diaYdZbChart.setOption(zhanbiOpt, true);
        },
        initYdTrendLine(lineData){
            let that = this;
            let xName = lineData.names;
            let yValue = lineData.values;
            let max = Math.max(...yValue);
            let min = Math.min(...yValue)
            let maxIndex = yValue.indexOf((max+''));
            let minIndex = yValue.indexOf((min+''));
           
            let lineDom = document.getElementById('qxYdDetailDiaYdTrend');
            let lineChart = this.$echarts.init(lineDom);
            let option = {
                tooltip : {
                    trigger: 'axis',
                    formatter: function(params, ticket, callback) {
                        let tipDate = lineData.date[params[0].dataIndex] 
                        let value = params[0].value
                        return "<div>" +tipDate +"用电量："+value+"</div>"
                    } //"{a} <br/>{b} : {c}"
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
                    top: '8%',
                    left: '2%',
                    right: '8%',
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
                        name: '用电量',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        markPoint : {
                            symbol: 
                              'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACW0lEQVQ4jXVTTUhUURg99++9gZRQirBEcwIXatjGaNWiJhhJaZfbFkpIErhq1aJdRBgtgkKjoNq4MjAYY5SKWoS0mDBLsMERIYmwkkLfffe7N+4b/GEmD9zHu49zzvf7mHMOu9H3fKLNmrDfmqDbxGGLpQCWgqI1Kkekxl4Ots7v5m8bXJoeDawJR4wJB60JOZkQFAcgCmFNYgIyyjoKRsmq4fyVoxvbBpff3Q6IUi8oDjOJ0KRAXlRhQt6EFKxRM5ZUd36oRUvvIpS+4xjL+FwcYzhxsBHZ5g6k99f7GFhcW8fE/De8L/2BD8gkzjCwEQBD7GrhWjuZsEAmFD5iz5HT6G3uwv8wPreMJx9WfQawFBKR7ORCRv1CRkLICJ0HGvcUe1zsaMKp5hoIGYNLLbiI+7lQOiukhlARzjWcrBJV4kJbA5jU3sAbZSUXURrJIBya9h2uElTiWH0tfEDPh0Nali+sirgXPNOXy+BAgOZc6KL/4FNa2SztIdtB8fdaYsBFoilxIeNcuZ4Ib9enqgSVmCp9SrhCaQih85xx/ZCLmLjQWIhmMf1zskq0hcnlWRR+LYJ7AxmRkNGYeHVr4fvrjaeHGEOXr7C4+QUrGyuo5XWoEbUgR/j6dxnjS3m8Wf2Y9ICVW3b/WU/f4/ImynjYElodWMa31mfyebWQrDNRqrzOJgSXYaJ0DjNwGPbv3D+u1+U0E/F5LvQ9IWPLVbIo4MrP29dbPlJuWi6jB0JFPY/ODvjx7fyNW7jxo7fdkhogE2SJgrQzgSYTLJFJ5YmCsbvHb85tkwH8A5oqKPJZhVwaAAAAAElFTkSuQmCC',
                           
                            symbolSize: [10, 10],
                            data : [

                                {name : '用电量最大值', value : max, xAxis: maxIndex, yAxis:max},
                                {name : '用电量最小值', value : min, xAxis: minIndex, yAxis: min}
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
                                    offset: 0, color: 'rgba(233,253,218,0.8)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(219,233,252,0.8)'  // 100% 处的颜色
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
                                    offset: 0, color: '#88F639' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#3A88ED' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        data: yValue
                    },
                    {
                        name: '用电量',
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
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(58,136,237,0.6)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(136,246,57,0.6)'
                                }]),
                            }
                        },
                        data: yValue
                    },
                ]

            };
            lineChart.setOption(option, true);
        },
        ydlLineSwtich(type){
            this.typeFlag = type;
            this.getYdlTrendLineData();
        },
        bjSwtich(bjType){
            this.bjFlag = bjType;
            this.getBjHyRankData();
        },
        // 调取
        getTjInfo(){
            let para = {
                regioncode: this.code 
            };
            get_dashBoardAtertElectricTj(para).then(res=>{
                if(res.data.code + '' === '0'){
                    if(res.data.result){
                        this.tjInfoData = res.data.result;
                    }
                    
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        getNetWork(){
            let para = {
                regioncode: this.code
            };
            get_dashBoardAlertNetOnlineProgess(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.netData = res.data.result;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        getYdlTrendLineData(){
            let para = {
                regioncode: this.code,
                flag: this.typeFlag
            };
            get_dashBoardAlertTrendRegion(para).then(res=>{
                if(res.data.code + '' === '0'){

                    this.initYdTrendLine(res.data.result);
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        getYdHyZbPieData(){
            let para = {
                regioncode: this.code
            };
            get_dashBoardAlertYdlHyZbPie(para).then(res=>{
                if(res.data.code + '' === '0'){

                    if(res.data.result&&res.data.result.length>0){
                        this.vifydl = true;
                        this.initqxYdDiaHyZb(res.data.result);
                    }else {
                        this.vifydl = false;
                    }
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        getBjQyZbPieData(){
            let para = {
                regioncode: this.code
            };
            let that = this;
            get_dashBoardAlertProportionPie(para).then(res=>{
                if(res.data.code + '' === '0'){
                    if(res.data.result && res.data.result.length>0){
                        this.bjshuju = true;
                        this.initqxYdDiaBjZb(res.data.result);
                    }else {
                        this.bjshuju = false;
                    }
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        getBjHyRankData(){
            let para = {
                regioncode: this.code ,
                page: this.bjPage,
                pageSize: this.bjPageSize,
                flag: this.bjFlag
            };
            get_dashBoardAlertBjRank(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.tableData = res.data.result.list;
                    this.bjTotal = res.data.result.total;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        getBjQyRankData(){
            let para = {
                regioncode:  this.code,
                page: this.qyPage,
                pageSize: this.qyPageSize
            };
            get_dashBoardAlertCompanyToday(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.tableData1 = res.data.result.list;
                    this.qyTotal = res.data.result.total;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        }
        
    },
    mounted() {
        this.getTjInfo();
        this.getNetWork();
        this.getYdlTrendLineData();
        this.getYdHyZbPieData();
        this.getBjQyZbPieData();
        this.getBjHyRankData();
        this.getBjQyRankData();
    }
};
</script>
<style lang="scss" scoped>
.qxYdDetail_dia {
    padding: 0 30px 40px;
    .two_flex {
        div.module {
            height: 291px;
            margin-top: 0;
            margin-bottom: 20px;
            position: relative;
            
            .dia_area_box {
                font-size: 0;
                padding-top: 28px;
                div {
                    display: inline-block;
                    height: 236px;
                    span {
                        display: block;
                        color: #3e3e3e;
                        font-weight: bold;
                        font-size: 30px;
                        line-height: 30px;
                        white-space: nowrap;
                    }
                    p {
                        font-size: 16px;
                        color: #529f15;
                        line-height: 16px;
                    }
                }
                div.left {
                    width: 56.5%;
                    padding: 56px 30px 0 38px;
                    h4 {
                        font-size: 26px;
                        color: #1d80d5;
                        white-space: nowrap;
                        em {
                            font-size: 14px;
                            color: #3e3e3e;
                        }
                    }
                    span {
                        line-height: 46px;
                        padding: 14px 0 40px;
                        font-size: 46px;
                    }
                    section {
                        width: 100%;
                        margin: 12px auto 0;
                        height: 19px;
                        background: #3e3e3e;
                        border-radius: 9px;
                        span {
                            padding: 0;
                            width: 0;
                            height: 19px;
                            background: linear-gradient(
                                88deg,
                                rgba(93, 207, 255, 1),
                                rgba(36, 119, 232, 1)
                            );
                            border-radius: 9px;
                            font-size: 12px;
                            line-height: 19px;
                            text-align: right;
                            color: #fff;
                        }
                    }
                }
                div.right {
                    width: 43.2%;
                    padding-left: 40px;
                    position: relative;
                    span {
                        padding: 12px 0 18px;
                    }
                    .border {
                        height: 210px;
                        left: -5px;
                    }
                }
            }
            .ydlhbqu_linebox{
                height:250px;
                width: 100%;
            }
            .qxyd_dia_table_list {
                padding: 0 26px 0;
                .meter-pagerbox {
                    padding-top: 14px;
                }
            }
        }
        .pie_box {
            .border {
                // height: 210px;
                // left: 60%;
                // top: 50%;
                // margin-top: -90px;
            } 
            .unit{
                position: absolute;
                right: 15px;
                font-size: 12px;
                color: #B1B5B8;
                padding-top: 10px;
            }
        }
    }
}
</style>
<style>
/**区县今日用电表盘弹窗table**/
.qxyd_dia_table_list {
}
.qxyd_dia_table_list .el-table td,
.qxyd_dia_table_list .el-table th {
    padding: 12px 0 5px;
}
.qxyd_dia_table_list .el-table th .cell {
    font-weight: bold;
}
.qxyd_dia_table_list .el-table .cell .one {
    color: #880a0a;
}
.qxyd_dia_table_list .el-table .cell .two {
    color: #ce0d0d;
}
.qxyd_dia_table_list .el-table .cell .three {
    color: #ff5050;
}
.qxyd_dia_table_list .el-table .cell {
    line-height: 23px;
    font-size: 14px;
    color: #3e3e3e;
    white-space: nowrap;
}
</style>