<template>
  <div>
    <!-- Generate API Token -->
    <jet-form-section @submitted="createApiToken">
      <template #title> Create API Token </template>

      <template #description>
        API tokens allow third-party services to authenticate with our application on your behalf.
      </template>

      <template #form>
        <!-- Token Name -->
        <div class="col-span-6 sm:col-span-4">
          <jet-label for="name" value="Name" />
          <jet-input
            id="name"
            type="text"
            class="mt-1 block w-full"
            v-model="createApiTokenForm.name"
            autofocus
          />
          <jet-input-error :message="createApiTokenForm.errors.name" class="mt-2" />
        </div>

        <!-- Token Permissions -->
        <div class="col-span-6" v-if="availablePermissions.length > 0">
          <jet-label for="permissions" value="Permissions" />

          <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="permission in availablePermissions" :key="permission">
              <label class="flex items-center">
                <jet-checkbox
                  :value="permission"
                  v-model:checked="createApiTokenForm.permissions"
                />
                <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
              </label>
            </div>
          </div>
        </div>
      </template>

      <template #actions>
        <jet-action-message :on="createApiTokenForm.recentlySuccessful" class="mr-3">
          Created.
        </jet-action-message>

        <jet-button
          :class="{ 'opacity-25': createApiTokenForm.processing }"
          :disabled="createApiTokenForm.processing"
        >
          Create
        </jet-button>
      </template>
    </jet-form-section>

    <div v-if="tokens.length > 0">
      <jet-section-border />

      <!-- Manage API Tokens -->
      <div class="mt-10 sm:mt-0">
        <jet-action-section>
          <template #title> Manage API Tokens </template>

          <template #description>
            You may delete any of your existing tokens if they are no longer needed.
          </template>

          <!-- API Token List -->
          <template #content>
            <div class="space-y-6">
              <div
                class="flex items-center justify-between"
                v-for="token in tokens"
                :key="token.id"
              >
                <div>
                  {{ token.name }}
                </div>

                <div class="flex items-center">
                  <div class="text-sm text-gray-400" v-if="token.last_used_ago">
                    Last used {{ token.last_used_ago }}
                  </div>

                  <button
                    class="cursor-pointer ml-6 text-sm text-gray-400 underline"
                    @click="manageApiTokenPermissions(token)"
                    v-if="availablePermissions.length > 0"
                  >
                    Permissions
                  </button>

                  <button
                    class="cursor-pointer ml-6 text-sm text-red-500"
                    @click="confirmApiTokenDeletion(token)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </template>
        </jet-action-section>
      </div>
    </div>

    <!-- Token Value Modal -->
    <jet-dialog-modal :show="displayingToken" @close="displayingToken = false">
      <template #title> API Token </template>

      <template #content>
        <div>Please copy your new API token. For your security, it won't be shown again.</div>

        <div
          class="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500"
          v-if="$page.props.jetstream.flash?.token"
        >
          {{ $page.props.jetstream.flash?.token }}
        </div>
      </template>

      <template #footer>
        <jet-secondary-button @click="displayingToken = false"> Close </jet-secondary-button>
      </template>
    </jet-dialog-modal>

    <!-- API Token Permissions Modal -->
    <jet-dialog-modal :show="!!managingPermissionsFor" @close="managingPermissionsFor = undefined">
      <template #title> API Token Permissions </template>

      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="permission in availablePermissions" :key="permission">
            <label class="flex items-center">
              <jet-checkbox :value="permission" v-model:checked="updateApiTokenForm.permissions" />
              <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
            </label>
          </div>
        </div>
      </template>

      <template #footer>
        <jet-secondary-button @click="managingPermissionsFor = undefined">
          Cancel
        </jet-secondary-button>

        <jet-button
          class="ml-2"
          @click="updateApiToken"
          :class="{ 'opacity-25': updateApiTokenForm.processing }"
          :disabled="updateApiTokenForm.processing"
        >
          Save
        </jet-button>
      </template>
    </jet-dialog-modal>

    <!-- Delete Token Confirmation Modal -->
    <jet-confirmation-modal
      :show="!!apiTokenBeingDeleted"
      @close="apiTokenBeingDeleted = undefined"
    >
      <template #title> Delete API Token </template>

      <template #content> Are you sure you would like to delete this API token? </template>

      <template #footer>
        <jet-secondary-button @click="apiTokenBeingDeleted = undefined">
          Cancel
        </jet-secondary-button>

        <jet-danger-button
          class="ml-2"
          @click="deleteApiToken"
          :class="{ 'opacity-25': deleteApiTokenForm.processing }"
          :disabled="deleteApiTokenForm.processing"
        >
          Delete
        </jet-danger-button>
      </template>
    </jet-confirmation-modal>
  </div>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';

import JetActionMessage from '@/Jetstream/ActionMessage.vue';
import JetActionSection from '@/Jetstream/ActionSection.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetConfirmationModal from '@/Jetstream/ConfirmationModal.vue';
import JetDangerButton from '@/Jetstream/DangerButton.vue';
import JetDialogModal from '@/Jetstream/DialogModal.vue';
import JetFormSection from '@/Jetstream/FormSection.vue';
import JetInput from '@/Jetstream/Input.vue';
import JetCheckbox from '@/Jetstream/Checkbox.vue';
import JetInputError from '@/Jetstream/InputError.vue';
import JetLabel from '@/Jetstream/Label.vue';
import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue';
import JetSectionBorder from '@/Jetstream/SectionBorder.vue';

interface Token {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: string;
}

export default defineComponent({
  components: {
    JetActionMessage,
    JetActionSection,
    JetButton,
    JetConfirmationModal,
    JetDangerButton,
    JetDialogModal,
    JetFormSection,
    JetInput,
    JetCheckbox,
    JetInputError,
    JetLabel,
    JetSecondaryButton,
    JetSectionBorder,
  },

  props: {
    tokens: {
      type: Array as PropType<Token[]>,
      required: true,
    },
    availablePermissions: {
      type: Array as PropType<string[]>,
      required: true,
    },
    defaultPermissions: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  setup(props) {
    const { route } = window;

    const createApiTokenForm = useForm({
      name: '',
      permissions: props.defaultPermissions,
    });

    const displayingToken = ref(false);

    const createApiToken = () => {
      createApiTokenForm.post(route('api-tokens.create'), {
        preserveScroll: true,
        onSuccess: () => {
          displayingToken.value = true;
          createApiTokenForm.reset();
        },
      });
    };

    const managingPermissionsFor = ref<Token>();
    const updateApiTokenForm = useForm<{ permissions: string[] }>({
      permissions: [],
    });

    const manageApiTokenPermissions = (token: Token) => {
      updateApiTokenForm.permissions = token.abilities;
      managingPermissionsFor.value = token;
    };

    const updateApiToken = () => {
      if (managingPermissionsFor.value === undefined) return;

      updateApiTokenForm.put(route('api-tokens.update', managingPermissionsFor.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => (managingPermissionsFor.value = undefined),
      });
    };

    const apiTokenBeingDeleted = ref<Token>();
    const deleteApiTokenForm = useForm({});

    const confirmApiTokenDeletion = (token: Token) => {
      apiTokenBeingDeleted.value = token;
    };

    const deleteApiToken = () => {
      if (apiTokenBeingDeleted.value === undefined) return;

      deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => (apiTokenBeingDeleted.value = undefined),
      });
    };

    return {
      createApiTokenForm,
      displayingToken,
      createApiToken,
      managingPermissionsFor,
      updateApiTokenForm,
      manageApiTokenPermissions,
      updateApiToken,
      apiTokenBeingDeleted,
      deleteApiTokenForm,
      confirmApiTokenDeletion,
      deleteApiToken,
    };
  },
});
</script>
