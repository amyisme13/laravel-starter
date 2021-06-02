<template>
  <div class="md:(grid grid-cols-3 gap-6)">
    <SectionTitle>
      <template #title><slot name="title"></slot></template>
      <template #description><slot name="description"></slot></template>
    </SectionTitle>

    <div class="mt-5 md:(mt-0 col-span-2)">
      <form @submit.prevent="$emit('submitted')">
        <div class="shadow sm:(rounded-md overflow-hidden)">
          <div class="bg-white shadow py-5 px-4 sm:p-6">
            <div class="grid gap-6 grid-cols-6">
              <slot name="form"></slot>
            </div>
          </div>

          <div
            v-if="$slots.actions"
            class="flex bg-gray-50 text-right py-3 px-4 items-center justify-end sm:px-6"
          >
            <slot name="actions"></slot>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SectionTitle from '@/components/SectionTitle.vue';

export default defineComponent({
  components: {
    SectionTitle,
  },

  emits: ['submitted'],
});
</script>
