<template>
  <ActionSection>
    <template #title> Delete Account </template>

    <template #description> Permanently delete your account. </template>

    <template #content>
      <div class="max-w-xl text-sm text-gray-600">
        Once your account is deleted, all of its resources and data will be permanently deleted.
        Before deleting your account, please download any data or information that you wish to
        retain.
      </div>

      <div class="mt-5">
        <Button variant="danger" @click="confirmUserDeletion"> Delete Account </Button>
      </div>

      <!-- Delete Account Confirmation Modal -->
      <Modal :show="confirmingUserDeletion" @close="closeModal" :initial-focus="password">
        <template #icon>
          <ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
        </template>

        <template #title> Delete Account </template>

        <p class="text-sm text-gray-500">
          Are you sure you want to delete your account? Once your account is deleted, all of its
          resources and data will be permanently deleted. Please enter your password to confirm you
          would like to permanently delete your account.
        </p>

        <div class="mt-4">
          <Input
            type="password"
            placeholder="Password"
            ref="password"
            v-model="form.password"
            @keyup.enter="deleteUser"
          />

          <InputError :message="form.errors.password" class="mt-2" />
        </div>

        <template #footer>
          <Button
            class="w-full sm:(ml-3 w-auto text-sm)"
            @click="deleteUser"
            :disabled="form.processing"
            variant="danger"
          >
            Delete Account
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
    </template>
  </ActionSection>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent, ref } from 'vue';
import { ExclamationIcon } from '@heroicons/vue/outline';

import ActionSection from '@/components/ActionSection.vue';
import Button from '@/components/Elements/Button.vue';
import Input from '@/components/Elements/Input.vue';
import InputError from '@/components/Elements/InputError.vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  components: {
    ActionSection,
    Button,
    ExclamationIcon,
    Input,
    InputError,
    Modal,
  },

  setup() {
    const password = ref<HTMLInputElement>();
    const confirmingUserDeletion = ref(false);
    const confirmUserDeletion = () => {
      confirmingUserDeletion.value = true;

      setTimeout(() => password.value?.focus(), 250);
    };

    const form = useForm({ password: '' });

    const closeModal = () => {
      confirmingUserDeletion.value = false;
      form.reset();
    };

    const deleteUser = () => {
      form.delete(window.route('current-user.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => password.value?.focus(),
        onFinish: () => form.reset(),
      });
    };

    return { password, confirmingUserDeletion, confirmUserDeletion, form, closeModal, deleteUser };
  },
});
</script>
