var debug = false

function printError (key, message) {
  if (debug) {
    if (typeof(message) == 'undefined') {
      window.console.error(key)
    } else {
      window.console.error(key, message)
    }
  }
}

function printWarn (key, message) {
  if (debug) {
    if (typeof(message) == 'undefined') {
      window.console.warn(key)
    } else {
      window.console.warn(key, message)
    }
  }
}

function printLog (key, message) {
  if (debug) {
    if (typeof(message) == 'undefined') {
      window.console.log(key)
    } else {
      window.console.log(key, message)
    }
  }
}

function printDebug (key, message) {
  if (debug) {
    if (typeof(message) == 'undefined') {
      window.console.debug(key)
    } else {
      window.console.debug(key, message)
    }
  }
}

module.exports = {
  printError: printError,
  printWarn: printWarn,
  printLog: printLog,
  printDebug: printDebug,
}

