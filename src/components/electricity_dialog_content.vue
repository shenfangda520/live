<template>
    <div class="ydlTrendDiaBox">
        <div class="meter_select" v-model="filters">
            <span>区域选择</span>
            <el-select v-model="filters.regioncode" @change="areaChange" placeholder="请选择">
                <el-option
                    v-for="item in lfOptions"
                    :key="item.regionCode"
                    :label="item.regionName"
                    :value="item.regionCode">
                </el-option>
            </el-select>
            <span>时间选择</span>
            <div class="meter_date">
                <el-date-picker
                    v-model="date1"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="_"
                    :picker-options="pickerOptions"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <span>环比时段</span>
            <div class="meter_date">
                <el-date-picker
                    v-model="date2"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="_"
                    :picker-options="pickerOptions"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button @click="goToSearch">查询</el-button>
            <el-button type="primary" @click="exportList">导出</el-button>
        </div>
        <div class="meter_table_green">
            <el-table :data="tableData1"  stripe @cell-click="lineTableClick" @sort-change="tableDataChange">
                <el-table-column type="index" label="序号" width="80" align="center">
                  
                </el-table-column>
                <el-table-column property="regionName" label="区域" align="center">
                    <template slot-scope="scope">
                        <span :title="scope.row.regionName">{{scope.row.regionName}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="companyQuantity" label="企业数量"  align="center"></el-table-column>
                <el-table-column property="dayAvgQuantity" sortable="custom" :label="'日均用\n电量(度)'" width="140" align="center"></el-table-column>
                <el-table-column property="dayRatio" sortable="custom" :label="'同前一日\n环比变化'" width="140" align="center"></el-table-column>
                <el-table-column property="weekRatio" sortable="custom" :label="'同前一周均值\n环比变化'" width="140" align="center"></el-table-column>
                <el-table-column property="periodRatio" sortable="custom" :label="'同时段均值\n环比变化'" width="140" align="center"></el-table-column>
                <el-table-column property="totalQuantity" label="用电总量(度)" width="140" align="center"></el-table-column>
                <el-table-column property="totalRatio" label="电量占比" width="120" align="center"></el-table-column>
            </el-table>
        </div>
        <h2 class="secondTitle">
            <em></em>
            变化趋势
        </h2>
        <div class="eLine_charts">
            <div class="charts_box">
                <div id="line_tendency" class="line_tendency_box" style="height: 450px"></div>
            </div>
        </div>


        <!-- 趋势图表格弹窗 -->
        <el-dialog :visible.sync="viewElineTableFlag" :append-to-body="true" width="1184px" class="meter_dialog">
            <h2 slot="title"> </h2>
            <div class="meter_select meter_detail_btnbox" style="padding-top: 35px;">
               
                    <!-- <el-button>查询</el-button> -->
                    <el-button  type="primary" @click="exportDetail">导出</el-button>
                    <el-button  @click="goToBack">返回</el-button>
                
            </div>
            <div class="meter_table_green">
                <el-table :data="tableData" @sort-change="detailDataChange">
                    <el-table-column type="index" label="序号" width="60"  align="center"></el-table-column>
                    <el-table-column property="regionName" label="区域"  align="center">
                        <template slot-scope="scope">
                            <span :title="scope.row.regionName">{{scope.row.regionName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="staticsDate" label="时间"  align="center"></el-table-column>
                    <el-table-column property="dayAvgQuantity"  align="center" label="日用电量(度)" width="140"></el-table-column>
                    <el-table-column property="dayRatio"  align="center" sortable="custom" :label="'同前一日 \n 环比变化'" width="140"></el-table-column>
                    <el-table-column property="weekRatio"  align="center" sortable="custom" :label="'同前一周均 \n 值环比变化'" width="140"></el-table-column>
                    <el-table-column property="monthRatio"  align="center" sortable="custom" :label="'同前一月均 \n 值环比变化'" width="140"></el-table-column>
                    <el-table-column property="periodRatio"  align="center" sortable="custom" :label="'时段均值 \n 环比变化'" width="140"></el-table-column>
                </el-table>
                
            </div>
            <div class="meter-pagerbox eLine_page">
                <el-pagination
                    @current-change="pageChange"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="pageTotal"
                ></el-pagination>
            </div> 
        </el-dialog>
    </div>
</template>

<script>
var URLHOST = "http://120.52.96.42:8080";
if(process.env.BASE_API === 'prod'){
    URLHOST = "http://" + window.location.hostname + ":8198";
}
import {
    get_trendElectricDiaDataList,
    get_trendElectricDiaTrendLine,
    get_lfRelationList,
    get_electricStatisticsDataDetail
} from "../api/api";
import meterPie from "@/components/echart_pie";
import greenLine from "@/components/green_line";
import eLine from "../components/echarts_line.vue"
export default {
    props: { },
    data() {
        return {
            clickCode: '',
            lfOptions: '',
            date1:[],
            pickerMinDate: '',
            pickerOptions: {
                onPick: ({maxDate, minDate}) => {
                    this.pickerMinDate = minDate.getTime()
                    if (maxDate) {
                        this.pickerMinDate = ''
                    }
                },
                disabledDate: (time) => {
                    if (this.pickerMinDate !== '') {
                        const day30 = (30 - 1) * 24 * 3600 * 1000
                        let maxTime = this.pickerMinDate + day30
                        if (maxTime > (new Date().getTime() - 24*3600*1000)) {
                            maxTime = new Date().getTime() - 24*3600*1000
                        }
                        return time.getTime() > maxTime
                    }
                    return time.getTime() > (Date.now() - 24*3600*1000)
                }
            },
            date2:[],
            filters:{
                startdate: '',
                enddate:'',
                startperiod: '',
                endperiod: '',
                regioncode: '1310',
                sortfields:'dayRatio',
                sorttype:'asc'
            },
            tableData1: [],
            tableDataLast:[],
            tableData:[],
            page: 1,
            pageSize: 8,
            pageTotal: 134,
            viewElineTableFlag: false,
            lineInput: '',
            lineValue: '',
            lineDateValue: '',
            detailFilter:{
                sortfields: '',
                sorttype:''
            }
        };
    },
    methods: {
        pageChange(val) {
            this.page = val;
            this.getListDetail();
        },
        areaChange(val){
            this.filters.regioncode = val;
            this.getTableDatalist();
            this.getTrendLineData();
        },
        initLineTendency(result){
            let qushiDom = document.getElementById("line_tendency");
            let qushiChart = this.$echarts.init(qushiDom);
            let data = result.values.map((item,index)=>{
                return {
                    name: item.name,
                    type: "line",
                    showSymbol: false,
                    data: item.data
                }
            });
            let option = {
                color: ['#97CFA2','#176661','#49FCF8','#1BAAE9','#F9F248','#E62767','#403C80','#881752','#313591','#F39F12','#3E1155'],
                legend: {
                    itemWidth: 25, //图例的宽度
                    itemHeight: 3, //图例的高度
                    itemGap: 15,
                    top:'0',
                    left: "0",
                     width: '100%',
                    top: "0",
                    align: 'right',
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#529F15',
                    },
                    icon:"roundRect",
                    data: result.dataType, // ['安次区','广阳区'] 多少条线  对应的区县
                },
                grid: {
                    left: "10",
                    right: "20",
                    bottom: "20",
                    containLabel: true,
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "line"
                    }
                },
                xAxis: {
                    data: result.names, // ["12.1", "12.2", "12.3", "12.7"] x横轴坐标
                    axisTick: {
                        alignWithLabel: true,
                        show: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#979797",
                        }
                    },
                    axisLabel: {
                        interval:0,
                        color: '#529F15',
                    },
                },
                yAxis: {
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#529F15',
                    }
                },
                series: data
            }
            qushiChart.setOption(option, true);
        },
        lineTableClick(row){
            console.log(row);
            this.clickCode = row.regionCode;
            this.viewElineTableFlag = true;
            this.$emit('viewYdlTrendDiaClose');
            this.getListDetail();
        },
        goToBack(){
            this.viewElineTableFlag = false;
            this.$emit('viewEline');
            this.getTrendLineData();
            this.getTableDatalist();
        },
        goToSearch(){
            this.getTableDatalist();
            this.getTrendLineData();
        },
        // 获取趋势图数据
        getTrendLineData(){
            let para = {
                startdate: this.date1[0],
                enddate: this.date1[1],
                regioncode: this.filters.regioncode
            };
            let that = this;
            get_trendElectricDiaTrendLine(para).then(res=>{
                if(res.data.code + '' === '0'){
                    that.initLineTendency(res.data.result);
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        // 列表排序
        tableDataChange(col){
            
            this.filters.sortfields = col.prop;
            if(col.order=='ascending'){
                this.filters.sorttype = 'asc';
            } else{
                this.filters.sorttype = 'desc';
            }
            this.getTableDatalist();
        },
        // 详情排序
        detailDataChange(col){
            this.detailFilter.sortfields = col.prop;
            if(col.order=='ascending'){
                this.detailFilter.sorttype = 'asc';
            } else{
                this.detailFilter.sorttype = 'desc';
            }
            this.getListDetail();
            
        },
        // 获取table列表数据
        getTableDatalist(){
            let para = Object.assign({}, this.filters);
            if(this.date2){
                para.startperiod = this.date2[0];
                para.endperiod = this.date2[1];
            }else{
                this.$message.success( '请选择环比时段');
                return false;
            }
            if(this.date1){
                para.startdate = this.date1[0];
                para.enddate = this.date1[1];
            }else{
                para.startdate = '';
                para.enddate = '';
            }
           let that = this;
            get_trendElectricDiaDataList(para).then(res=>{
                if(res.data.code + '' === '0'){
                    // let tmp = res.data.result;
                    // let c = tmp.pop();
                    // let last = [];
                    // last.push(c);
                    // this.tableData1 = tmp;
                    // this.tableDataLast = last;
                    this.tableData1 = res.data.result;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        // 获取区县数据
        getQxListData(){
            let para = {};
            get_lfRelationList(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.lfOptions = res.data.result;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        // 获取详情
        getListDetail(code){
            let para = {
                enddate: this.date1[1],
                endperiod:this.date2[1],
                regioncode: this.clickCode,
                startdate: this.date1[0],
                startperiod:this.date2[0],
                page: this.page,
                pageSize: this.pageSize,
                sortfields: this.detailFilter.sortfields,
                sorttype: this.detailFilter.sorttype
            };
            get_electricStatisticsDataDetail(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.tableData = res.data.result.list;
                    this.pageTotal = res.data.result.total;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })   
        },
        // 导出列表和导出详情
        exportList(){
            let url = URLHOST + '/electric/ElectricStatisticsDataListExportXls?startdate=' + this.date1[0] + '&enddate=' + this.date1[1] + '&startperiod=' + this.date2[0] + '&endperiod=' + this.date2[1] + '&page=' + this.page+  '&regioncode=' +this.filters.regioncode;
            window.location.href = url;
        },
        exportDetail(){
            let url = URLHOST + '/electric/ElectricStatisticsDataDetailExportXls?startdate=' + this.date1[0] + '&enddate=' + this.date1[1] + '&startperiod=' + this.date2[0] + '&endperiod=' + this.date2[1] + '&page=' + this.page+  '&regioncode=' +this.clickCode +'&pageSize=' + this.pageSize;
            window.location.href = url;
        }
    },
    mounted() {
        let now = new Date().getTime() - 24*1000*3600;
        let end = new Date(now);
        let e = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
        let start = new Date(end.getTime() - 6*24*3600*1000);
        let s = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
        this.date1 = [s, e];
        this.date2 = [s, e];
        this.getQxListData();
        this.getTableDatalist();
        this.getTrendLineData();
    }
};
</script>
<style lang="scss" scoped>
.ydlTrendDiaBox{
    padding: 0 10px;
}
</style>