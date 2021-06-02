<template>
  <FormSection @submitted="updatePassword">
    <template #title> Update Password </template>

    <template #description>
      Ensure your account is using a long, random password to stay secure.
    </template>

    <template #form>
      <div class="col-span-6 sm:col-span-4">
        <Label for="current_password" value="Current Password" />
        <Input
          id="current_password"
          type="password"
          v-model="form.current_password"
          ref="currentPassword"
          autocomplete="current-password"
          class="mt-1"
        />
        <InputError :message="form.errors.current_password" class="mt-2" />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <Label for="password" value="New Password" />
        <Input
          id="password"
          type="password"
          v-model="form.password"
          ref="password"
          autocomplete="new-password"
          class="mt-1"
        />
        <InputError :message="form.errors.password" class="mt-2" />
      </div>

      <div class="col-span-6 sm:col-span-4">
        <Label for="password_confirmation" value="Confirm Password" />
        <Input
          id="password_confirmation"
          type="password"
          v-model="form.password_confirmation"
          autocomplete="new-password"
          class="mt-1"
        />
        <InputError :message="form.errors.password_confirmation" class="mt-2" />
      </div>
    </template>

    <template #actions>
      <ActionMessage :on="form.recentlySuccessful" class="mr-3"> Saved. </ActionMessage>

      <Button :disabled="form.processing" type="submit"> Save </Button>
    </template>
  </FormSection>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent, ref } from 'vue';

import ActionMessage from '@/components/ActionMessage.vue';
import Button from '@/components/Elements/Button.vue';
import FormSection from '@/components/FormSection.vue';
import Input from '@/components/Elements/Input.vue';
import InputError from '@/components/Elements/InputError.vue';
import Label from '@/components/Elements/Label.vue';

export default defineComponent({
  components: {
    ActionMessage,
    Button,
    FormSection,
    Input,
    InputError,
    Label,
  },

  setup() {
    const form = useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });

    const password = ref<HTMLInputElement>();
    const currentPassword = ref<HTMLInputElement>();

    const updatePassword = () => {
      form.put(window.route('user-password.update'), {
        errorBag: 'updatePassword',
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
        },
        onError: () => {
          if (form.errors.password) {
            form.reset('password', 'password_confirmation');
            password.value?.focus();
          }

          if (form.errors.current_password) {
            form.reset('current_password');
            currentPassword.value?.focus();
          }
        },
      });
    };

    return { password, currentPassword, form, updatePassword };
  },
});
</script>
