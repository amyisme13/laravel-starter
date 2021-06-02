<template>
  <AuthenticationCard>
    <div class="text-sm mb-4 text-gray-600">
      Thanks for signing up! Before getting started, could you verify your email address by clicking
      on the link we just emailed to you? If you didn't receive the email, we will gladly send you
      another.
    </div>

    <div class="font-medium text-sm mb-4 text-green-600" v-if="verificationLinkSent">
      A new verification link has been sent to the email address you provided during registration.
    </div>

    <form @submit.prevent="submit">
      <div class="flex mt-4 items-center justify-between">
        <Button :disabled="form.processing" type="submit"> Resend Verification Email </Button>

        <RouteLink
          route="logout"
          method="post"
          class="text-sm text-gray-600 underline hover:text-gray-900"
        >
          Log Out
        </RouteLink>
      </div>
    </form>
  </AuthenticationCard>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { computed, defineComponent } from 'vue';

import AuthenticationCard from '@/components/AuthenticationCard.vue';
import Button from '@/components/Elements/Button.vue';
import RouteLink from '@/components/Elements/RouteLink.vue';

export default defineComponent({
  components: {
    AuthenticationCard,
    Button,
    RouteLink,
  },

  props: {
    status: String,
  },

  setup(props) {
    const form = useForm({});

    const submit = () => {
      form.post(window.route('verification.send'));
    };

    const verificationLinkSent = computed(() => props.status === 'verification-link-sent');

    return { form, submit, verificationLinkSent };
  },
});
</script>
