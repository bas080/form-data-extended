const test = require('tape')
const formData = require('./form-data')
const formDataData = obj => formData(obj).data
const {spy, original, calls} = require('spyn')
const File = require('./file.mock')
const FormData = require('./form-data.mock')

global.FormData = FormData
global.File = File

test('creates correctly "nested" keys', t => {
  const file = new File()

  t.ok(formData() instanceof FormData)
  t.ok(formData({}) instanceof FormData)

  t.deepEqual(formDataData({a: file}), {a: file})

  t.deepEqual(formDataData({a: {b: file}}), {'a[b]': file})

  t.deepEqual(formDataData({a: {b: 1}}), {'a[b]': 1})

  t.end()
})

test('supports normal ordered arrays', t => {
  FormData.prototype.append = spy(FormData.prototype.append)
  const instance = formData({a: [1, 2]})

  t.deepEqual(calls(FormData.prototype.append), [
    {
      arguments: ['a[]', 1],
      return: undefined,
    },
    {
      arguments: ['a[]', 2],
      return: undefined,
    },
  ])

  FormData.prototype.append = original(FormData.prototype.append)

  t.end()
})

test('supports boolean data', t => {
  t.deepEqual(formDataData({a: true}), {a: true})
  t.deepEqual(formDataData({a: false}), {a: false})

  t.end()
})

test('does not append when the array is empty', t => {
  t.deepEqual(formDataData({a: []}), {})

  t.end()
})

test('does not append when a value is nil', t => {
  t.deepEqual(formDataData({a: null}), {})

  t.end()
})
