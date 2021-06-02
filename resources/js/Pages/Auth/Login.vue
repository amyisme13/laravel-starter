<template>
  <AuthenticationCard>
    <ValidationErrors class="mb-4" />

    <div v-if="status" class="font-medium text-sm mb-4 text-green-600">
      {{ status }}
    </div>

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
          autocomplete="current-password"
          class="mt-1"
        />
      </div>

      <div class="mt-4 block">
        <label class="flex items-center">
          <Checkbox name="remember" v-model:checked="form.remember" />
          <span class="text-sm ml-2 text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="flex mt-4 items-center justify-end">
        <RouteLink
          v-if="canResetPassword"
          route="password.request"
          class="text-sm text-gray-600 underline hover:text-gray-900"
        >
          Forgot your password?
        </RouteLink>

        <Button class="ml-4" :disabled="form.processing" type="submit"> Log in </Button>
      </div>
    </form>
  </AuthenticationCard>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent } from 'vue';

import AuthenticationCard from '@/components/AuthenticationCard.vue';
import Button from '@/components/Elements/Button.vue';
import Checkbox from '@/components/Elements/Checkbox.vue';
import Input from '@/components/Elements/Input.vue';
import Label from '@/components/Elements/Label.vue';
import RouteLink from '@/components/Elements/RouteLink.vue';
import ValidationErrors from '@/components/ValidationErrors.vue';

export default defineComponent({
  components: {
    AuthenticationCard,
    Button,
    Checkbox,
    Input,
    Label,
    RouteLink,
    ValidationErrors,
  },

  props: {
    canResetPassword: Boolean,
    status: String,
  },

  setup() {
    const form = useForm({
      email: '',
      password: '',
      remember: false,
    });

    const submit = () => {
      form
        .transform((data) => ({
          ...data,
          remember: form.remember ? 'on' : '',
        }))
        .post(window.route('login'), {
          onFinish: () => form.reset('password'),
        });
    };

    return { form, submit };
  },
});
</script>
