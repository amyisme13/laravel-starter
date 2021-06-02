<template>
  <p v-show="message" class="text-sm text-red-600">
    {{ message }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    message: String,
  },
});
</script>
