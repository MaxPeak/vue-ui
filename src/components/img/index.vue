<template>
  <div :class="bem([{ preview, error }])">
    <img
      v-if="!error"
      :style="fitStyle"
      v-bind="$attrs"
      :src="src"
      @load="loaded = true"
      @error="error = true"
    />

    <div
      v-if="!loaded && !error && (placeholder || $slots.placeholder)"
      :class="bem('placeholder')"
    >
      <slot name="placeholder">
        <img v-bind="$attrs" :src="placeholder" />
      </slot>
    </div>

    <slot v-if="error" name="fallback">
      <img v-bind="$attrs" :src="fallback" />
    </slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  CSSProperties,
  computed,
  ref,
  watch,
} from "vue";
import { createNamespace } from "../_uitls/index";
const [componentName, bem] = createNamespace("img");

export default defineComponent({
  name: componentName,
  props: {
    src: String,
    fallback: String,
    placeholder: String,
    fit: String as PropType<CSSProperties["objectFit"]>,
    fitPosition: String as PropType<CSSProperties["objectPosition"]>,
    preview: Boolean,
  },
  setup(props) {
    const error = ref(false);
    const loaded = ref(false);
    watch(
      () => props.src,
      () => {
        loaded.value = false;
      }
    );

    const fitStyle = computed(() => ({
      objectFit: props.fit,
      objectPosition: props.fitPosition,
    }));
    return {
      bem,
      fitStyle,
      error,
      loaded,
    };
  },
});
</script>

<style lang="scss">
.v-img {
  display: inline-block;
  position: relative;
  &__placeholder {
    position: absolute;
    left: 0;
    top: 0;
  }
  &--preview {
    cursor: zoom-in;
  }
}
</style>
