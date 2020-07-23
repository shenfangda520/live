module.exports = {
    proxy: {
        '/yuanxins': {  //将www.exaple.com印射为/apis
            target: 'http://192.168.1.158:8080', // 接口域名
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/apis': ''  //需要rewrite的,
            }
        },
        '/phps': {  // http://sunp.pa.ds99.me/index/utils/uploadFile
            target: 'http://sunp.pa.ds99.me', // 接口域名
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/phps': ''  //需要rewrite的,
            }
        }
     }
}