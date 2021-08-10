<template>
  <component
    v-wave="type === 'link' ? 'transparent' : '#1890ff'"
    :is="tag"
    :class="
      bem([
        type,
        size,
        type !== 'link' ? shape : '',
        { loading, disabled, block: block && type !== 'link' },
      ])
    "
    v-bind="buttonAttrs"
  >
    <span v-if="loading" :class="bem('loading')" />
    <span v-if="!loading || shape !== 'circle'" class="ellipsis">
      <slot />
    </span>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, ButtonHTMLAttributes, computed } from "vue";
import { createNamespace } from "../_uitls/index";
import wave from "../_directives/wave";
const [componentName, bem] = createNamespace("button");

export type ButtonSize = "large" | "medium" | "small";
export type ButtonShape = "round" | "circle";
export type ButtonType = "primary" | "default" | "link";

export default defineComponent({
  name: componentName,
  directives: {
    wave,
  },
  props: {
    loading: Boolean,
    block: Boolean,
    disabled: Boolean,
    href: String,
    target: Boolean,
    shape: String as PropType<ButtonShape>,
    size: {
      type: String as PropType<ButtonSize>,
      default: "medium",
    },
    nativeType: {
      type: String as PropType<ButtonHTMLAttributes["type"]>,
      default: "button",
    },
    type: {
      type: String as PropType<ButtonType>,
      default: "default",
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const tag = computed(() => (props.href ? "a" : "button"));
    const buttonAttrs = computed(() => {
      if (!props.href) {
        return {
          type: props.nativeType,
          disabled: props.disabled || props.loading,
          onClick: (e: MouseEvent) => emit("click", e),
        };
      }
      return {
        href: props.href,
        rel: "noopener noreferrer",
        target: props.target ? "_blank" : null,
        onClick: (e: MouseEvent) => {
          if (!props.disabled) return;
          e.preventDefault();
        },
      };
    });
    return {
      bem,
      tag,
      buttonAttrs,
    };
  },
});
</script>

<style lang="scss">
@import "../_styles/utils.scss";

.v-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  outline: none;
  font-weight: 400;
  text-decoration: none;
  user-select: none;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  touch-action: manipulation; // 解决由支持双击缩放手势引起的点击事件的延迟
  cursor: pointer;

  // type
  &--default {
    background-color: #fff;
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.65);
    &:not(:disabled) {
      &:hover,
      &:focus {
        border-color: #40a9ff;
        color: #40a9ff;
      }
      &:active {
        border-color: #096dd9;
        color: #096dd9;
      }
    }
    &.v-button__loading {
      border-color: rgba(0, 0, 0, 0.65);
    }
  }
  &--primary {
    background-color: #1890ff;
    border-color: #1890ff;
    color: #fff;
    &:not(:disabled) {
      &:hover,
      &:focus {
        background-color: #40a9ff;
        border-color: #40a9ff;
      }
      &:active {
        background-color: #096dd9;
        border-color: #096dd9;
      }
    }
    &.v-button__loading {
      border-color: #fff;
    }
  }
  &--link {
    height: auto !important;
    padding: 0 !important;
    background-color: transparent;
    border-color: transparent;
    color: #1890ff;
    &:not([class*="disabled"]):not([class*="loading"]) {
      &:hover,
      &:focus {
        color: #40a9ff;
      }
      &:active {
        color: #096dd9;
      }
    }
    &.v-button__loading {
      border-color: #1890ff;
    }
  }

  // size
  &--large {
    height: 40px;
    padding: 0 15px;
    font-size: 16px;
    &.v-button--circle {
      width: 40px;
    }
  }
  &--medium {
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    &.v-button--circle {
      width: 32px;
    }
  }
  &--small {
    height: 24px;
    padding: 0 7px;
    font-size: 14px;
    &.v-button--circle {
      width: 24px;
    }
  }

  // shape
  &--round {
    border-radius: 999px;
  }
  &--circle {
    padding: 0;
    border-radius: 50%;
    .v-button__loading {
      margin-right: 0;
    }
  }

  // block
  &--block {
    display: flex;
    width: 100%;
  }

  // loading
  &--loading {
    position: relative;
    cursor: wait;
    &::before {
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      z-index: 1;
      border-radius: inherit;
      background-color: rgba(255, 255, 255, 0.35);
      pointer-events: none;
      content: "";
    }
  }
  &__loading {
    width: 14px;
    height: 14px;
    margin-right: 5px;
    border-top: 1px solid;
    border-radius: 50%;
    animation: loadingCircle 1s linear infinite;
  }

  // disabled
  &--disabled {
    color: rgba(0, 0, 0, 0.25);
    &.v-button--primary,
    &.v-button--default {
      background-color: #f5f5f5;
      border-color: #d9d9d9;
    }
    cursor: not-allowed;
  }
}
@keyframes loadingCircle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
