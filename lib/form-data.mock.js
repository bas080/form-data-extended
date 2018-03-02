function FormData() {
  this.data = {}
}

FormData.prototype.append = function append(key, value) {
  this.data[key] = value
}

module.exports = FormData
