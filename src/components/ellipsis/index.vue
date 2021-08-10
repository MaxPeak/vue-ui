<template>
  <span ref="ellipsisRef" :class="bem()">
    <slot />
    <!-- <slot name="prefix">prefix</slot>
    <slot name="symbol">...</slot>
    <slot name="suffix">suffix</slot>
    <slot name="handle">handle</slot> -->
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  Slots,
  VNodeNormalizedChildren,
  reactive,
} from "vue";
import { createNamespace } from "../_uitls/index";
const [componentName, bem] = createNamespace("ellipsis");

/**
 * todo
 * 自定义行数
 * 自定义symbol
 * 支持扩展slot
 * 支持元素/文本打点
 *
 * 内容变化和ellipsis元素本身变化都应该重新计算
 */

const isOverflow = (content: VNodeNormalizedChildren) => {};

const update = () => {};

const getContent = (slots: Slots) => {
  const [content] = slots.default ? slots.default() : [];
  return content?.children;
};

// const layout = () => {
//   // getClientRects()
//   const ellipsis = ref<HTMLElement>();
//   const range = document.createRange();
//   range.setStart(ellipsis.value!, 0);
//   range.setEnd(ellipsis.value!, ellipsis.value!.childNodes.length);
//   const rangeWidth = range.getBoundingClientRect().width;
//   return toRefs({ ellipsis });
// };

export default defineComponent({
  name: componentName,
  props: {
    line: {
      type: Number,
      default: 1,
      validator: (val: number) => val > 0 && Number.isInteger(val),
    },
  },
  setup(props, { slots }) {
    const content = getContent(slots);
    const res = isOverflow(content);
    const ellipsisRef = ref<HTMLElement>();
    onMounted(() => {
      // update();
      if (!ellipsisRef.value) return;
      console.log(ellipsisRef.value.getClientRects());
    });
    return {
      bem,
      ellipsisRef,
    };
  },
});
</script>

<style lang="scss">
.v-ellipsis {
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // box-sizing: border-box;
  // word-break: break-all;
  // width: 100%;
}
</style>
