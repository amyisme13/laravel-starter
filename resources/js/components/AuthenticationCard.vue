<template>
  <div class="flex flex-col min-h-screen bg-gray-100 pt-6 items-center sm:(justify-center pt-0)">
    <div>
      <slot name="logo">
        <AuthenticationCardLogo />
      </slot>
    </div>

    <div class="bg-white shadow-md mt-6 w-full py-4 px-6 overflow-hidden sm:(max-w-md rounded-lg)">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AuthenticationCardLogo from '@/components/Logo/AuthenticationCardLogo.vue';

export default defineComponent({
  components: { AuthenticationCardLogo },
});
</script>
