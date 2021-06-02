<template>
  <div>
    <Banner />

    <div class="min-h-screen bg-gray-100">
      <Navbar />

      <!-- Page Heading -->
      <header class="bg-white shadow" v-if="$slots.header">
        <div class="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
          <slot name="header"></slot>
        </div>
      </header>

      <!-- Page Content -->
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Banner from '@/components/AppLayout/Banner.vue';
import Navbar from '@/components/AppLayout/Navbar.vue';

export default defineComponent({
  components: {
    Banner,
    Navbar,
  },

  setup() {
    const showingNavigationDropdown = ref(false);

    return { showingNavigationDropdown };
  },
});
</script>
