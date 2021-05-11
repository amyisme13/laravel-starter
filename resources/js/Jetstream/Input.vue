<template>
  <input
    class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
    :value="modelValue"
    @input="onInput"
    ref="input"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: ['modelValue'],

  emits: ['update:modelValue'],

  setup(_, { emit }) {
    const input = ref<HTMLInputElement>();
    const focus = () => input.value?.focus();

    const onInput = (event: Event) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    };

    return { focus, onInput };
  },
});
</script>
