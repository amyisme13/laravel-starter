<template>
  <jet-authentication-card>
    <template #logo>
      <jet-authentication-card-logo />
    </template>

    <div class="mb-4 text-sm text-gray-600">
      <template v-if="!recovery">
        Please confirm access to your account by entering the authentication code provided by your
        authenticator application.
      </template>

      <template v-else>
        Please confirm access to your account by entering one of your emergency recovery codes.
      </template>
    </div>

    <jet-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div v-if="!recovery">
        <jet-label for="code" value="Code" />
        <jet-input
          ref="code"
          id="code"
          type="text"
          inputmode="numeric"
          class="mt-1 block w-full"
          v-model="form.code"
          autofocus
          autocomplete="one-time-code"
        />
      </div>

      <div v-else>
        <jet-label for="recovery_code" value="Recovery Code" />
        <jet-input
          ref="recoveryCode"
          id="recovery_code"
          type="text"
          class="mt-1 block w-full"
          v-model="form.recovery_code"
          autocomplete="one-time-code"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <button
          type="button"
          class="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
          @click.prevent="toggleRecovery"
        >
          <template v-if="!recovery"> Use a recovery code </template>

          <template v-else> Use an authentication code </template>
        </button>

        <jet-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Log in
        </jet-button>
      </div>
    </form>
  </jet-authentication-card>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent, nextTick, ref } from 'vue';

import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.vue';
import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetInput from '@/Jetstream/Input.vue';
import JetLabel from '@/Jetstream/Label.vue';
import JetValidationErrors from '@/Jetstream/ValidationErrors.vue';

export default defineComponent({
  components: {
    JetAuthenticationCard,
    JetAuthenticationCardLogo,
    JetButton,
    JetInput,
    JetLabel,
    JetValidationErrors,
  },

  setup() {
    const recovery = ref(false);
    const form = useForm({
      code: '',
      recovery_code: '',
    });

    const recoveryCode = ref<HTMLInputElement>();
    const code = ref<HTMLInputElement>();

    const toggleRecovery = () => {
      recovery.value = !recovery.value;

      nextTick(() => {
        if (recovery.value) {
          recoveryCode.value?.focus();
          form.code = '';
        } else {
          code.value?.focus();
          form.recovery_code = '';
        }
      });
    };

    const submit = () => {
      form.post(window.route('two-factor.login'));
    };

    return { recovery, form, toggleRecovery, submit };
  },
});
</script>
