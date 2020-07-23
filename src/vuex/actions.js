//test
export const increment = ({ commit }) => {
    commit('INCREMENT')
}
export const decrement = ({ commit }) => {
    commit('DECREMENT')
}
import { login } from '../api/api.js'
//用户信息提交
export const getUserLoginInfo = ({ commit }, userInfo) => {
    // console.log(userInfo)
    // login({ username: userInfo.account, password: userInfo.password })
    //     .then((res) => {
    //         if (res) {
    //             const data = res.data
    //             if (data.code === 0) {
    //                 commit('GETUSERlOGININFO', {
    //                     username: userInfo.account,
    //                     userType: userInfo.userType,
    //                     token: data.token,
    //                     msg: data.msg,
    //                     code: data.code
    //                 })
    //             } else {
    //                 commit('GETUSERlOGININFO', { msg: data.msg, code: data.code })
    //             }
    //         }
    //     })
    // .catch((err) => {
    //     console.log(this)
    //     this.$message({
    //         showClose: true,
    //         message: '网络异常，请检查网络',
    //         type: 'error'
    //     });
    // })
}