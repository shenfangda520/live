
/* API接口 */
/**
 * vhttp(url,params,httpType,method)
 * @url APIurl的地址。
 * @params 请求的参数。
 * @httpType 请求的类型 GET POST。
 * @method 请求方法 ajax（jsonp) 或者 axios 默认axios。
 * @return Promise;
 * 规范 ： 命名前缀需要 type_*  get_baidu  post_baidu。接口地址需要添加注释.
 */
/**香河防火墙只支持post 和 get 所以以下方法 delete ==>get POST===> post**/
/* 请求URL地址 */
import vhttp from './vhttprequest'

// let URLWEBHTTP = process.env.BASE_API;

let URLWEBHTTP = "http://120.52.96.42:8080" // 测试环境

if (process.env.NODE_ENV === 'production' && process.env.BASE_API === 'prod') {
    URLWEBHTTP = "http://" + window.location.hostname + ":8198";
}
// 登录&登出
//export const login = params => vhttp(URLWEBHTTP + '/sys/login', params, 'POST');

