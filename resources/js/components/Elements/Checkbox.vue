<template>
  <input
    class="rounded border-gray-300 text-indigo-600 h-4 w-4 focus:ring-indigo-500 hover:border-gray-400"
    type="checkbox"
    v-model="proxyChecked"
    :value="value"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';

type Checked = string[] | boolean;

export default defineComponent({
  emits: ['update:checked'],

  props: {
    checked: {
      type: [Array, Boolean] as PropType<Checked>,
      default: false,
    },
    value: {
      type: String,
    },
  },

  setup(props, { emit }) {
    const proxyChecked = computed({
      get(): Checked {
        return props.checked;
      },

      set(val: Checked) {
        emit('update:checked', val);
      },
    });

    return { proxyChecked };
  },
});
</script>
