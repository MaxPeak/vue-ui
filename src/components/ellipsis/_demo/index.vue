<template>
  <div style="margin-bottom: 10px">
    <button @click="toggle = !toggle">toggle</button>
    <br />
    <v-ellipsis :line="1"> {{ text }} </v-ellipsis>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Ellipsis } from "vue-ui/index";

export default defineComponent({
  components: {
    [Ellipsis.name]: Ellipsis,
  },
  setup() {
    const toggle = ref(true);
    const text = computed(() => {
      if (toggle.value)
        return "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem corporis nisi dicta fuga asperiores optio laboriosam adipisci minima recusandae! Incidunt obcaecati repudiandae eligendi possimus delectus. Cupiditate saepe non laudantium atque.";
      return "Lorem ipsum, dolor sit amet consectetur adipisicing elit.";
    });
    return {
      text,
      toggle,
    };
  },
});
</script>
