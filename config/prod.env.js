'use strict'
let buidType = process.argv.splice(2) || 'test';
// 默认为测试环境打包 npm run build  
console.log((buidType) + "打包")
// 默认开发环境
let baseApi = "'test'";
if(buidType + '' === 'test') {
    console.log('测试环境')
    baseApi = "'test'"
}
// if(buidType + '' === 'pre') {
//     console.log('测试环境')
//     baseApi = "'http://" + window.location.hostname + ":8098'"

// }
if(buidType + '' === 'prod') {
    console.log('生产环境')
    baseApi = "'prod'"

}
module.exports = {
    NODE_ENV: '"production"',
    BASE_API: baseApi
}
