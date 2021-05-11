<template>
  <div>
    <button
      type="submit"
      class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
      v-if="tag == 'button'"
    >
      <slot></slot>
    </button>

    <a
      :href="href"
      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
      v-else-if="tag == 'a'"
    >
      <slot></slot>
    </a>

    <inertia-link
      :href="href"
      class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
      v-else
    >
      <slot></slot>
    </inertia-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    href: String,
    tag: String,
  },
});
</script>
