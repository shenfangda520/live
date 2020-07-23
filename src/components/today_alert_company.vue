<template>
    <div class="todayAlertCompanyDiaBox">
        <div v-model="filters" class="filter_box">
            <section class="meter_select">
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
                    <el-time-picker
                        is-range
                        v-model="date1"
                        value-format="HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围">
                    </el-time-picker>
                </div>
            </section>
            <section class="meter_select">
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
            </section>
        </div>
        <el-tabs v-model="tabActName" type="card">
            <el-tab-pane label="报警信息表" name="first">
                <div class="meter_table_green">
                    <el-table :data="tableData" stripe >
                        <el-table-column prop="rownum" label="序号" width="60" align="center"></el-table-column>
                        <el-table-column property="companyname" label="企业名称"  width="220" align="center"> 
                          
                            <template slot-scope="scope">
                                <span :title="scope.row.companyname">{{scope.row.companyname}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column property="region" label="县（市、区）" align="center"> </el-table-column>
                        <el-table-column property="town" label="乡镇（街道、园区）" align="center"></el-table-column>
                        <el-table-column property="alarmtype" label="报警类型" align="center">
                            
                        </el-table-column>
                        <el-table-column property="alarmtime" label="报警时间" align="center"></el-table-column>
                        
                    </el-table>
                    <div class="meter-pagerbox eLine_page" v-show="pageTotal>0">
                        <el-pagination
                            @current-change="pageChange"
                            :current-page.sync="page"
                            :page-size="pageSize"
                            layout="total, prev, pager, next"
                            :total="pageTotal"
                        ></el-pagination>
                    </div> 
                </div>
            </el-tab-pane>
            <el-tab-pane label="报警企业表" name="second">
                <div class="meter_table_green">
                    <el-table :data="tableData1" stripe >
                        <el-table-column prop="rownum" label="序号" width="60" align="center"></el-table-column>
                        <el-table-column property="companyname" label="企业名称"  width="220" align="center">
                            <template slot-scope="scope">
                                <span :title="scope.row.companyname">{{scope.row.companyname}}</span>
                            </template> </el-table-column>
                        <el-table-column property="region" label="县（市、区）" align="center"> </el-table-column>
                        <el-table-column property="town" label="乡镇（街道、园区）" align="center"></el-table-column>
                        <el-table-column property="alarmnum" label="报警次数" align="center"> </el-table-column>
                    </el-table>
                    <div class="meter-pagerbox eLine_page" v-show="pageTotal1>0">
                        <el-pagination
                            @current-change="pageChange1"
                            :current-page.sync="page1"
                            :page-size="pageSize1"
                            layout="total, prev, pager, next"
                            :total="pageTotal1"
                        ></el-pagination>
                    </div> 
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
var URLHOST = "http://120.52.96.42:8080";
if(process.env.BASE_API === 'prod'){
    URLHOST = "http://" + window.location.hostname + ":8198";
}
import {
   get_eleAlertDataTodayAlarm,
    get_eleAlertDataTodayAlarmExportXls,
    get_lfRelationList,
    get_townByCounty,
    get_eleAlertDataComAlarm
} from "../api/api";

export default {
    props: { },
    data() {
        return {
            tabActName: 'first',
            lfOptions: [],
            xzOptions:[],
            date1:['',''],
            filters:{
                startdate: '',
                enddate:'',
                alarmtype: '',
                name: '',
                regioncode: '1310',
                towncode:''
            },
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
            tableData:[],
            page: 1,
            pageSize: 10,
            pageTotal: 134,
            tableData1:[],
            page1: 1,
            pageSize1: 10,
            pageTotal1: 134
        };
    },
    methods: {
        pageChange(val) {
            this.page = val;
            this.getTableDatalist();
        },
       pageChange1(val) {
            this.page1 = val;
            this.getTableDataCompanylist();
        },
        quxianChange(val){
            this.filters.regioncode = val;
            this.filters.towncode = '';
            this.getXzListData();
        },
        xzChange(val){
            this.filters.towncode = val;
            
            if(this.tabActName ==='first'){
                this.getTableDatalist();
            }else{
                this.getTableDataCompanylist();
            }
        },
        bjTypeChange(val){
            this.filters.alarmtype = val;
            if(this.tabActName ==='first'){
                this.getTableDatalist();
            }else{
                this.getTableDataCompanylist();
            }
        },
       
        goToSearch(){
            this.page = 1;
            if(this.tabActName ==='first'){
                this.getTableDatalist();
            }else{
                this.getTableDataCompanylist();
            }
        },
     
        // 报警信息表数据 获取table列表数据
        getTableDatalist(){
            let para = Object.assign({}, this.filters);
            if(this.date1){
                para.startdate = this.date1[0];
                para.enddate = this.date1[1];
            }else{
                para.startdate = '';
                para.enddate = '';
            }
            para.pageNo = this.page;
            para.pageSize = this.pageSize;
            console.log(!this.date1)
            let that = this;
            get_eleAlertDataTodayAlarm(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.tableData = res.data.result.records;
                    this.pageTotal = res.data.result.total;
                }else{
                    this.$message.error(res.data.message || '请稍后再试~');
                }
            })
        },
        // 获取报警企业表数据
        getTableDataCompanylist(){

            let para = Object.assign({}, this.filters);
            if(this.date1){
                para.startdate = this.date1[0];
                para.enddate = this.date1[1];
            }else{
                para.startdate = '';
                para.enddate = '';
            }
            para.pageNo = this.page1;
            para.pageSize = this.pageSize1;
            let that = this;
            get_eleAlertDataComAlarm(para).then(res=>{
                if(res.data.code + '' === '0'){
                    this.tableData1 = res.data.result.records;
                    this.pageTotal1 = res.data.result.total;
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
        // 导出列表和导出详情
        exportList(){
            let url ='';
            if(this.tabActName ==='first'){
                url = URLHOST + '/electric/electricAlertData/todayAlarmExportXls';
            }else{
                url = URLHOST + '/electric/electricAlertData/companyAlarmExportXls';
            }
            let download = url + '?startdate=' + this.date1[0] + '&enddate=' + this.date1[1] + '&alarmtype=' + this.filters.alarmtype + '&name=' + this.filters.name + '&regioncode=' + this.filters.regioncode+  '&towncode=' +this.filters.towncode;
            window.location.href = download;
        }
      
    },
    mounted() {
        let now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let th = h < 10 ? ('0'+(h+'')) : h;
        let tm = m<10 ? ('0'+(m+'')) : m;
        let ts = s<10 ? ('0'+(s+'')) : s;
        let end = th + ':'+ tm + ':' + ts;
        this.date1 = ['00:00:00',end];
        this.getQxListData();
        this.getTableDatalist();
        this.getTableDataCompanylist();
    }
};
</script>
<style lang="scss" scoped>
.todayAlertCompanyDiaBox{
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