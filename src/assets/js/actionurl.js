//测试环境 http://dev.mizhi.com
//真实 http://www.mizhi.com/

/*if(window.location.hostname=='http://oa.ds99.me'){
 var INF_CONFIG = 'http://oa.ds99.me';
 }else{
 var INF_CONFIG = 'idy.lfq.gov.cn';
 }*/
//import $ from './zepto.min';
//var INF_CONFIG = process.env.API_ROOT;
import appConfigs from '../../configs';

var INF_CONFIG = appConfigs.URLWEBHTTP;

// var INF_CONFIG = 'http://idy.lfq.gov.cn'
// var INF_CONFIG = 'http://120.52.98.115'
//var INF_CONFIG = 'http://oa.ds99.me'

function baseAjax(method, url, data, fnSuccess, fnFaild) {

  $.ajax({
    type: method,
    cache: false,
    url: url,
    data: data,
    dataType: 'json',
    xhrFields: {
      withCredentials: true,
    },
    success: function (re) {
      if (re.status == -555) {
        window.location.href = './#/login'
      } else if (re.status == -666) {
        window.location.href = './#/editCompanyInfo'
      } else {
        fnSuccess && fnSuccess(re)
      }
    },
    error: function (re) {
      fnFaild && fnFaild(re)
    }
  })
}

//接口配置
var REQUEST_CONFIG = {
  //数据字典
  subTasksByContent: INF_CONFIG + '/api/utils/subTasksByContent.html',
  loginUrl: INF_CONFIG + '/industry/login/login.html',
  imageCodeUrl: INF_CONFIG + '/industry/login/imageCode.html',
  //左侧菜单栏
  menuList: INF_CONFIG + '/industry/menu/menuList.html',
  // 1.市级给企业催办列表
  cityUrgeCompany: INF_CONFIG + '/industry/urge/getlist',
  // 2.市级提交企业催办
  cityUrgeCompanyCommit: INF_CONFIG + '/industry/urge/userurge',
  // 3.市级给区县催办列表
  cityUrgeRegion: INF_CONFIG + '/industry/Messageinfo/industryEregList.html',
  // 4.市级提交区县催办
  cityUrgeRegionCommit: INF_CONFIG + '/industry/Messageinfo/industryEregMsg.html',
  // 5.市级一键崔报企业
  cityUrgeAll: INF_CONFIG + '/industry/urge/allurge',
  // 6.区县给企业催办列表
  regionUrgeCompany: INF_CONFIG + '/industry/urge/getlist',
  // 7.区县提交企业催办
  regionUrgeCompanyCommit: INF_CONFIG + '/industry/urge/userurge',
  // 8.区县级一键催报
  regionUrgeAll: INF_CONFIG + '/industry/urge/allurge',
  // 9.客服催报的企业列表
  kefuUrgeCompanyList: INF_CONFIG + '/industry/Messageinfo/getReportListByKefu',
  // 10.客服催报更改状态(企业)
  kefuChangeCompanyUrge: INF_CONFIG + '/industry/Messageinfo/changeKefuReportStaus',
  // 11.客服催报的区县列表
  kefuUrgeRegionList: INF_CONFIG + '/industry/Messageinfo/getListPhone',
  // 12.客服催报更改状态(区县)
  kefuChangeRegionUrge: INF_CONFIG + '/industry/Messageinfo/saveListPhone',
  // 13.获取企业用户系统消息
  getCompanyMsg: INF_CONFIG + '/industry/Messageinfo/getMsgList.html',
  // 14.获取企业用户或者区县用户或者乡镇未读消息
  getMsgCount: INF_CONFIG + '/industry/Messageinfo/getNotReadCount.html',
  // 15.获取区县用户系统消息
  getRegionMsg: INF_CONFIG + '/industry/Worker/getMsgList.html',
  //获取用户信息
  userInfo: INF_CONFIG + '/industry/worker/userInfo.html',
  //获取年份和季度接口
  getLastQuarter: INF_CONFIG + '/industry/quarter_report/getLastQuarter.html',
  //获取季报接口
  quarterList: INF_CONFIG + '/industry/quarter_report/quarterList.html',
  //季报上报接口
  quarterReport: INF_CONFIG + '/industry/quarter_report/quarterReport.html',
  //季报编辑接口
  quarterEdit: INF_CONFIG + '/industry/quarter_report/quarterEdit.html',
  //企业上报列表
  qygetList: INF_CONFIG + '/industry/Monthreport/getList.html',
  // 留言列表
  wordsList: INF_CONFIG + '/industry/words/index.html',
  // 新增留言
  addWords: INF_CONFIG + '/industry/words/add.html',
  // 回复留言
  replyWords: INF_CONFIG + '/industry/words/reply.html',
  // 留言详情
  wordsDetail: INF_CONFIG + '/industry/words/detail.html',
  // 市级获取资讯的列表
  cityNewsList: INF_CONFIG + '/industry/information/index.html',
  // 资讯详情
  newsDetail: INF_CONFIG + '/industry/information/detail.html',
  // 发布资讯
  addNews: INF_CONFIG + '/industry/information/add.html',
  // 编辑资讯
  editNews: INF_CONFIG + '/industry/information/edit.html',
  // 删除资讯
  delNews: INF_CONFIG + '/industry/information/del.html',
  // 资讯分类
  newsTypes: INF_CONFIG + '/industry/information/getTypeList.html',
  // 区县用户获取资讯列表
  comRegionNewsList: INF_CONFIG + '/industry/information/getWorkerList.html',
  // 添加通知公告
  addNotice: INF_CONFIG + '/industry/Message/add.html',
  // 编辑通知公告
  editNotice: INF_CONFIG + '/industry/Message/edit.html',
  // 获取通知公告的列表
  noticeList: INF_CONFIG + '/industry/Message/index.html',
  // 通知公告详情
  noticeDetail: INF_CONFIG + '/industry/Message/info.html',
  // 删除通知公告
  delNotice: INF_CONFIG + '/industry/Message/del.html',
  // 获取数据上报目标接口
  getTargetByYear: INF_CONFIG + '/industry/target/getTargetByYear.html',
  // 设置数据上报目标接口
  setTargetByYear: INF_CONFIG + '/industry/target/setTargetByYear.html',
  // 获取数据上报年份接口
  targetGetYears: INF_CONFIG + '/industry/target/getYears.html',

  //月报上报接口
  monthReport: INF_CONFIG + '/industry/Monthreport/add.html',
  //添加子账号
  newUserUrl: INF_CONFIG + '/industry/worker/workerAdd.html',
  //区县上报动态接口
  newReport: INF_CONFIG + '/industry/quarter_report/newReport.html',
  //市级首页企业上报情况接口
  getcomReport: INF_CONFIG + '/industry/quarter_report/getReportRate.html',
  //月度上报率接口
  monthPercent: INF_CONFIG + '/industry/Monthreport/percent.html',
  //删除用户接口
  delUserItemUrl: INF_CONFIG + '/industry/worker/workerDelSet.html',
  //用户列表接口
  userListUrl: INF_CONFIG + '/industry/worker/workerList.html',
  //编辑用户信息
  editUserItemUrl: INF_CONFIG + '/industry/worker/workerEdit.html',
  //企业列表
  companyListUrl: INF_CONFIG + '/industry/worker/comUserList.html',
  //新建企业
  newCompanyUrl: INF_CONFIG + '/industry/worker/comUserAdd.html',
  //更改企业状态接口 1-删除 0-恢复
  delCompanyUrl: INF_CONFIG + '/industry/worker/comUserDelSet.html',
  //企业注册等级分类
  getRegTypeList: INF_CONFIG + '/industry/worker/getRegTypeList.html',
  //工业行业分类
  getIndustryList: INF_CONFIG + '/industry/worker/getIndustryList.html',
  //获取用户工业行业分类接口
  getSelectedIndustry: INF_CONFIG + '/industry/worker/getSelectedIndustry.html',
  // 企业信息详情
  getCompanyinfo: INF_CONFIG + '/industry/worker/getComUserById.html',
  // 获取企业的工业上报积分的接口（市级和区县）
  getCompanyJifen: INF_CONFIG + '/industry/score/userScoreList',
  // 获取区县的工业上报积分的接口（市级）
  getRegionJifen: INF_CONFIG + '/industry/score/workerScoreList',
  // 获取企业的工业上报积分的接口（企业用户）
  getCompanyScore: INF_CONFIG + '/industry/score/appUserScoreList',
  // 获取区县的工业上报积分的接口（区县用户）
  getRegionScore: INF_CONFIG + '/industry/score/workerUser',
  // 获取廊坊各区县的id值，用于查询积分情况
  getJifenArea: INF_CONFIG + '/industry/score/selWorkerDataList',
  // 获取问卷上传的列表接口
  getWenjuanList: INF_CONFIG + '/industry/score/userQuestListApi',
  // 导入企业调查问卷
  importWenJuan: INF_CONFIG + '/industry/score/importWenJuan',
  // 测评企业列表接口
  getSurveyComsList: INF_CONFIG + '/industry/evaluation_enterprise/eeList.html',
  // 删除测评企业接口
  delSurveyItem: INF_CONFIG + '/industry/evaluation_enterprise/del.html',
  // 编辑测评企业数据接口
  editSurveyData: INF_CONFIG + '/industry/evaluation_enterprise/edit.html',
  // 增加测评企业接口
  addSurveyCom: INF_CONFIG + '/industry/evaluation_enterprise/add.html',

  //编辑企业信息
  editCompanyUrl: INF_CONFIG + '/industry/worker/comUserEdit.html',
  //月报详情接口
  monthInfo: INF_CONFIG + '/industry/Monthreport/info.html',
  //月报编辑接口
  monthEdit: INF_CONFIG + '/industry/Monthreport/edit.html',
  //企业端月报列表接口
  infoByMonth: INF_CONFIG + '/industry/Monthreport/infoByMonth.html',
  //未上报企业列表
  unReportedUser: INF_CONFIG + '/industry/Monthreport/unReportedUser.html',
  //区县上报情况接口
  areaReportList: INF_CONFIG + '/industry/Monthreport/areaReportList.html',
  //年报上报
  yearAdd: INF_CONFIG + '/industry/Yearreport/add.html',
  //年报列表
  yearList: INF_CONFIG + '/industry/Yearreport/getList.html',
  //年报删除
  yearDel: INF_CONFIG + '/industry/Yearreport/del.html',
  //民营数据列表
  privatrList: INF_CONFIG + '/industry/Privatereport/getList.html',
  //民营上报
  privatrAdd: INF_CONFIG + '/industry/Privatereport/add.html',
  //民营删除
  privatrDel: INF_CONFIG + '/industry/Privatereport/del.html',
  //市级获取区县直报数据列表接口
  cityreportList: INF_CONFIG + '/industry/County/reportList.html',
  //区县月报ID导入
  reportImport: INF_CONFIG + '/industry/County/reportImport.html',
  //区县ID月报导入
  reportImportEx: INF_CONFIG + '/industry/County/reportImportEx.html',
  //检测区县月报是否已经导入接口
  checkImport: INF_CONFIG + '/industry/County/checkImport.html',


  //区县月报自动审查接口
  reportCheck: INF_CONFIG + '/industry/County/reportCheck.html',


  //通过区县ID和日期获取区县月报详情接口
  reportInfoEx: INF_CONFIG + '/industry/County/reportInfoEx.html',
  //通过区县月报ID获取区县月报详情接口
  reportInfo: INF_CONFIG + '/industry/County/reportInfo.html',
  //获取全市月报详情接口
  countyCount: INF_CONFIG + '/industry/County/countyCount.html',
  //市直单位列表
  citydwList: INF_CONFIG + '/industry/Cityreport/getList.html',
  //市直单位上报接口
  citydwAdd: INF_CONFIG + '/industry/Cityreport/add.html',
  //市直单位删除
  citydwDel: INF_CONFIG + '/industry/Cityreport/del.html',
  //获取规上工业月报文件列表接口
  asiReportFiles: INF_CONFIG + '/industry/City/asiReportFiles.html',
  //检测规上工业本月是否已导入月报接口
  asiCheckImport: INF_CONFIG + '/industry/City/asiCheckImport.html',
  //规上工业月报导入接口
  asiReportImport: INF_CONFIG + '/industry/City/asiReportImport.html',
  //用电量列表
  elecList: INF_CONFIG + '/industry/City/electricityReportFiles.html',
  //检测用电量是否已导入接口
  elecCheck: INF_CONFIG + '/industry/City/electricityCheckImport.html',
  //用电量导入接口
  elecReport: INF_CONFIG + '/industry/City/electricityReportImport.html',
  //获取工业经济统计年份列表接口
  getCityYears: INF_CONFIG + '/industry/count/getYears.html',
  //获取工业经济统计项列表接口
  getCityTags: INF_CONFIG + '/industry/count/getTags.html',
  //工业经济统运行分析接口
  cityCount: INF_CONFIG + '/industry/city_count/count.html',
  //工业经济统月走势统计接口
  monthCount: INF_CONFIG + '/industry/city_count/monthCount.html',
  //附报数据分析接口
  cityfCount: INF_CONFIG + '/industry/city_count/fcount.html',
  //企业直报数据统计接口
  directReport: INF_CONFIG + '/industry/Monthreport/count.html',
  //各行业数据汇总统计接口
  groupSumCount: INF_CONFIG + '/industry/city_count/groupSumCount.html',
  //获取规上工业统计年份列表接口
  getAsiYears: INF_CONFIG + '/industry/city_count/getAsiYears.html',
  //获取规上工业统计项列表接口
  getAsiTags: INF_CONFIG + '/industry/city_count/getAsiTags.html',
  //廊坊市本年度规上指标完成率分析接口
  asiTargetRate: INF_CONFIG + '/industry/city_count/asiTargetRate.html',
  //各区县本年度规上指标完成率分析接口
  asiCountyTargetRate: INF_CONFIG + '/industry/city_count/asiCountyTargetRate.html',
  //各区县规上经济分析接口
  asiCountyCount: INF_CONFIG + '/industry/city_count/asiCountySpeedCount.html',

  //各区县规上经济分析接口
  asiCountyRateCount: INF_CONFIG + '/industry/city_count/asiCountyRateCount.html',

  //获取用电量统计年份列表接口
  elecYears: INF_CONFIG + '/industry/count/getElectricityYears.html',
  //获取用电量统计项列表接口
  elecTags: INF_CONFIG + '/industry/count/getElectricityTags.html',
  //廊坊市用电量走势分析接口
  elecityCount: INF_CONFIG + '/industry/city_count/electricityCount.html',
  //各区县累计用电量分析接口
  elecCountyCount: INF_CONFIG + '/industry/city_count/electricityCountyCount.html',
  //区县数据分析
  //工业经济月度完成趋势分析接口
  areaMonthCount: INF_CONFIG + '/industry/county_count/monthCount.html',
  //工业经济附报指标完成分析接口
  areafmonthCount: INF_CONFIG + '/industry/county_count/fmonthCount.html',
  //区县用电量分析接口
  areaetyCount: INF_CONFIG + '/industry/county_count/etyCount.html',
  //企业数据分析
  //获取工业经济统计年份列表接口
  comYears: INF_CONFIG + '/industry/company_count/getYears.html',
  //获取工业经济统计项列表接口
  comTags: INF_CONFIG + '/industry/company_count/getTags.html',
  //工业经济月度趋势接口
  comonthCount: INF_CONFIG + '/industry/company_count/monthCount.html',
  //工业经济同期对比接口
  compareCount: INF_CONFIG + '/industry/company_count/compareCount.html',
  //企业用电量分析接口
  cometyCount: INF_CONFIG + '/industry/company_count/etyCount.html',
  //获取通知列表
  msgList: INF_CONFIG + '/industry/Message/index.html',
  //获取资讯列表
  informationList: INF_CONFIG + '/industry/information/index.html',
  //市级首页区县上报情况列表接口
  getCountyReportStatus: INF_CONFIG + '/industry/county/getCountyReportStatus.html',
  //区县首页企业上报情况接口
  getReportRateByArea: INF_CONFIG + '/industry/quarter_report/getReportRateByArea.html',
  //区县首页企业上报情况获取日期
  getcityLastMonth: INF_CONFIG + '/industry/quarter_report/getLastMonth.html',
  //区县月报编辑
  areaReportEdit: INF_CONFIG + '/industry/County/reportEdit.html',
  //调查问卷列表接口
  QuestionList: INF_CONFIG + '/industry/Questionnaire/getList.html',
  //区县增加值统计接口
  cityIncrease: INF_CONFIG + '/industry/city_count/increase.html',
  //全市工业运行经济概况
  citySurvey: INF_CONFIG + '/industry/city_count/survey.html',
  //全市五大主导产业发展趋势图
  cityTrend: INF_CONFIG + '/industry/city_count/trend.html',
  //廊坊市规上企业分布散点图
  cityGauge: INF_CONFIG + '/industry/city_count/gauge.html',
  //企业分布行业分类
  citygetIndustry: INF_CONFIG + '/industry/city_count/getIndustry.html',
  //企业分布地图详情接口
  mapDetail: INF_CONFIG + '/industry/city_count/mapDetail.html',
  //整体信息化水平分析接口
  levelCount: INF_CONFIG + '/industry/evaluation_count/levelCount.html',
  //整体信息化水平明细列表接口
  levelList: INF_CONFIG + '/industry/evaluation_count/levelList.html',
  //信息化产品应用程度排行统计接口
  productRanking: INF_CONFIG + '/industry/evaluation_count/productRanking.html',
  //信息化产品应用程度排行明细列表接口
  productRankingList: INF_CONFIG + '/industry/evaluation_count/productRankingList.html',
  //企业信息化程度测评统计接口
  evaluationCount: INF_CONFIG + '/industry/evaluation_count/evaluationCount.html',
  //企业信息化程度测评明细列表接口
  evaluationCountList: INF_CONFIG + '/industry/evaluation_count/evaluationCountList.html',
  //7.五大支柱产业企业对信息化收效满意度对比统计接口
  satisfactionCount: INF_CONFIG + '/industry/evaluation_count/satisfactionCount.html',
  //8.五大支柱产业企业对信息化收效满意度对比明细列表接口
  satisfactionCountList: INF_CONFIG + '/industry/evaluation_count/satisfactionCountList.html',
  //10.成熟度企业分布统计接口
  distributionCount: INF_CONFIG + '/industry/evaluation_count/distributionCount.html',
  //月报上报时检测本月值与上月差值是否超过100%接口
  checkDiffRate: INF_CONFIG + '/industry/Monthreport/checkDiffRate.html',

  //获取文字报告模板数据接口
  getReportTmp: INF_CONFIG + '/industry/evaluation_count/getReportTmp.html',
  //文字报告数据上传接口
  reportUpload: INF_CONFIG + '/industry/evaluation_count/reportUpload.html',
  //文字报告下载接口
  reportDownload: INF_CONFIG + '/industry/evaluation_count/reportDownload.html',
  //获取乡镇接口
  subList: INF_CONFIG + '/api/utils/subList.html',
  //各产业占比接口
  groupRate: INF_CONFIG + '/industry/city_count/groupRate.html',
  //25. 全市规模以上工业增加值完成情况接口
  cityAddList: INF_CONFIG + '/industry/city_count/cityAddList.html',
  //26. 全市规上工业增加值增速及趋势接口
  cityAddSpeeds: INF_CONFIG + '/industry/city_count/cityAddSpeeds.html',
  //27. 全市工业用电情况接口
  cityIdyEty: INF_CONFIG + '/industry/city_count/cityIdyEty.html',
  //4.  民营月报上报检查接口
  poCheckImport: INF_CONFIG + '/industry/Privatereport/poCheckImport.html',
  //民营月报上报检查接口
  idyMrEx: INF_CONFIG + '/industry/city_count/idyMrEx.html',
  //全市民营经济主要指标完成情况接口
  cityPoInfo: INF_CONFIG + '/industry/city_count/cityPoInfo.html',

  //最新 民营上报接口
  poImport: INF_CONFIG + '/industry/Privatereport/poImport.html',
  //最新 民营上报列表
  poGetList: INF_CONFIG + '/industry/Privatereport/poReportFiles.html',
  //乡镇相关接口

  //1.  乡镇月报导入接口
  T_reportImport: INF_CONFIG + '/industry/Town/reportImport.html',
  //2.  通过乡镇ID导入月报接口(市级 以及区县账号使用)
  T_reportImportEx: INF_CONFIG + '/industry/Town/reportImportEx.html',
  // 3.  乡镇月报编辑接口
  T_reportEdit: INF_CONFIG + '/industry/Town/reportEdit.html',
  // 4.市级获取乡镇直报数据列表接口
  T_reportList: INF_CONFIG + '/industry/Town/reportList.html',
  // 6. 检测乡镇月报是否已经导入接口
  T_checkImport: INF_CONFIG + '/industry/Town/checkImport.html',


  // 8. 通过乡镇月报ID获取乡镇月报详情接口
  T_reportInfo: INF_CONFIG + '/industry/Town/reportInfo.html',

  // 9. 通过乡镇ID和日期获取乡镇月报详情接口(市级 以及区县账号使用)
  T_reportInfoEx: INF_CONFIG + '/industry/Town/reportInfoEx.html',
  //7.  乡镇月报自动审查接口
  T_reportCheck: INF_CONFIG + '/industry/Town/reportCheck.html',
  //10. 乡镇月报详情导出接口
  T_reportExport: INF_CONFIG + '/industry/Town/reportExport.html',

  //11. 未上报企业接口
  T_unReportComs: INF_CONFIG + '/industry/Town/unReportComs.html',
  //13. 首页-企业上报情况接口
  T_comReportRate: INF_CONFIG + '/industry/town/comReportRate.html',
  //14. 获取工业经济统计年份列表接口
  T_getYears: INF_CONFIG + '/industry/town_count/getYears.html',
  //15. 获取工业经济统计项列表接口
  T_getTags: INF_CONFIG + '/industry/town_count/getTags.html',
  //16. 工业经济月度完成趋势分析接口
  T_monthCount: INF_CONFIG + '/industry/town_count/monthCount.html',
  //16. 工业经济月度完成趋势分析接口
  T_fmonthCount: INF_CONFIG + '/industry/town_count/fmonthCount.html',
  //20. 乡镇账号下企业用户列表接口
  T_comUserList: INF_CONFIG + '/industry/town/comUserList.html',
  //18. 乡镇账号下添加企业用户接口
  T_comUserAdd: INF_CONFIG + '/industry/town/comUserAdd.html',
  //18. 乡镇账号下添加企业用户接口
  T_comUserEdit: INF_CONFIG + '/industry/town/comUserEdit.html',
  //18. 乡镇账号下添加企业用户接口
  T_comUserDelSet: INF_CONFIG + '/industry/town/comUserDelSet.html',
  //28. 获取待催报乡镇列表接口
  T_getUrgeTowns: INF_CONFIG + '/industry/town/getUrgeTowns.html',
  //26. 区县用户一键提醒企业用户接口
  T_allurge: INF_CONFIG + '/industry/town/allurge.html',
  //27.  区县用户上报提醒企业用户接口
  T_userurge: INF_CONFIG + '/industry/town/userurge.html',
  //30. 上报提醒乡镇待催报用户接口
  T_urgeTowns: INF_CONFIG + '/industry/town/urgeTowns.html',
  //29. 一键提醒乡镇待催报用户接口
  T_allUrgeTowns: INF_CONFIG + '/industry/town/allUrgeTowns.html',
  //23. 获取系统消息列表
  T_getUrgelist: INF_CONFIG + '/industry/town/getUrgelist.html',

  //1.  获取行业分类接口
  tsIdyGroups: INF_CONFIG + '/industry/Monthreport/tsIdyGroups.html',
  //2.  企业直报数据列表接口
  Only_getList: INF_CONFIG + '/industry/Monthreport/getList.html',
  //3.  企业直报数据导出接口
  Only_comReportListExport: INF_CONFIG + '/industry/Monthreport/comReportListExport.html',

  //1.	获取行业分类接口
  Only_tsIdyGroups: INF_CONFIG + '/industry/Monthreport/tsIdyGroups.html',
  //行业分析一级分类占比
  Only_tsGroupRate: INF_CONFIG + '/industry/city_count/tsGroupRate.html',
  //6.	行业分类占比统计分析指标项列表接口
  Only_tsGroupTags: INF_CONFIG + '/industry/city_count/tsGroupTags.html',
  //6.	行业分类占比统计分析指标项列表接口
  Only_tsSubGroupRate: INF_CONFIG + '/industry/city_count/tsSubGroupRate.html',

  // 获取统计指标项
  Only_tsComTags: INF_CONFIG + '/industry/company_count/tsComTags.html',
  Only_tsComUpspeed: INF_CONFIG + '/industry/company_count/tsComUpspeed.html',
  Only_tsGroupCountyRate: INF_CONFIG + '/industry/city_count/tsGroupCountyRate.html',//9.	某个行业分类下各区县占比情况统计接口

  //20181217版
  // 二级行业分类下各区县占比情况统计接口
  tsSubGroupCountyRate: INF_CONFIG + '/industry/city_count/tsSubGroupCountyRate.html',
  //经济运行地图接口
  idyGis: INF_CONFIG + '/industry/city_count/idyGis.html',
  // 测试数据
  testData: INF_CONFIG + '/industry/Bigdatacount/groupComsDistribute',

  //20190102版
  // 区县获取停产企业数据
  stopComs_area: INF_CONFIG + '/industry/county/comStops.html',
  // 乡镇获取停产企业数据
  stopComs_town: INF_CONFIG + '/industry/town/comStops.html',
  // 未上报企业
  unReportedCompany: INF_CONFIG + '/industry/Monthreport/unReportedUser.html',
  // 批量导入企业月报数据口
  importCompanyReports: INF_CONFIG + '/industry/Monthreport/importCompanyReports.html',
  // 非规上企业数据
  otherCompanyReportList: INF_CONFIG + '/industry/Monthreport/otherCompanyReportList.html',
  Only_otherCompanyReportList: INF_CONFIG + '/industry/Monthreport/otherCompanyReportList.html',
  // 企业提交诉求接口
  addQYAppeal: INF_CONFIG + '/industry/Appeal/add.html',
  // 诉求留言分类
  appealGroup: INF_CONFIG + '/industry/Appeal/getGroup.html',
  // 诉求留言分类
  appealList: INF_CONFIG + '/industry/Appeal/getList.html',
  // 企业诉求详情
  appealInfo: INF_CONFIG + '/industry/Appeal/info.html',
  // 诉求评价
  appealEvaluation: INF_CONFIG + '/industry/Appeal/evaluation.html',
  // 诉求追问
  appealAskAgain: INF_CONFIG + '/industry/Appeal/askAgain.html',
}

function stopComs_area(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.stopComs_area, data, fn, fn)
}

function stopComs_town(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.stopComs_town, data, fn, fn)
}

function Only_tsGroupCountyRate(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.Only_tsGroupCountyRate, data, fn, fn)
}

function Only_tsComUpspeed(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.Only_tsComUpspeed, data, fn, fn)
}

function Only_tsComTags(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.Only_tsComTags, data, fn, fn)
}

function Only_tsSubGroupRate(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.Only_tsSubGroupRate, data, fn, fn)
}

function Only_tsGroupTags(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.Only_tsGroupTags, data, fn, fn)
}

function Only_tsGroupRate(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.Only_tsGroupRate, data, fn, fn)
}

function Only_tsIdyGroups(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.Only_tsIdyGroups, data, fn, fn)
}

function Only_getList(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.Only_getList, data, fn, fn)
}

function tsIdyGroups(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.tsIdyGroups, data, fn, fn)
}

function T_getUrgelist(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_getUrgelist, data, fn, fn)
}

function T_urgeTowns(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_urgeTowns, data, fn, fn)
}

function T_allUrgeTowns(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_allUrgeTowns, data, fn, fn)
}

function T_userurge(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_userurge, data, fn, fn)
}

function T_allurge(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_allurge, data, fn, fn)
}

function T_getUrgeTowns(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_getUrgeTowns, data, fn, fn)
}

function T_comUserDelSet(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_comUserDelSet, data, fn, fn)
}

function T_comUserEdit(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_comUserEdit, data, fn, fn)
}

function T_comUserAdd(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_comUserAdd, data, fn, fn)
}

function T_comUserList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_comUserList, data, fn, fn)
}

function T_fmonthCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_fmonthCount, data, fn, fn)
}

function T_monthCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_monthCount, data, fn, fn)
}

function T_getTags(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_getTags, data, fn, fn)
}

function T_getYears(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_getYears, data, fn, fn)
}

function T_comReportRate(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_comReportRate, data, fn, fn)
}

function T_unReportComs(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_unReportComs, data, fn, fn)
}

function T_reportInfo(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_reportInfo, data, fn, fn)
}

function T_reportExport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_reportExport, data, fn, fn)
}

function T_reportCheck(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_reportCheck, data, fn, fn)
}

function T_reportInfoEx(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_reportInfoEx, data, fn, fn)
}

function T_reportList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_reportList, data, fn, fn)
}

function T_checkImport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_checkImport, data, fn, fn)
}

function T_reportEdit(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_reportEdit, data, fn, fn)
}

function T_reportImportEx(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_reportImportEx, data, fn, fn)
}

function T_reportImport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.T_reportImport, data, fn, fn)
}

function poGetList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.poGetList, data, fn, fn)
}

function poImport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.poImport, data, fn, fn)
}

function cityPoInfo(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityPoInfo, data, fn, fn)
}

function idyMrEx(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.idyMrEx, data, fn, fn)
}

function poCheckImport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.poCheckImport, data, fn, fn)
}

function cityIdyEty(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityIdyEty, data, fn, fn)
}

function cityAddSpeeds(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityAddSpeeds, data, fn, fn)
}

function cityAddList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityAddList, data, fn, fn)
}

function reportCheck(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.reportCheck, data, fn, fn)
}

function groupRate(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.groupRate, data, fn, fn)
}

function checkDiffRate(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.checkDiffRate, data, fn, fn)
}

function satisfactionCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.satisfactionCount, data, fn, fn)
}

function satisfactionCountList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.satisfactionCountList, data, fn, fn)
}

function distributionCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.distributionCount, data, fn, fn)
}

function productRanking(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.productRanking, data, fn, fn)
}

function productRankingList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.productRankingList, data, fn, fn)
}

function evaluationCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.evaluationCount, data, fn, fn)
}

function evaluationCountList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.evaluationCountList, data, fn, fn)
}

function levelCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.levelCount, data, fn, fn)
}

function levelList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.levelList, data, fn, fn)
}

function mapDetail(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.mapDetail, data, fn, fn)
}

function citygetIndustry(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.citygetIndustry, data, fn, fn)
}

function cityGauge(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityGauge, data, fn, fn)
}

function cityTrend(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityTrend, data, fn, fn)
}

function cityIncrease(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityIncrease, data, fn, fn)
}

function getSurveyComsList(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.getSurveyComsList, data, fn, fn)
}

function delSurveyItem(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.delSurveyItem, data, fn, fn)
}

function editSurveyData(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.editSurveyData, data, fn, fn)
}

function addSurveyCom(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.addSurveyCom, data, fn, fn)
}

function citySurvey(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.citySurvey, data, fn, fn)
}

function QuestionList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.QuestionList, data, fn, fn)
}

function getWenjuanList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getWenjuanList, data, fn, fn)
}

function importWenJuan(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.importWenJuan, data, fn, fn)
}

function areaReportEdit(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.areaReportEdit, data, fn, fn)
}

function reportImportEx(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.reportImportEx, data, fn, fn)
}

function getReportRateByArea(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getReportRateByArea, data, fn, fn)
}

function getcityLastMonth(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getcityLastMonth, data, fn, fn)
}

function getCountyReportStatus(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getCountyReportStatus, data, fn, fn)
}

function getTargetByYear(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getTargetByYear, data, fn, fn)
}

function setTargetByYear(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.setTargetByYear, data, fn, fn)
}

function targetGetYears(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.targetGetYears, data, fn, fn)
}

function getRegTypeList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getRegTypeList, data, fn, fn)
}

function getIndustryList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getIndustryList, data, fn, fn)
}

function getJifenArea(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getJifenArea, data, fn, fn)
}

function msgList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.msgList, data, fn, fn)
}

function getSelectedIndustry(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getSelectedIndustry, data, fn, fn)
}

function informationList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.informationList, data, fn, fn)
}

function comYears(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.comYears, data, fn, fn)
}

function comTags(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.comTags, data, fn, fn)
}

function comonthCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.comonthCount, data, fn, fn)
}

function compareCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.compareCount, data, fn, fn)
}

function cometyCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cometyCount, data, fn, fn)
}

function areaMonthCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.areaMonthCount, data, fn, fn)
}

function areafmonthCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.areafmonthCount, data, fn, fn)
}

function areaetyCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.areaetyCount, data, fn, fn)
}

function elecYears(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.elecYears, data, fn, fn)
}

function elecTags(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.elecTags, data, fn, fn)
}

function elecityCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.elecityCount, data, fn, fn)
}

function elecCountyCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.elecCountyCount, data, fn, fn)
}

function getAsiYears(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getAsiYears, data, fn, fn)
}

function getAsiTags(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getAsiTags, data, fn, fn)
}

function asiTargetRate(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.asiTargetRate, data, fn, fn)
}

function asiCountyTargetRate(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.asiCountyTargetRate, data, fn, fn)
}

function asiCountyRateCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.asiCountyRateCount, data, fn, fn)
}

function asiCountyCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.asiCountyCount, data, fn, fn)
}

function monthCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.monthCount, data, fn, fn)
}

function cityNewsList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityNewsList, data, fn, fn)
}

function newsDetail(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.newsDetail, data, fn, fn)
}

function addNews(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.addNews, data, fn, fn)
}

function editNews(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.editNews, data, fn, fn)
}

function getRegionScore(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getRegionScore, data, fn, fn)
}

function delNews(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.delNews, data, fn, fn)
}

function newsTypes(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.newsTypes, data, fn, fn)
}

function addNotice(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.addNotice, data, fn, fn)
}

function editNotice(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.editNotice, data, fn, fn)
}

function noticeList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.noticeList, data, fn, fn)
}

function noticeDetail(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.noticeDetail, data, fn, fn)
}

function delNotice(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.delNotice, data, fn, fn)
}

function getCompanyinfo(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getCompanyinfo, data, fn, fn)
}

function comRegionNewsList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.comRegionNewsList, data, fn, fn)
}

function cityfCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityfCount, data, fn, fn)
}

function groupSumCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.groupSumCount, data, fn, fn)
}

function getCompanyJifen(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getCompanyJifen, data, fn, fn)
}

function getRegionJifen(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getRegionJifen, data, fn, fn)
}

function getCompanyScore(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getCompanyScore, data, fn, fn)
}

function directReport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.directReport, data, fn, fn)
}

function getCityYears(data, fn) {

  baseAjax('GET', REQUEST_CONFIG.getCityYears, data, fn, fn)

}

function getCityTags(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getCityTags, data, fn, fn)
}

function cityCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityCount, data, fn, fn)
}

function elecList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.elecList, data, fn, fn)
}

function elecCheck(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.elecCheck, data, fn, fn)
}

function elecReport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.elecReport, data, fn, fn)
}

function asiReportImport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.asiReportImport, data, fn, fn)
}

function asiCheckImport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.asiCheckImport, data, fn, fn)
}

function asiReportFiles(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.asiReportFiles, data, fn, fn)
}

function citydwList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.citydwList, data, fn, fn)
}

function citydwAdd(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.citydwAdd, data, fn, fn)
}

function citydwDel(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.citydwDel, data, fn, fn)
}

function reportInfoEx(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.reportInfoEx, data, fn, fn)
}

function reportInfo(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.reportInfo, data, fn, fn)
}

function countyCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.countyCount, data, fn, fn)
}

function reportImport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.reportImport, data, fn, fn)
}

function checkImport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.checkImport, data, fn, fn)
}

function privatrList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.privatrList, data, fn, fn)
}

function privatrAdd(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.privatrAdd, data, fn, fn)
}

function privatrDel(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.privatrDel, data, fn, fn)
}

function subTasksByContent(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.subTasksByContent, data, fn, fn)
}

function addWords(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.addWords, data, fn, fn)
}

function replyWords(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.replyWords, data, fn, fn)
}

function wordsDetail(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.wordsDetail, data, fn, fn)
}

function login(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.loginUrl, data, fn, fn)
}

function imageCode(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.imageCodeUrl, data, fn, fn)
}

function menuList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.menuList, data, fn, fn)
}

function cityUrgeCompany(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityUrgeCompany, data, fn, fn)
}

function cityUrgeCompanyCommit(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityUrgeCompanyCommit, data, fn, fn)
}

function cityUrgeRegion(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityUrgeRegion, data, fn, fn)
}

function cityUrgeRegionCommit(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityUrgeRegionCommit, data, fn, fn)
}

function cityUrgeAll(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityUrgeAll, data, fn, fn)
}

function regionUrgeCompany(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.regionUrgeCompany, data, fn, fn)
}

function regionUrgeCompanyCommit(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.regionUrgeCompanyCommit, data, fn, fn)
}

function regionUrgeAll(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.regionUrgeAll, data, fn, fn)
}

function kefuUrgeCompanyList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.kefuUrgeCompanyList, data, fn, fn)
}

function kefuChangeCompanyUrge(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.kefuChangeCompanyUrge, data, fn, fn)
}

function kefuUrgeRegionList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.kefuUrgeRegionList, data, fn, fn)
}

function kefuChangeRegionUrge(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.kefuChangeRegionUrge, data, fn, fn)
}

function userInfo(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.userInfo, data, fn, fn)
}

function getLastQuarter(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getLastQuarter, data, fn, fn)
}

function quarterList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.quarterList, data, fn, fn)
}

function quarterReport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.quarterReport, data, fn, fn)
}

function quarterEdit(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.quarterEdit, data, fn, fn)
}

function qygetList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.qygetList, data, fn, fn)
}

function monthReport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.monthReport, data, fn, fn)
}

function newUserUrl(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.newUserUrl, data, fn, fn)
}

function newReport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.newReport, data, fn, fn)
}

function monthPercent(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.monthPercent, data, fn, fn)
}

function getcomReport(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getcomReport, data, fn, fn)
}

function delUserItemUrl(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.delUserItemUrl, data, fn, fn)
}

function userListUrl(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.userListUrl, data, fn, fn)
}

function editUserItemUrl(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.editUserItemUrl, data, fn, fn)
}

function companyListUrl(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.companyListUrl, data, fn, fn)
}

function newCompanyUrl(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.newCompanyUrl, data, fn, fn)
}

function delCompanyUrl(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.delCompanyUrl, data, fn, fn)
}

function editCompanyUrl(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.editCompanyUrl, data, fn, fn)
}

function monthInfo(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.monthInfo, data, fn, fn)
}

function monthEdit(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.monthEdit, data, fn, fn)
}

function infoByMonth(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.infoByMonth, data, fn, fn)
}

function unReportedUser(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.unReportedUser, data, fn, fn)
}

function areaReportList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.areaReportList, data, fn, fn)
}

function getCompanyMsg(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getCompanyMsg, data, fn, fn)
}

function getMsgCount(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getMsgCount, data, fn, fn)
}

function getRegionMsg(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getRegionMsg, data, fn, fn)
}

function yearAdd(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.yearAdd, data, fn, fn)
}

function yearList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.yearList, data, fn, fn)
}

function yearDel(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.yearDel, data, fn, fn)
}

function cityreportList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.cityreportList, data, fn, fn)
}

function wordsList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.wordsList, data, fn, fn)
}

function getReportTmp(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.getReportTmp, data, fn, fn)
}

function reportUpload(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.reportUpload, data, fn, fn)
}

function reportDownload(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.reportDownload, data, fn, fn)
}

function subList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.subList, data, fn, fn)
}

function testData(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.testData, data, fn, fn)
}

function tsSubGroupCountyRate(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.tsSubGroupCountyRate, data, fn, fn)
}

function idyGis(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.idyGis, data, fn, fn)
}

function unReportedCompany(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.unReportedCompany, data, fn, fn)
}

function importCompanyReports(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.importCompanyReports, data, fn, fn)
}

function otherCompanyReportList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.otherCompanyReportList, data, fn, fn)
}

function Only_otherCompanyReportList(data, fn) {
  baseAjax('GET', REQUEST_CONFIG.Only_otherCompanyReportList, data, fn, fn)
}

function addQYAppeal(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.addQYAppeal, data, fn, fn)
}

function appealGroup(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.appealGroup, data, fn, fn)
}

function appealInfo(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.appealInfo, data, fn, fn)
}

function appealList(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.appealList, data, fn, fn)
}

function appealEvaluation(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.appealEvaluation, data, fn, fn)
}

function appealAskAgain(data, fn) {
  baseAjax('POST', REQUEST_CONFIG.appealAskAgain, data, fn, fn)
}

export default {
  subTasksByContent: subTasksByContent,
  login: login,
  imageCode: imageCode,
  menuList: menuList,
  cityUrgeCompany: cityUrgeCompany,
  cityUrgeCompanyCommit: cityUrgeCompanyCommit,
  cityUrgeRegion: cityUrgeRegion,
  cityUrgeRegionCommit: cityUrgeRegionCommit,
  cityUrgeAll: cityUrgeAll,
  regionUrgeCompany: regionUrgeCompany,
  regionUrgeCompanyCommit: regionUrgeCompanyCommit,
  regionUrgeAll: regionUrgeAll,
  userInfo: userInfo,
  getLastQuarter: getLastQuarter,
  quarterList: quarterList,
  quarterReport: quarterReport,
  quarterEdit: quarterEdit,
  qygetList: qygetList,
  monthReport: monthReport,
  newUserUrl: newUserUrl,
  newReport: newReport,
  getcomReport: getcomReport,
  monthPercent: monthPercent,
  delUserItemUrl: delUserItemUrl,
  userListUrl: userListUrl,
  editUserItemUrl: editUserItemUrl,
  companyListUrl: companyListUrl,
  newCompanyUrl: newCompanyUrl,
  delCompanyUrl: delCompanyUrl,
  editCompanyUrl: editCompanyUrl,
  monthInfo: monthInfo,
  monthEdit: monthEdit,
  infoByMonth: infoByMonth,
  kefuUrgeCompanyList: kefuUrgeCompanyList,
  kefuChangeCompanyUrge: kefuChangeCompanyUrge,
  kefuUrgeRegionList: kefuUrgeRegionList,
  kefuChangeRegionUrge: kefuChangeRegionUrge,
  unReportedUser: unReportedUser,
  areaReportList: areaReportList,
  getCompanyMsg: getCompanyMsg,
  getMsgCount: getMsgCount,
  getRegionMsg: getRegionMsg,
  yearAdd: yearAdd,
  yearList: yearList,
  yearDel: yearDel,
  privatrList: privatrList,
  privatrAdd: privatrAdd,
  privatrDel: privatrDel,
  cityreportList: cityreportList,
  reportImport: reportImport,
  checkImport: checkImport,
  reportInfo: reportInfo,
  countyCount: countyCount,
  wordsList: wordsList,
  addWords: addWords,
  replyWords: replyWords,
  wordsDetail: wordsDetail,
  cityNewsList: cityNewsList,
  newsDetail: newsDetail,
  addNews: addNews,
  editNews: editNews,
  delNews: delNews,
  newsTypes: newsTypes,
  comRegionNewsList: comRegionNewsList,
  addNotice: addNotice,
  editNotice: editNotice,
  noticeList: noticeList,
  noticeDetail: noticeDetail,
  delNotice: delNotice,
  getTargetByYear: getTargetByYear,
  setTargetByYear: setTargetByYear,
  targetGetYears: targetGetYears,
  getRegTypeList: getRegTypeList,
  getIndustryList: getIndustryList,
  getSelectedIndustry: getSelectedIndustry,
  getCompanyinfo: getCompanyinfo,
  getCompanyScore: getCompanyScore,
  getCompanyJifen: getCompanyJifen,
  getRegionJifen: getRegionJifen,
  getJifenArea: getJifenArea,
  getRegionScore: getRegionScore,
  getWenjuanList: getWenjuanList,
  importWenJuan: importWenJuan,
  getSurveyComsList: getSurveyComsList,
  delSurveyItem: delSurveyItem,
  editSurveyData: editSurveyData,
  addSurveyCom: addSurveyCom,

  reportInfoEx: reportInfoEx,
  citydwList: citydwList,
  citydwAdd: citydwAdd,
  citydwDel: citydwDel,
  elecList: elecList,
  elecCheck: elecCheck,
  elecReport: elecReport,
  asiReportImport: asiReportImport,
  asiCheckImport: asiCheckImport,
  asiReportFiles: asiReportFiles,
  getCityYears: getCityYears,
  getCityTags: getCityTags,
  cityCount: cityCount,
  cityfCount: cityfCount,
  monthCount: monthCount,
  directReport: directReport,
  groupSumCount: groupSumCount,
  getAsiYears: getAsiYears,
  getAsiTags: getAsiTags,
  asiTargetRate: asiTargetRate,
  asiCountyTargetRate: asiCountyTargetRate,
  asiCountyCount: asiCountyCount,
  asiCountyRateCount: asiCountyRateCount,
  elecYears: elecYears,
  elecTags: elecTags,
  elecityCount: elecityCount,
  elecCountyCount: elecCountyCount,
  areaMonthCount: areaMonthCount,
  areafmonthCount: areafmonthCount,
  areaetyCount: areaetyCount,
  comYears: comYears,
  comTags: comTags,
  comonthCount: comonthCount,
  compareCount: compareCount,
  cometyCount: cometyCount,
  informationList: informationList,
  msgList: msgList,
  getCountyReportStatus: getCountyReportStatus,
  getReportRateByArea: getReportRateByArea,
  getcityLastMonth: getcityLastMonth,
  reportImportEx: reportImportEx,
  areaReportEdit: areaReportEdit,
  QuestionList: QuestionList,
  cityIncrease: cityIncrease,
  citySurvey: citySurvey,
  cityTrend: cityTrend,
  cityGauge: cityGauge,
  citygetIndustry: citygetIndustry,
  mapDetail: mapDetail,
  levelCount: levelCount,
  levelList: levelList,
  productRanking: productRanking,
  productRankingList: productRankingList,
  evaluationCount: evaluationCount,
  evaluationCountList: evaluationCountList,
  satisfactionCount: satisfactionCount,
  satisfactionCountList: satisfactionCountList,
  distributionCount: distributionCount,
  checkDiffRate: checkDiffRate,
  getReportTmp: getReportTmp,
  reportUpload: reportUpload,
  reportDownload: reportDownload,
  subList: subList,
  groupRate: groupRate,
  reportCheck: reportCheck,
  cityAddList: cityAddList,
  cityAddSpeeds: cityAddSpeeds,
  cityIdyEty: cityIdyEty,
  poCheckImport: poCheckImport,
  idyMrEx: idyMrEx,
  cityPoInfo: cityPoInfo,
  poImport: poImport,
  poGetList: poGetList,
  T_reportImport: T_reportImport,
  T_reportImportEx: T_reportImportEx,
  T_reportEdit: T_reportEdit,
  T_checkImport: T_checkImport,
  T_reportList: T_reportList,
  T_reportInfoEx: T_reportInfoEx,
  T_reportCheck: T_reportCheck,
  T_reportExport: T_reportExport,
  T_reportInfo: T_reportInfo,
  T_unReportComs: T_unReportComs,
  T_comReportRate: T_comReportRate,
  T_getYears: T_getYears,
  T_getTags: T_getTags,
  T_monthCount: T_monthCount,
  T_fmonthCount: T_fmonthCount,
  T_comUserList: T_comUserList,
  T_comUserAdd: T_comUserAdd,
  T_comUserEdit: T_comUserEdit,
  T_comUserDelSet: T_comUserDelSet,
  T_getUrgeTowns: T_getUrgeTowns,
  T_allurge: T_allurge,
  T_userurge: T_userurge,
  T_allUrgeTowns: T_allUrgeTowns,
  T_urgeTowns: T_urgeTowns,
  T_getUrgelist: T_getUrgelist,
  tsIdyGroups: tsIdyGroups,
  Only_getList: Only_getList,
  Only_tsIdyGroups: Only_tsIdyGroups,
  Only_tsGroupRate: Only_tsGroupRate,
  Only_tsGroupTags: Only_tsGroupTags,
  Only_tsSubGroupRate: Only_tsSubGroupRate,
  Only_tsComTags: Only_tsComTags,
  Only_tsComUpspeed: Only_tsComUpspeed,
  Only_tsGroupCountyRate: Only_tsGroupCountyRate,
  testData: testData,
  tsSubGroupCountyRate: tsSubGroupCountyRate,
  idyGis: idyGis,
  stopComs_area: stopComs_area,
  stopComs_town: stopComs_town,
  unReportedCompany: unReportedCompany,
  importCompanyReports: importCompanyReports,
  otherCompanyReportList: otherCompanyReportList,
  Only_otherCompanyReportList: Only_otherCompanyReportList,
  addQYAppeal: addQYAppeal,
  appealGroup: appealGroup,
  appealList: appealList,
  appealInfo: appealInfo,
  appealEvaluation: appealEvaluation,
  appealAskAgain: appealAskAgain,
}
