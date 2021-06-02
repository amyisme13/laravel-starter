<template>
  <AppLayout>
    <template #header>
      <h2 class="font-semibold text-xl leading-tight text-gray-800">Profile</h2>
    </template>

    <div>
      <div class="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
        <div v-if="$page.props.jetstream.canUpdateProfileInformation && $page.props.user">
          <UpdateProfileInformationForm :user="$page.props.user" />

          <SectionBorder />
        </div>

        <div v-if="$page.props.jetstream.canUpdatePassword">
          <UpdatePasswordForm class="mt-10 sm:mt-0" />

          <SectionBorder />
        </div>

        <div v-if="$page.props.jetstream.canManageTwoFactorAuthentication">
          <TwoFactorAuthenticationForm class="mt-10 sm:mt-0" />

          <SectionBorder />
        </div>

        <LogoutOtherBrowserSessionsForm :sessions="sessions" class="mt-10 sm:mt-0" />

        <template v-if="$page.props.jetstream.hasAccountDeletionFeatures">
          <SectionBorder />

          <DeleteUserForm class="mt-10 sm:mt-0" />
        </template>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import AppLayout from '@/Layouts/AppLayout.vue';
import DeleteUserForm from './DeleteUserForm.vue';
import LogoutOtherBrowserSessionsForm, { Session } from './LogoutOtherBrowserSessionsForm.vue';
import SectionBorder from '@/components/SectionBorder.vue';
import TwoFactorAuthenticationForm from './TwoFactorAuthenticationForm.vue';
import UpdatePasswordForm from './UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './UpdateProfileInformationForm.vue';

export default defineComponent({
  components: {
    AppLayout,
    DeleteUserForm,
    LogoutOtherBrowserSessionsForm,
    SectionBorder,
    TwoFactorAuthenticationForm,
    UpdatePasswordForm,
    UpdateProfileInformationForm,
  },

  props: {
    sessions: {
      type: Array as PropType<Session[]>,
      required: true,
    },
  },
});
</script>
