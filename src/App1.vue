<template>
  <!-- <v-form ref="form" :model="form">
    <form-item prop="value">
      <input type="text" v-model="form.value">
    </form-item>
    <form-item prop="value1">
      <input type="text" v-model="form.value1">
    </form-item>
    <form-item>
      <button type="button" @click="onReset">Reset</button>
    </form-item>
  </v-form> -->
  <v-form ref="form" :model="form">
    <form-item v-for="(value,key) in formData" :key="key" :prop="key">
      <input type="text" v-model="form[key]">
    </form-item>
    <form-item>
      <button type="button" @click="onReset">Reset</button>
    </form-item>
  </v-form>
</template>

<script>
import {defineComponent} from 'vue'
import Form from './Form.vue'
import Item from './Item.vue'

export default defineComponent({
  components: {
    VForm: Form,
    FormItem: Item
  },
  data () {
    return {
      // form: {
      //   value: '',
      //   value1: 0
      // },
      form: {
        value: '',
        value1: 0
      },
      formData: {
        value: {},
        value1: {}
      }
    }
  },
  methods: {
    onReset () {
      this.$refs.form.reset()
    }
  }
})
</script>


