<template>
  <span>
    <span @click="startConfirmingPassword">
      <slot></slot>
    </span>

    <Modal :show="confirmingPassword" @close="closeModal" :initial-focus="password">
      <template #title>
        {{ title }}
      </template>

      <p class="text-sm text-gray-500">
        {{ content }}
      </p>

      <div class="mt-4">
        <Input
          type="password"
          placeholder="Password"
          ref="password"
          v-model="form.password"
          @keyup.enter="confirmPassword"
        />

        <InputError :message="form.error" class="mt-2" />
      </div>

      <template #footer>
        <Button
          class="w-full sm:(ml-3 w-auto text-sm)"
          @click="confirmPassword"
          :disabled="form.processing"
          type="submit"
        >
          {{ button }}
        </Button>

        <Button
          class="mt-3 w-full sm:(mt-0 ml-3 w-auto text-sm)"
          @click="closeModal"
          variant="secondary"
        >
          Cancel
        </Button>
      </template>
    </Modal>
  </span>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, nextTick, reactive, ref } from 'vue';

import Button from '@/components/Elements/Button.vue';
import Modal from '@/components/Modal.vue';
import Input from '@/components/Elements/Input.vue';
import InputError from '@/components/Elements/InputError.vue';

export default defineComponent({
  components: {
    Button,
    Modal,
    Input,
    InputError,
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
      form,
      password,
      confirmingPassword,
      closeModal,
      startConfirmingPassword,
      confirmPassword,
    };
  },
});
</script>
