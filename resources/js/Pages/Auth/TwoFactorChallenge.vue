<template>
  <AuthenticationCard>
    <div class="text-sm mb-4 text-gray-600">
      <template v-if="!recovery">
        Please confirm access to your account by entering the authentication code provided by your
        authenticator application.
      </template>

      <template v-else>
        Please confirm access to your account by entering one of your emergency recovery codes.
      </template>
    </div>

    <ValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
      <div v-if="!recovery">
        <Label for="code" value="Code" />
        <Input
          ref="code"
          id="code"
          type="text"
          inputmode="numeric"
          v-model="form.code"
          autofocus
          autocomplete="one-time-code"
          class="mt-1"
        />
      </div>

      <div v-else>
        <Label for="recovery_code" value="Recovery Code" />
        <Input
          ref="recoveryCode"
          id="recovery_code"
          type="text"
          v-model="form.recovery_code"
          autocomplete="one-time-code"
          class="mt-1"
        />
      </div>

      <div class="flex mt-4 items-center justify-end">
        <button
          type="button"
          class="cursor-pointer text-sm text-gray-600 underline hover:text-gray-900"
          @click.prevent="toggleRecovery"
        >
          <template v-if="!recovery"> Use a recovery code </template>

          <template v-else> Use an authentication code </template>
        </button>

        <Button class="ml-4" :disabled="form.processing" type="submit"> Log in </Button>
      </div>
    </form>
  </AuthenticationCard>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent, nextTick, ref } from 'vue';

import AuthenticationCard from '@/components/AuthenticationCard.vue';
import Button from '@/components/Elements/Button.vue';
import Input from '@/components/Elements/Input.vue';
import Label from '@/components/Elements/Label.vue';
import ValidationErrors from '@/components/ValidationErrors.vue';

export default defineComponent({
  components: {
    AuthenticationCard,
    Button,
    Input,
    Label,
    ValidationErrors,
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

    return { recovery, form, recoveryCode, code, toggleRecovery, submit };
  },
});
</script>
