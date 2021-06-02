<template>
  <AuthenticationCard>
    <ValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <Label for="name" value="Name" />
        <Input
          id="name"
          type="text"
          class="mt-1"
          v-model="form.name"
          required
          autofocus
          autocomplete="name"
        />
      </div>

      <div class="mt-4">
        <Label for="email" value="Email" />
        <Input id="email" type="email" class="mt-1" v-model="form.email" required />
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

      <div class="mt-4" v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature">
        <Label for="terms">
          <div class="flex items-center">
            <Checkbox name="terms" id="terms" v-model:checked="form.terms" />

            <div class="ml-2">
              I agree to the
              <a
                target="_blank"
                :href="route('terms.show')"
                class="text-sm text-gray-600 underline hover:text-gray-900"
              >
                Terms of Service
              </a>
              and
              <a
                target="_blank"
                :href="route('policy.show')"
                class="text-sm text-gray-600 underline hover:text-gray-900"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </Label>
      </div>

      <div class="flex mt-4 items-center justify-end">
        <RouteLink route="login" class="text-sm text-gray-600 underline hover:text-gray-900">
          Already registered?
        </RouteLink>

        <Button class="ml-4" :disabled="form.processing" type="submit"> Register </Button>
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

  setup() {
    const { route } = window;

    const form = useForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      terms: false,
    });

    const submit = () => {
      form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
      });
    };

    return { form, submit, route };
  },
});
</script>
