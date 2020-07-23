<template>

    <div class="ydlTrendDiaBox">
        <section v-model="filters" class="filter_box">
            <div class="meter_select" >
                <span>区域选择</span>
                <el-select v-model="filters.countyCode" @change="quxianChange" placeholder="请选择">
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
            </div>
            <div class="meter_select">
                <span>乡镇选择</span>
                <el-select v-model="filters.townCode" @change="xzChange" placeholder="请选择">
                    <el-option label="--" value=""></el-option>
                    <el-option
                        v-for="item in xzOptions"
                        :key="item.regionCode"
                        :label="item.regionName"
                        :value="item.regionCode">
                    </el-option>
                </el-select>
                <span>企业名称</span>
                <el-input v-model="filters.comName"></el-input>
                <el-button @click="goToSearch">查询</el-button>
                <el-button type="primary" @click="exportList">导出</el-button>
            </div>
        </section>
        <div class="meter_table_green">
            <el-table :data="tableData1" stripe  @cell-click="lineTableClick" @sort-change="tableDataChange">
                

                    <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                    <el-table-column property="comName" label="企业名称" width="200" align="center">
                        <template slot-scope="scope">
                            <span :title="scope.row.comName">{{scope.row.comName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="sumele" label="用电量(度)" align="center"></el-table-column>
                    <el-table-column property="avgele" sortable="custom" :label="'日均用电量 \n (度)'"  align="center"></el-table-column>
                    <el-table-column property="rhbStr" sortable="custom" align="center" :label="'同前一日 \n 环比变化'" ></el-table-column>
                    <el-table-column property="zhbStr" sortable="custom" align="center" :label="'同前一周均 \n 值环比变化'" ></el-table-column>
                    <el-table-column property="yhbStr" sortable="custom" align="center":label="'同前一月均 \n 值环比变化'" ></el-table-column>
                    <el-table-column property="sdhbStr" sortable="custom" align="center" :label="'时段均值 \n 环比变化'" ></el-table-column>
            </el-table>
            <div class="meter-pagerbox eLine_page">
                <el-pagination
                    @current-change="pageChange"
                    :current-page.sync="lpage"
                    :page-size="lpageSize"
                    layout="total, prev, pager, next"
                    :total="lpageTotal"
                ></el-pagination>
            </div> 
        </div>
        
       


        <!-- 趋势图表格弹窗 -->
        <el-dialog :visible.sync="viewElineTableFlag" :append-to-body="true" width="1184px" class="meter_dialog">
            <h2 slot="title"> </h2>
            <div class="meter_select meter_detail_btnbox" style="padding-top: 35px;">
                <el-button  type="primary" @click="exportDetail">导出</el-button>
                <el-button  @click="goToBack">返回</el-button>
            </div>
            <div class="meter_table_green">
                <el-table :data="tableData"  @sort-change="detailDataChange">
                    <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                    <el-table-column prop="comName" label="企业名称" align="center"></el-table-column>
                    <el-table-column prop="dateTime" label="时间" align="center" width="120"></el-table-column>
                    <el-table-column prop="numele" align="center"  sortable="custom" :label="'日用电量\n(度)'" width="130"></el-table-column>
                    <el-table-column prop="rhbStr"  align="center" :label="'同前一日 \n 环比变化'" width="130"></el-table-column>
                    <el-table-column prop="zhbStr" align="center" :label="'同前一周均 \n 值环比变化'" width="130"></el-table-column>
                    <el-table-column prop="yhbStr" align="center" :label="'同前一月均 \n 值环比变化'" width="140"></el-table-column>
                    <el-table-column prop="sdhbStr"  align="center" :label="'时段均值 \n 环比变化'" width="140"></el-table-column>
                </el-table>
                
            </div>
            <div class="meter-pagerbox eLine_page">
                <el-pagination
                    @current-change="pageDetailChange"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="pageTotal"
                ></el-pagination>
            </div> 
            <h2 class="secondTitle">  <em></em> 变化趋势 </h2>
            <div class="eLine_charts">
                <div class="charts_box">
                    <div id="line_tendency" class="line_tendency_box" style="height: 450px"></div>
                </div>
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
    get_companyEleTatistical,
    get_lfRelationList,
    get_companyElecTatisticalDetail,
    get_companyElecTatisticalDetailZxt,
    get_townByCounty
} from "../api/api";
import meterPie from "@/components/echart_pie";
import greenLine from "@/components/green_line";
import eLine from "../components/echarts_line.vue"
export default {
    props: { },
    data() {
        return {
            clickId:'',
            lfOptions: [],
            xzOptions: [],
            date1:[],
            date2:[],
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
            filters:{
                start: '',
                end:'',
                hbstart: '',
                hbend: '',
                townCode:'',
                comName:'',
                countyCode:'1310',
                type: '1',
                zd:'0',
               
            },
            tableData1: [],
            lpage: 1,
            lpageSize: 10,
            lpageTotal: 0,
            tableData:[],


            page: 1,
            pageSize: 10,
            pageTotal: 134,
            viewElineTableFlag: false,
           
           
            detailFilter:{
                type: '0',
                zd:'0'
            }
        };
    },
    methods: {
        pageChange(val) {
            this.lpage = val;
            this.getTableDatalist();
        },
        pageDetailChange(val){
            this.page = val;
            this.getListDetail();
        },
        quxianChange(val){
            this.filters.regioncode = val;
            this.filters.townCode = '';
            this.getXzListData();
            this.getTableDatalist();
        },
        xzChange(val){
            this.filters.towncode = val;
            this.getTableDatalist();
        },
       
        initLineTendency(result){
            let qushiDom = document.getElementById("line_tendency");
            let qushiChart = this.$echarts.init(qushiDom);
            let option = {
                color: ['#97CFA2','#176661','#49FCF8','#1BAAE9','#F9F248','#E62767','#403C80','#881752','#313591','#F39F12','#3E1155'],
                legend: {
                    show: false
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
                series: [{
                    data: result.values,
                    type: 'line'
                }]
            }
            qushiChart.setOption(option, true);
        },
        lineTableClick(row){
            // console.log(row);
            this.clickId = row.comId;
            this.viewElineTableFlag = true;
            // this.$emit('viewYdlTrendDiaClose');
            this.getListDetail();
            this.getTrendLineData();
        },
        goToBack(){
            this.viewElineTableFlag = false;
           
            this.getTableDatalist();
        },
        goToSearch(){
            this.lpage = 1;
            this.getTableDatalist();
            
        },
        // 获取趋势图数据
        getTrendLineData(){
            let para = {
                start: this.date1[0],
                end: this.date1[1],
                comId: this.clickId
            };
            let that = this;
            get_companyElecTatisticalDetailZxt(para).then(res=>{
                if(res.data.code + '' === '0'){
                    that.initLineTendency(res.data.result);
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        // 列表排序
        tableDataChange(col){
            // 排序字段 0日均用电（默认） 1日环比变化 2周环比变化 3月环比变化 4时段均值环比变化
            if(col.prop=='rhbStr'){
                this.filters.zd = '1';
            }else if(col.prop=='zhbStr'){
                this.filters.zd ='2';
            }else if(col.prop=='yhbStr'){
                this.filters.zd = '3';
            }else if(col.prop=='sdhbStr'){
                this.filters.zd = '4';
            }else{
                this.filters.zd = '0';
            }
            if(col.order=='ascending'){
                this.filters.type = '0';
            } else{
                this.filters.type = '1';
            }
            this.getTableDatalist();
        },
        // 详情排序
        detailDataChange(col){
            // 排序字段 0日均用电（默认） 1日环比变化 2周环比变化 3月环比变化 4时段均值环比变化
            this.detailFilter.zd = '1';
            if(col.order=='ascending'){
                this.detailFilter.type = '0';
            } else{
                this.detailFilter.type = '1';
            }
            this.getListDetail();
        },
        // 获取table列表数据
        getTableDatalist(){
            let para = Object.assign({}, this.filters);
            if(this.date2){
                para.hbstart = this.date2[0];
                para.hbend = this.date2[1];
            }else{
                this.$message.success( '请选择环比时段');
                return false;
            }
            if(this.date1){
                para.start = this.date1[0];
                para.end = this.date1[1];
            }else{
                para.start = '';
                para.end = '';
            }
            para.pageNum = this.lpage;
            para.pageSize = this.lpageSize;
            let that = this;
            get_companyEleTatistical(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.tableData1 = res.data.result.list;
                    this.lpageTotal = res.data.result.total;
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
        // 获取乡镇数据
        getXzListData(){
            let para = {
                countycode: this.filters.regioncode
            };
            get_townByCounty(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.xzOptions = res.data.result;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        // 获取详情
        getListDetail(code){
            let para = {
                end: this.date1[1],
                start: this.date1[0],
                hbstart: this.date2[0],
                hbend: this.date2[1],
                pageNum: this.page,
                pageSize: this.pageSize,
                comId: this.clickId,
                type: this.detailFilter.type,
                zd: this.detailFilter.zd
            };
            get_companyElecTatisticalDetail(para).then(res=>{
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
            let url = URLHOST + '/electric/exportCompanyElectricsTatistical?start=' + this.date1[0] + '&end=' + this.date1[1] + '&comName=' + this.filters.comName + '&countyCode=' + this.filters.countyCode + '&townCode=' + this.filters.townCode +'&hbstart=' + this.date2[0] + '&hbend=' + this.date2[1];
            window.location.href = url;
        },
        exportDetail(){
            let url = URLHOST + '/electric/exportCompanyElectricsTatisticalDetail?start=' + this.date1[0] + '&end=' + this.date1[1] + '&comId=' + this.clickId + '&hbstart'+ this.date2[0] + '&hbend' + this.date2[1];
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
    }
};
</script>
<style lang="scss" scoped>
.ydlTrendDiaBox{
    padding: 0 10px;
    .meter_select{
        .el-select{
            flex-shrink: 0;
        }
        .el-input{
            width: 200px;
        }
    }
}
</style>