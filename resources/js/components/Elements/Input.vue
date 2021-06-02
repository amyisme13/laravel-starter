<template>
  <input
    class="rounded-md border-gray-300 shadow-sm w-full block sm:text-sm focus:(ring-indigo-500 border-indigo-500)"
    @input="onInput"
    ref="input"
    :value="modelValue"
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

    return { input, focus, onInput };
  },
});
</script>
