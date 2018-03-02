const isArray = Array.isArray
const cond = require('lodash.cond')
const isNil = require('lodash.isnil')
const toPairs = require('lodash.topairs')
const isObject = require('lodash.isobject')
const noop = () => null
const isFile = f => f instanceof File

function isEmpty(v) {
  return isArray(v) && v.length === 0
}

function anyPass(predFns) {
  return (...args) => predFns.some(predFn => predFn(...args))
}

function allPass(predFns) {
  return (...args) => predFns.every(predFn => predFn(...args))
}

function not(predFn) {
  return (...args) => !predFn(...args)
}

module.exports = {
  isArray,
  cond,
  anyPass,
  isNil,
  allPass,
  toPairs,
  isObject,
  not,
  noop,
  isFile,
  isEmpty,
}
