<template>
  <ActionSection>
    <template #title> Browser Sessions </template>

    <template #description>
      Manage and log out your active sessions on other browsers and devices.
    </template>

    <template #content>
      <div class="max-w-xl text-sm text-gray-600">
        If necessary, you may log out of all of your other browser sessions across all of your
        devices. Some of your recent sessions are listed below; however, this list may not be
        exhaustive. If you feel your account has been compromised, you should also update your
        password.
      </div>

      <!-- Other Browser Sessions -->
      <div class="space-y-6 mt-5" v-if="sessions.length > 0">
        <div class="flex items-center" v-for="(session, i) in sessions" :key="i">
          <div>
            <DesktopComputerIcon
              v-if="session.agent.is_desktop"
              class="h-8 text-gray-500 w-8"
              aria-hidden="true"
            />

            <DeviceMobileIcon v-else class="h-8 text-gray-500 w-8" aria-hidden="true" />
          </div>

          <div class="ml-3">
            <div class="text-sm text-gray-600">
              {{ session.agent.platform }} - {{ session.agent.browser }}
            </div>

            <div>
              <div class="text-xs text-gray-500">
                {{ session.ip_address }},

                <span class="font-semibold text-green-500" v-if="session.is_current_device">
                  This device
                </span>

                <span v-else>Last active {{ session.last_active }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex mt-5 items-center">
        <ConfirmsPassword
          title="Log Out Other Browser Sessions"
          content="Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices."
          button="Log Out Other Browser Sessions"
          @confirmed="logoutOtherBrowserSessions"
        >
          <Button :disabled="deleteForm.processing"> Log Out Other Browser Sessions </Button>
        </ConfirmsPassword>

        <ActionMessage :on="deleteForm.recentlySuccessful" class="ml-3"> Done. </ActionMessage>
      </div>
    </template>
  </ActionSection>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { DesktopComputerIcon, DeviceMobileIcon } from '@heroicons/vue/outline';

import ActionMessage from '@/components/ActionMessage.vue';
import ActionSection from '@/components/ActionSection.vue';
import Button from '@/components/Elements/Button.vue';
import ConfirmsPassword from '@/components/ConfirmsPassword.vue';

export interface Session {
  ip_address: string;
  is_current_device: boolean;
  last_active: string;
  agent: {
    is_desktop: boolean;
    platform: string;
    browser: string;
  };
}

export default defineComponent({
  components: {
    ActionMessage,
    ActionSection,
    Button,
    ConfirmsPassword,
    DesktopComputerIcon,
    DeviceMobileIcon,
  },

  props: {
    sessions: {
      type: Array as PropType<Session[]>,
      required: true,
    },
  },

  setup() {
    const deleteForm = useForm({});
    const logoutOtherBrowserSessions = () => {
      deleteForm.delete(window.route('other-browser-sessions.destroy'), {
        preserveScroll: true,
      });
    };

    return {
      deleteForm,
      logoutOtherBrowserSessions,
    };
  },
});
</script>
