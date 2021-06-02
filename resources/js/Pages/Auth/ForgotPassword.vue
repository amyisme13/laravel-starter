<template>
  <AuthenticationCard>
    <div class="text-sm mb-4 text-gray-600">
      Forgot your password? No problem. Just let us know your email address and we will email you a
      password reset link that will allow you to choose a new one.
    </div>

    <div v-if="status" class="font-medium text-sm mb-4 text-green-600">
      {{ status }}
    </div>

    <ValidationErrors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <Label for="email" value="Email" />
        <Input id="email" type="email" class="mt-1" v-model="form.email" required autofocus />
      </div>

      <div class="flex mt-4 items-center justify-end">
        <Button :disabled="form.processing" type="submit"> Email Password Reset Link </Button>
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
    status: String,
  },

  setup() {
    const form = useForm({
      email: '',
    });

    const submit = () => {
      form.post(window.route('password.email'));
    };

    return { form, submit };
  },
});
</script>
