const {
  cond,
  isNil,
  isArray,
  noop,
  allPass,
  isEmpty,
  toPairs,
  compose,
  not,
  anyPass,
  isObject,
  isFile,
} = require('./helpers')

const isValue = anyPass([
  isFile,
  isArray,
  not(isObject),
])

/**
 * @param {Object} data - key values to append to the form data
 *
 * @retuns {FormData}
 */
function formData(data) {
  const formData = new FormData()

  const iter = (datum, path = []) =>
    isValue(datum)
      ? formDataAppend(datum, formData, path)
      : toPairs(datum).forEach(([key, value]) => iter(value, [...path, key]))

  iter(data)

  return formData
}

const formDataAppend = cond([
  [allPass([isArray, isEmpty]), noop],
  [isNil, noop],
  [
    isArray,
    (arr, formData, path) =>
      arr.forEach(item => formDataAppend(item, formData, [...path, ''])),
  ],
  [
    () => true,
    (datum, formData, path) => formData.append(formDataPath(path), datum),
  ],
])

function formDataPath([first, ...rest]) {
  return isEmpty(rest) ? first : `${first}[${rest.join('][')}]`
}

module.exports = formData
