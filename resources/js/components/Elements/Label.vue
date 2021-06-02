<template>
  <label class="font-medium text-sm text-gray-700 block">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot></slot></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: String,
  },
});
</script>
