<template>
  <div class="form-item">
    <slot></slot>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import emitter from './emitter'
export default defineComponent({
  inject: ['form'],
  props: {
    prop: String
  },
  mounted () {
    if (this.prop === undefined) return
    this.initialValue = this.form.model[this.prop]
    emitter.emit('form.addField', {
      reset: this.reset
    });
  },
  methods: {
    reset () {
      this.form.model[this.prop] = this.initialValue
    }
  }
})
</script>