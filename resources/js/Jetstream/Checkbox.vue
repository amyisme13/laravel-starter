<template>
  <input
    type="checkbox"
    :value="value"
    v-model="proxyChecked"
    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
