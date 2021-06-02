<template>
  <div class="font-sans text-gray-900 antialiased">
    <div class="bg-gray-100 pt-4">
      <div class="flex flex-col min-h-screen pt-6 items-center sm:pt-0">
        <div>
          <AuthenticationCardLogo />
        </div>

        <div
          v-html="policy"
          class="bg-white shadow-md mt-6 w-full p-6 overflow-hidden prose sm:(rounded-lg max-w-2xl)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AuthenticationCardLogo from '@/components/Logo/AuthenticationCardLogo.vue';

export default defineComponent({
  components: {
    AuthenticationCardLogo,
  },

  props: {
    policy: String,
  },
});
</script>
