import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import admin from './modules/admin'

Vue.use(Vuex)

// 应用初始状态
const state = {
    //用户信息
    username: '',
    userType: '',
    token: ''
}

// 定义所需的 mutations
const mutations = {
    GETUSERlOGININFO (state, data) {
        console.log('state', data)
        state.username = data.username || ""
        state.userType = data.userType || ""
        state.token = data.token || ""
    },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules:{
        admin
    }
})