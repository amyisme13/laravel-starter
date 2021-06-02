<template>
  <AppLayout>
    <template #header>
      <h2 class="font-semibold text-xl leading-tight text-gray-800">API Tokens</h2>
    </template>

    <div>
      <div class="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
        <ApiTokenManager
          :tokens="tokens"
          :available-permissions="availablePermissions"
          :default-permissions="defaultPermissions"
        />
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ApiTokenManager from './ApiTokenManager.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

export default defineComponent({
  props: ['tokens', 'availablePermissions', 'defaultPermissions'],

  components: {
    ApiTokenManager,
    AppLayout,
  },
});
</script>
