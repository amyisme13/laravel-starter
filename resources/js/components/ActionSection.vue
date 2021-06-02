<template>
  <div class="md:(grid grid-cols-3 gap-6)">
    <SectionTitle>
      <template #title><slot name="title"></slot></template>
      <template #description><slot name="description"></slot></template>
    </SectionTitle>

    <div class="mt-5 md:(mt-0 col-span-2)">
      <div class="bg-white shadow py-5 px-4 sm:(rounded-lg p-6)">
        <slot name="content"></slot>
      </div>
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
});
</script>
