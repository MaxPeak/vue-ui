export default {
  store: {},
  on (name, cb) {
    this.store[name] = cb
  },
  emit (name, params) {
    this.store[name](params)
  }
}