<template>
  <FormSection @submitted="updateProfileInformation">
    <template #title> Profile Information </template>

    <template #description> Update your account's profile information and email address. </template>

    <template #form>
      <!-- Profile Photo -->
      <div class="col-span-6 sm:col-span-4" v-if="$page.props.jetstream.managesProfilePhotos">
        <!-- Profile Photo File Input -->
        <input type="file" class="hidden" ref="photo" @change="updatePhotoPreview" />

        <Label for="photo" value="Photo" />

        <!-- Current Profile Photo -->
        <div class="mt-2" v-show="!photoPreview">
          <img
            :src="user.profile_photo_url"
            :alt="user.name"
            class="rounded-full object-cover h-20 w-20"
          />
        </div>

        <!-- New Profile Photo Preview -->
        <div class="mt-2" v-show="photoPreview">
          <span
            class="rounded-full h-20 w-20 block"
            :style="
              'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' +
              photoPreview +
              '\');'
            "
          >
          </span>
        </div>

        <Button variant="secondary" class="mt-2 mr-2" @click.prevent="selectNewPhoto">
          Select A New Photo
        </Button>

        <Button
          v-if="user.profile_photo_path"
          variant="secondary"
          class="mt-2"
          @click.prevent="deletePhoto"
        >
          Remove Photo
        </Button>

        <InputError :message="form.errors.photo" class="mt-2" />
      </div>

      <!-- Name -->
      <div class="col-span-6 sm:col-span-4">
        <Label for="name" value="Name" />
        <Input id="name" type="text" class="mt-1" v-model="form.name" autocomplete="name" />
        <InputError :message="form.errors.name" class="mt-2" />
      </div>

      <!-- Email -->
      <div class="col-span-6 sm:col-span-4">
        <Label for="email" value="Email" />
        <Input id="email" type="email" class="mt-1" v-model="form.email" />
        <InputError :message="form.errors.email" class="mt-2" />
      </div>
    </template>

    <template #actions>
      <ActionMessage :on="form.recentlySuccessful" class="mr-3"> Saved. </ActionMessage>

      <Button :disabled="form.processing" type="submit"> Save </Button>
    </template>
  </FormSection>
</template>

<script lang="ts">
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-vue3';
import { defineComponent, PropType, ref } from 'vue';

import ActionMessage from '@/components/ActionMessage.vue';
import Button from '@/components/Elements/Button.vue';
import FormSection from '@/components/FormSection.vue';
import Input from '@/components/Elements/Input.vue';
import InputError from '@/components/Elements/InputError.vue';
import Label from '@/components/Elements/Label.vue';

export default defineComponent({
  components: {
    ActionMessage,
    Button,
    FormSection,
    Input,
    InputError,
    Label,
  },

  props: {
    user: {
      type: Object as PropType<Inertia.User>,
      required: true,
    },
  },

  setup(props) {
    const { route } = window;

    const form = useForm({
      _method: 'PUT',
      name: props.user.name,
      email: props.user.email,
      photo: null as File | null,
    });

    const photoPreview = ref();
    const photo = ref<HTMLInputElement>();

    const selectNewPhoto = () => {
      photo.value?.click();
    };

    const updatePhotoPreview = () => {
      if (!photo.value || !photo.value.files) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreview.value = e.target?.result;
      };

      reader.readAsDataURL(photo.value.files[0]);
    };

    const updateProfileInformation = () => {
      if (photo.value && photo.value.files) {
        form.photo = photo.value.files[0];
      }

      form.post(route('user-profile-information.update'), {
        errorBag: 'updateProfileInformation',
        preserveScroll: true,
      });
    };

    const deletePhoto = () => {
      Inertia.delete(route('current-user-photo.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
          photoPreview.value = null;
        },
      });
    };

    return {
      form,
      photo,
      photoPreview,
      selectNewPhoto,
      updatePhotoPreview,
      updateProfileInformation,
      deletePhoto,
    };
  },
});
</script>
