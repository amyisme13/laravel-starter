<template>
  <button
    :type="type"
    class="border rounded-md font-medium shadow-sm text-sm py-2 px-4 inline-flex justify-center focus:(outline-none ring-2 ring-offset-2) disabled:opacity-25"
    :class="variantClasses"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType, ButtonHTMLAttributes } from 'vue';

type Variants = 'primary' | 'secondary' | 'danger';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
    variant: {
      type: String as PropType<Variants>,
      default: 'primary',
    },
  },

  setup(props) {
    const variantClasses = computed(() => {
      switch (props.variant) {
        case 'secondary':
          return 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500';
        case 'danger':
          return 'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
        case 'primary':
        default:
          return 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500';
      }
    });

    return { variantClasses };
  },
});
</script>
