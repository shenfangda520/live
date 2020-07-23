function isNetNormal () {
  if (navigator && navigator.onLine === false) {
    return false
  } else {
    return true
  }
}
module.exports = {
  isNetNormal: isNetNormal
}

