/**
 * 封装的axios和ajax 一般用axios足够
 * 如果有jsonp需求可以使用zport的ajax;
*/
import axios from 'axios'
import Qs from 'qs'

// 配置下全局axios的基础
axios.interceptors.request.use(
    config => {
        let resHeader = JSON.parse(sessionStorage.getItem('userToken')) ? JSON.parse(sessionStorage.getItem('userToken')) :{};
        if(resHeader['token']){
            config['headers']['common']['X-Access-Token'] = resHeader['token'];
        }
        return config
    },
    error => Promise.reject(error) )

axios.interceptors.response.use(function (response) { 
    // token 已过期，重定向到登录页面  
    // if (response.status + '' === '500'){  
    //     sessionStorage.removeItem('userToken');
    //     router.push({ path: '/login' }); 
    // }  
    return response  
}, function (error) {
    let res = error.response.data;
    // token 已过期，重定向到登录页面 
    if(error.response.status + ''==='500' && res.message + '' === 'Token失效，请重新登录'){
        sessionStorage.removeItem('userToken');
        router.push({ path: '/login' }); 
    } else {
        error => Promise.reject(error)
    }
});
export default async (apiurl = '', params = {}, type = 'GET', method = 'axios') => {
    type = type.toUpperCase()
    if (method == 'axios') {
        return new Promise((resolve, reject) => {
            axios({
                method: type,
                url: apiurl,
                headers: {
                     'Content-Type': 'application/json;charset=utf-8',
                },
                data: type !== 'GET' ? params : '',
                params: type == 'GET' ? params : '',
                // timeout: appConfigs.timeout,
                /* 开启跨域cookie携带 */
                withCredentials : false,
                crossDomain: false
            }).then(res => {
                resolve(res)
            }).catch(err => {
                //util.vueEvent.$emit('disloading')
                reject(err)
            })
        });
    } else {

        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiurl,
                dataType: 'jsonp',
                data: params,
                jsonp: 'callback',
                success: function (res) {
                    resolve(res)
                },
                error: function (res) {
                    reject(res)
                }
                // timeout: 50000
            })
        });
    }
}
