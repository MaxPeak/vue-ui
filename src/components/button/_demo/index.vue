<template>
  <div style="margin-bottom: 10px">
    <v-button type="default" @click="handleClick">default</v-button>
    <v-button type="primary">primary</v-button>
    <v-button type="link">link</v-button>
  </div>
  <div style="margin-bottom: 10px">
    <v-button type="default" disabled @click="handleClick">default</v-button>
    <v-button type="primary" disabled>primary</v-button>
    <v-button type="link" disabled>link</v-button>
  </div>
  <div style="margin-bottom: 10px">
    <v-button type="default" loading @click="handleClick">default</v-button>
    <v-button type="primary" loading>primary</v-button>
    <v-button shape="circle" loading>c</v-button>
    <v-button type="link" loading>link</v-button>
  </div>
  <div style="margin-bottom: 10px">
    <v-button size="large">large</v-button>
    <v-button size="medium">medium</v-button>
    <v-button size="small">small</v-button>
  </div>
  <div style="margin-bottom: 10px">
    <v-button shape="round">round</v-button>
    <v-button shape="circle">c</v-button>
  </div>
  <div style="margin-bottom: 10px">
    <v-button block>block</v-button>
  </div>
  <div style="margin-bottom: 10px">
    <v-button shape="circle">circle</v-button>
    <v-button style="max-width: 100px">circlecirclecirclecirclecircle</v-button>
  </div>
  <div style="margin-bottom: 10px">
    <v-button href="https://baidu.com">baidu.com</v-button>
    <v-button type="link" href="https://baidu.com">baidu.com</v-button>
    <v-button type="link" href="https://baidu.com" target>baidu.com</v-button>
    <v-button type="link" href="https://baidu.com" disabled>baidu.com</v-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "vue-ui/index";

export default defineComponent({
  components: {
    [Button.name]: Button,
  },
  setup() {
    return {
      handleClick: () => {
        console.log("click");
      },
    };
  },
});
</script>
