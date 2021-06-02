<template>
  <AuthenticationCard>
    <div class="text-sm mb-4 text-gray-600">
      This is a secure area of the application. Please confirm your password before continuing.
    </div>

    <ValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <Label for="password" value="Password" />
        <Input
          autofocus
          required
          autocomplete="current-password"
          class="mt-1"
          id="password"
          type="password"
          v-model="form.password"
        />
      </div>

      <div class="flex mt-4 justify-end">
        <Button class="ml-4" :disabled="form.processing" type="submit"> Confirm </Button>
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

  setup() {
    const form = useForm({
      password: '',
    });

    const submit = () => {
      form.post(window.route('password.confirm'), {
        onFinish: () => form.reset(),
      });
    };

    return { form, submit };
  },
});
</script>
