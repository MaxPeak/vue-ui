<template>
  <component :is="demo" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
const modules = import.meta.globEager("./components/*/_demo/index.vue");
const demos = Object.entries(modules).reduce((res, [path, mod]) => {
  const name = path.replace(/\.\/components\/(.*)\/_demo\/index\.vue/, "$1");
  res[`${name}-demo`] = mod.default;
  return res;
}, {} as { [key: string]: any });

export default defineComponent({
  components: demos,
  setup() {
    const demo = ref<string>("ellipsis-demo");
    return {
      demo,
    };
  },
});
</script>


