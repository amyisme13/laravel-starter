<template>
  <span>
    <span @click="startConfirmingPassword">
      <slot />
    </span>

    <jet-dialog-modal :show="confirmingPassword" @close="closeModal">
      <template #title>
        {{ title }}
      </template>

      <template #content>
        {{ content }}

        <div class="mt-4">
          <jet-input
            type="password"
            class="mt-1 block w-3/4"
            placeholder="Password"
            ref="password"
            v-model="form.password"
            @keyup.enter="confirmPassword"
          />

          <jet-input-error :message="form.error" class="mt-2" />
        </div>
      </template>

      <template #footer>
        <jet-secondary-button @click="closeModal"> Cancel </jet-secondary-button>

        <jet-button
          class="ml-2"
          @click="confirmPassword"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          {{ button }}
        </jet-button>
      </template>
    </jet-dialog-modal>
  </span>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, nextTick, reactive, ref } from 'vue';

import JetButton from './Button.vue';
import JetDialogModal from './DialogModal.vue';
import JetInput from './Input.vue';
import JetInputError from './InputError.vue';
import JetSecondaryButton from './SecondaryButton.vue';

export default defineComponent({
  components: {
    JetButton,
    JetDialogModal,
    JetInput,
    JetInputError,
    JetSecondaryButton,
  },

  emits: ['confirmed'],

  props: {
    title: {
      default: 'Confirm Password',
    },
    content: {
      default: 'For your security, please confirm your password to continue.',
    },
    button: {
      default: 'Confirm',
    },
  },

  setup(_, { emit }) {
    const { route } = window;

    const password = ref<HTMLInputElement>();
    const confirmingPassword = ref(false);
    const form = reactive({
      password: '',
      error: '',
      processing: false,
    });

    const closeModal = () => {
      confirmingPassword.value = false;
      form.password = '';
      form.error = '';
    };

    const startConfirmingPassword = async () => {
      const res = await axios.get(route('password.confirmation'));
      if (res.data.confirmed) {
        emit('confirmed');
        return;
      }

      confirmingPassword.value = true;
      setTimeout(() => password.value?.focus(), 250);
    };

    const confirmPassword = async () => {
      form.processing = true;

      try {
        await axios.post(route('password.confirm'), {
          password: form.password,
        });

        closeModal();
        nextTick(() => emit('confirmed'));
      } catch (err) {
        form.error = err.response.data.errors.password[0];
        password.value?.focus();
      }

      form.processing = false;
    };

    return {
      route,
      form,
      confirmingPassword,
      closeModal,
      startConfirmingPassword,
      confirmPassword,
    };
  },
});
</script>
