<template>
  <AuthenticationCard>
    <ValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <Label for="email" value="Email" />
        <Input id="email" type="email" class="mt-1" v-model="form.email" required autofocus />
      </div>

      <div class="mt-4">
        <Label for="password" value="Password" />
        <Input
          id="password"
          type="password"
          v-model="form.password"
          required
          autocomplete="new-password"
          class="mt-1"
        />
      </div>

      <div class="mt-4">
        <Label for="password_confirmation" value="Confirm Password" />
        <Input
          id="password_confirmation"
          type="password"
          v-model="form.password_confirmation"
          required
          autocomplete="new-password"
          class="mt-1"
        />
      </div>

      <div class="flex mt-4 items-center justify-end">
        <Button :disabled="form.processing" type="submit"> Reset Password </Button>
      </div>
    </form>
  </AuthenticationCard>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent } from 'vue';

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

  props: {
    email: String,
    token: String,
  },

  setup(props) {
    const form = useForm({
      token: props.token,
      email: props.email,
      password: '',
      password_confirmation: '',
    });

    const submit = () => {
      form.post(window.route('password.update'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
      });
    };

    return { form, submit };
  },
});
</script>
