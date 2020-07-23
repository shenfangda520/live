<template>

    <div class="ydlTrendDiaBox com_bj_listwrap">
        <section v-model="filters" class="filter_box">
            <div class="meter_select" >
                <span>区域选择</span>
                <el-select v-model="filters.regioncode" @change="quxianChange" placeholder="请选择">
                    <el-option
                        v-for="item in lfOptions"
                        :key="item.regionCode"
                        :label="item.regionName"
                        :value="item.regionCode">
                    </el-option>
                </el-select>
                <span>乡镇选择</span>
                <el-select v-model="filters.towncode" @change="xzChange" placeholder="请选择">
                    <el-option label="--" value=""></el-option>
                    <el-option
                        v-for="item in xzOptions"
                        :key="item.regionCode"
                        :label="item.regionName"
                        :value="item.regionCode">
                    </el-option>
                </el-select>
                <span>时间选择</span>
                <div class="meter_date">
                    <el-date-picker
                        v-model="date1"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="_"
                        :picker-options="pickerOptions"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="meter_select">
                <span>报警类型</span>
                <el-select v-model="filters.alarmtype" @change="bjTypeChange" placeholder="请选择">
                    <el-option
                        v-for="item in bjTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span>企业名称</span>
                <el-input v-model="filters.name"></el-input>
                <el-button @click="goToSearch">查询</el-button>
                <el-button type="primary" @click="exportList">导出</el-button>
            </div>
        </section>
        <div class="meter_table_green meter_table_one_title">
            <el-table :data="tableData1" stripe  @cell-click="lineTableClick" @sort-change="tableDataChange">  
                <el-table-column prop="rownum" label="序号" width="80" align="center"></el-table-column>
                <el-table-column prop="companyname" label="企业名称" width="240"  align="center">
                    <template slot-scope="scope">
                        <span :title="scope.row.companyname">{{scope.row.companyname}}</span>
                    </template>
                </el-table-column> 
                <el-table-column prop="region" label="县（市、区）" align="center"></el-table-column>
                <el-table-column prop="town" label="乡镇（街道、园区）" align="center"></el-table-column>
                <el-table-column prop="alarmnum" align="center" sortable="custom" label="报警次数" ></el-table-column>
                <el-table-column prop="bhlstr"  align="center"  sortable="custom" label="环比变化率" ></el-table-column> 
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
                <el-table :data="tableData" >
                    <el-table-column prop="rownum" label="序号" width="60" align="center"></el-table-column>
                    <el-table-column prop="companyname" label="企业名称" align="center"></el-table-column>
                    <el-table-column prop="region" label="县（市、区）" align="center"></el-table-column>
                    <el-table-column prop="town" label="乡镇（街道、园区）" align="center"></el-table-column>
                    <el-table-column prop="alarmtype" align="center" label="报警类型" width="140"></el-table-column>
                    <el-table-column prop="alarmtime"  align="center" label="报警时间" width="200"></el-table-column>
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
            
        </el-dialog>
    </div>
</template>

<script>
var URLHOST = "http://120.52.96.42:8080";
if(process.env.BASE_API === 'prod'){
    URLHOST = "http://" + window.location.hostname + ":8198";
}
import {
    get_lfRelationList,
    get_eleAlertDataAlarmManage,
    get_eleAlertDataAlarmDetail,
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
          
            pickerMinDate: '',
            pickerOptions: {
                onPick: ({maxDate, minDate}) => {
                    this.pickerMinDate = minDate.getTime()
                    if (maxDate) {
                        this.pickerMinDate = ''
                    }
                },
                disabledDate: (time) => {
                    let end = new Date();
                    let e = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' 00:00:00';
                    let endTime = new Date(e).getTime();
                    if (this.pickerMinDate !== '') {
                        const day30 = (30 - 1) * 24 * 3600 * 1000
                        let maxTime = this.pickerMinDate + day30
                        // 2020年1月27日 产品沟通 不能选择 当前日期前一天的23点 原因是当前日期
                        /*if (maxTime > (new Date().getTime() - 24*3600*1000)) {
                            maxTime = new Date().getTime() - 24*3600*1000
                        }*/

                        if (maxTime > endTime) {
                            maxTime = endTime
                        }
                        return time.getTime() > maxTime
                    }
                    // return time.getTime() >= (Date.now() - 24*3600*1000)
                    return time.getTime() >= endTime

                }
            },
            filters:{
                alarmtype:'',
                startdate: '',
                enddate:'',
                towncode:'',
                name:'',
                regioncode:'1310',
                ascnum: '0',// 报警次数排序字段，0-正序 1-倒序
                aschbl:'1', // 环比变化率排序字段，0-正序 1-倒序
            },
            tableData1: [],
            lpage: 1,
            lpageSize: 10,
            lpageTotal: 0,
            tableData:[],
            bjTypes:[{
                label: '全部类型',
                value: ''
            },{
                label: '运行状态报警',
                value: '0'
            },{
                label: '应急响应报警',
                value: '1'
            }],

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
            this.filters.towncode = '';
            this.getXzListData();
            this.getTableDatalist();
        },
        xzChange(val){
            this.filters.towncode = val;
            this.getTableDatalist();
        },
        bjTypeChange(val){
            this.filters.alarmtype = val;
            this.getTableDatalist();
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
        lineTableClick(row){
            this.clickId = row.companyid;
            this.viewElineTableFlag = true;
            this.getListDetail();
        },
        goToBack(){
            this.viewElineTableFlag = false;
            this.getTableDatalist();
        },
        goToSearch(){
            this.lpage = 1;
            this.getTableDatalist();
            
        },
        // 列表排序
        tableDataChange(col){
            if(col.prop=='alarmnum'){
                this.filters.ascnum = '0';
            }else{
                this.filters.ascnum = '1';
            }

            if(col.order=='ascending'){
                this.filters.aschbl = '0';
            } else{
                this.filters.aschbl = '1';
            }
            this.getTableDatalist();
        },
        // 获取table列表数据
        getTableDatalist(){
            let para = Object.assign({}, this.filters);
            if(this.date1){
                para.startdate = this.date1[0];
                para.enddate = this.date1[1];
            }else{
                this.$message.success( '请选择时间');
                return false;
                para.startdate = '';
                para.enddate = '';
            }
            para.pageNo = this.lpage;
            para.pageSize = this.lpageSize;
            let that = this;
            get_eleAlertDataAlarmManage(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.tableData1 = res.data.result.records;
                    this.lpageTotal = res.data.result.total;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        // 获取详情
        getListDetail(code){
            let para = {
                enddate: this.date1[1],
                startdate: this.date1[0],
                pageNo: this.page,
                pageSize: this.pageSize,
                companyid: this.clickId
            };
            
            get_eleAlertDataAlarmDetail(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.tableData = res.data.result.records;
                    this.pageTotal = res.data.result.total;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })   
        },
        // 导出列表和导出详情
        exportList(){
            let url = URLHOST + '/electric/electricAlertData/alarmManageExportXls?startdate=' + this.date1[0] + '&enddate=' + this.date1[1] + '&name=' + this.filters.name + '&alarmtype=' + this.filters.alarmtype + '&regioncode=' + this.filters.regioncode +'&towncode=' + this.filters.towncode + '&ascnum=' + this.filters.ascnum + '&aschbl=' + this.filters.aschbl;
            window.location.href = url;
        },
        exportDetail(){
            let url = URLHOST + '/electric/electricAlertData/alarmDetailExportXls?startdate=' + this.date1[0] + '&enddate=' + this.date1[1] +'&companyid=' +  this.clickId;
            window.location.href = url;
        }
    },
    mounted() {
        let now = new Date().getTime() - 24*1000*3600;
        let end = new Date(now);
        let e = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' 23:59:59';
        let start = new Date(end.getTime() - 6*24*3600*1000);
        let s = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' 00:00:00';
        this.date1 = [s, e];
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