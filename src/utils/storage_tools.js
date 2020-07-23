/*只有setItem在第一次登录会设置登录时会设置，设置一个七天免登录，后面只需要每次获取判断是否超期，一旦超期，就要清空localStorage的内容
* */
const validity = 1000 * 3600 * 24 * 7
export const setItem = function (data) {
    //
    sessionStorage.setItem('USER_KEY', JSON.stringify(data));

    sessionStorage.setItem('CREAT_TIME', Date.now());
}
// 添加用户信息
export const getItem = function () {
    const creatTime = sessionStorage.getItem('CREAT_TIME')
    if (Date.now() - creatTime > validity) {
        console.log('creatTime=' + creatTime)
        removeItem()
    }
    return JSON.parse(sessionStorage.getItem('USER_KEY'))
}
// 移除项目
export const removeItem = function () {
    console.log("移除")
    sessionStorage.clear();
    // sessionStorage.removeItem('USER_KEY')
    // sessionStorage.removeItem('CREAT_TIME')
}