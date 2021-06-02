<template>
  <ActionSection>
    <template #title> Two Factor Authentication </template>

    <template #description>
      Add additional security to your account using two factor authentication.
    </template>

    <template #content>
      <h3 class="text-lg font-medium text-gray-900" v-if="twoFactorEnabled">
        You have enabled two factor authentication.
      </h3>

      <h3 class="text-lg font-medium text-gray-900" v-else>
        You have not enabled two factor authentication.
      </h3>

      <div class="mt-3 max-w-xl text-sm text-gray-600">
        <p>
          When two factor authentication is enabled, you will be prompted for a secure, random token
          during authentication. You may retrieve this token from your phone's Google Authenticator
          application.
        </p>
      </div>

      <div v-if="twoFactorEnabled">
        <div v-if="qrCode">
          <div class="mt-4 max-w-xl text-sm text-gray-600">
            <p class="font-semibold">
              Two factor authentication is now enabled. Scan the following QR code using your
              phone's authenticator application.
            </p>
          </div>

          <div class="mt-4 dark:(p-4 w-56 bg-white)" v-html="qrCode"></div>
        </div>

        <div v-if="recoveryCodes.length > 0">
          <div class="mt-4 max-w-xl text-sm text-gray-600">
            <p class="font-semibold">
              Store these recovery codes in a secure password manager. They can be used to recover
              access to your account if your two factor authentication device is lost.
            </p>
          </div>

          <div class="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg">
            <div v-for="code in recoveryCodes" :key="code">
              {{ code }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div v-if="!twoFactorEnabled">
          <ConfirmsPassword @confirmed="enableTwoFactorAuthentication">
            <Button :disabled="enabling"> Enable </Button>
          </ConfirmsPassword>
        </div>

        <div v-else>
          <ConfirmsPassword @confirmed="regenerateRecoveryCodes">
            <Button variant="secondary" class="mr-3" v-if="recoveryCodes.length > 0">
              Regenerate Recovery Codes
            </Button>
          </ConfirmsPassword>

          <ConfirmsPassword @confirmed="showRecoveryCodes">
            <Button variant="secondary" class="mr-3" v-if="recoveryCodes.length === 0">
              Show Recovery Codes
            </Button>
          </ConfirmsPassword>

          <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
            <Button variant="danger" :disabled="disabling"> Disable </Button>
          </ConfirmsPassword>
        </div>
      </div>
    </template>
  </ActionSection>
</template>

<script lang="ts">
import { usePage } from '@inertiajs/inertia-vue3';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { computed, defineComponent, ref } from 'vue';

import ActionSection from '@/components/ActionSection.vue';
import Button from '@/components/Elements/Button.vue';
import ConfirmsPassword from '@/components/ConfirmsPassword.vue';

export default defineComponent({
  components: {
    ActionSection,
    Button,
    ConfirmsPassword,
  },

  setup() {
    const enabling = ref(false);
    const disabling = ref(false);

    const twoFactorEnabled = computed(() => {
      return !enabling.value && usePage().props.value.user?.two_factor_enabled;
    });

    const qrCode = ref('');
    const showQrCode = async () => {
      const response = await axios.get('/user/two-factor-qr-code');
      qrCode.value = response.data.svg;
    };

    const recoveryCodes = ref<string[]>([]);
    const showRecoveryCodes = async () => {
      const response = await axios.get('/user/two-factor-recovery-codes');
      recoveryCodes.value = response.data;
    };

    const regenerateRecoveryCodes = async () => {
      await axios.post('/user/two-factor-recovery-codes');
      await showRecoveryCodes();
    };

    const enableTwoFactorAuthentication = () => {
      enabling.value = true;

      Inertia.post(
        '/user/two-factor-authentication',
        {},
        {
          preserveScroll: true,
          onSuccess: () => Promise.all([showQrCode(), showRecoveryCodes()]),
          onFinish: () => (enabling.value = false),
        }
      );
    };

    const disableTwoFactorAuthentication = () => {
      disabling.value = true;

      Inertia.delete('/user/two-factor-authentication', {
        preserveScroll: true,
        onSuccess: () => {
          disabling.value = false;
        },
      });
    };

    return {
      enabling,
      disabling,
      twoFactorEnabled,
      qrCode,
      showQrCode,
      recoveryCodes,
      showRecoveryCodes,
      enableTwoFactorAuthentication,
      regenerateRecoveryCodes,
      disableTwoFactorAuthentication,
    };
  },
});
</script>
