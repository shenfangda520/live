var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    //吴延刚 
  
    BASE_API: '"http://192.168.1.125:8080"',
    BASE_PRIVIEW: '"http://192.168.1.125:8080"'
    // 袁鑫
    // BASE_API: '"http://192.168.1.158:8080"',
    // BASE_PRIVIEW: '"http://192.168.1.158:8080"'
})