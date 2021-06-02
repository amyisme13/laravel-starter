<template>
  <div>
    <!-- Generate API Token -->
    <FormSection @submitted="createApiToken">
      <template #title> Create API Token </template>

      <template #description>
        API tokens allow third-party services to authenticate with our application on your behalf.
      </template>

      <template #form>
        <!-- Token Name -->
        <div class="col-span-6 sm:col-span-4">
          <Label for="name" value="Name" />
          <Input id="name" type="text" class="mt-1" v-model="createApiTokenForm.name" autofocus />
          <InputError :message="createApiTokenForm.errors.name" class="mt-2" />
        </div>

        <!-- Token Permissions -->
        <div class="col-span-6" v-if="availablePermissions.length > 0">
          <Label for="permissions" value="Permissions" />

          <div class="mt-2 grid gap-4 grid-cols-1 md:grid-cols-2">
            <div v-for="permission in availablePermissions" :key="permission">
              <label class="flex items-center">
                <Checkbox :value="permission" v-model:checked="createApiTokenForm.permissions" />
                <span class="text-sm ml-2 text-gray-600">{{ permission }}</span>
              </label>
            </div>
          </div>
        </div>
      </template>

      <template #actions>
        <ActionMessage :on="createApiTokenForm.recentlySuccessful" class="mr-3">
          Created.
        </ActionMessage>

        <Button :disabled="createApiTokenForm.processing" type="submit"> Create </Button>
      </template>
    </FormSection>

    <div v-if="tokens.length > 0">
      <SectionBorder />

      <!-- Manage API Tokens -->
      <div class="mt-10 sm:mt-0">
        <ActionSection>
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
                    class="cursor-pointer text-sm ml-6 text-gray-400 underline"
                    @click="manageApiTokenPermissions(token)"
                    v-if="availablePermissions.length > 0"
                  >
                    Permissions
                  </button>

                  <button
                    class="cursor-pointer text-sm ml-6 text-red-500"
                    @click="confirmApiTokenDeletion(token)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </template>
        </ActionSection>
      </div>
    </div>

    <!-- Token Value Modal -->
    <Modal :show="displayingToken" @close="displayingToken = false" :initial-focus="flashToken">
      <template #title> API Token </template>

      <p class="text-sm text-gray-500">
        Please copy your new API token. For your security, it won't be shown again.
      </p>

      <Input
        v-if="$page.props.jetstream.flash?.token"
        readonly
        ref="flashToken"
        type="text"
        v-model="$page.props.jetstream.flash.token"
        class="mt-1"
      />

      <template #footer>
        <Button
          class="w-full sm:(ml-3 w-auto text-sm)"
          variant="secondary"
          @click="displayingToken = false"
        >
          Close
        </Button>
      </template>
    </Modal>

    <!-- API Token Permissions Modal -->
    <Modal :show="!!managingPermissionsFor" @close="managingPermissionsFor = undefined">
      <template #title> API Token Permissions </template>

      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div v-for="permission in availablePermissions" :key="permission">
          <label class="flex items-center">
            <Checkbox :value="permission" v-model:checked="updateApiTokenForm.permissions" />
            <span class="text-sm ml-2 text-gray-600">{{ permission }}</span>
          </label>
        </div>
      </div>

      <template #footer>
        <Button
          class="w-full sm:(ml-3 w-auto text-sm)"
          @click="updateApiToken"
          :disabled="updateApiTokenForm.processing"
          type="submit"
        >
          Save
        </Button>

        <Button
          class="w-full sm:(ml-3 w-auto text-sm)"
          variant="secondary"
          @click="managingPermissionsFor = undefined"
        >
          Cancel
        </Button>
      </template>
    </Modal>

    <!-- Delete Token Confirmation Modal -->
    <Modal :show="!!apiTokenBeingDeleted" @close="apiTokenBeingDeleted = undefined">
      <template #icon>
        <ExclamationIcon class="h-6 text-red-600 w-6" aria-hidden="true" />
      </template>

      <template #title> Delete API Token </template>

      <p class="text-sm text-gray-500">Are you sure you would like to delete this API token?</p>

      <template #footer>
        <Button
          class="w-full sm:(ml-3 w-auto text-sm)"
          @click="deleteApiToken"
          :disabled="deleteApiTokenForm.processing"
          variant="danger"
        >
          Delete
        </Button>

        <Button
          class="w-full sm:(ml-3 w-auto text-sm)"
          variant="secondary"
          @click="apiTokenBeingDeleted = undefined"
        >
          Cancel
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import { ExclamationIcon } from '@heroicons/vue/outline';

import ActionMessage from '@/components/ActionMessage.vue';
import ActionSection from '@/components/ActionSection.vue';
import Button from '@/components/Elements/Button.vue';
import Checkbox from '@/components/Elements/Checkbox.vue';
import FormSection from '@/components/FormSection.vue';
import Input from '@/components/Elements/Input.vue';
import InputError from '@/components/Elements/InputError.vue';
import Label from '@/components/Elements/Label.vue';
import Modal from '@/components/Modal.vue';
import SectionBorder from '@/components/SectionBorder.vue';

interface Token {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: string;
}

export default defineComponent({
  components: {
    ActionMessage,
    ActionSection,
    Button,
    Checkbox,
    ExclamationIcon,
    FormSection,
    Input,
    InputError,
    Label,
    Modal,
    SectionBorder,
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
    const flashToken = ref<HTMLInputElement>();

    const createApiToken = () => {
      createApiTokenForm.post(route('api-tokens.store'), {
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
      flashToken,
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
