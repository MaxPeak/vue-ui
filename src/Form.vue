<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
import {defineComponent} from 'vue'
import emitter from './emitter'
export default defineComponent({
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: Object
  },
  data () {
    return {
      fields: []
    }
  },
  created() {
    emitter.on('form.addField', field => {
      this.fields.push(field)
    })
  },
  methods: {
    reset () {
      this.fields.forEach(field => {
        field.reset()
      })
    }
  }
})
</script>