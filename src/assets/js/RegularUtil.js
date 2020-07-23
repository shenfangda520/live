// 检测手机号
function checkPhone (phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false
  } else {
    return true
  }
}

// 检测汉字
function checkName (val) {
  if(!/^[\u4e00-\u9fa5]+$/.test(val)){
    return false
  } else {
    return true
  }
}

function checkSpance (val) {
  if (val == '' || val.indexOf(' ') != -1) {
    return false
  } else {
    return true
  }
}

module.exports = {
  checkPhone: checkPhone,
  checkName: checkName,
  checkSpance: checkSpance
}

