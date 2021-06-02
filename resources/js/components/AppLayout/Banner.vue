<template>
  <div
    v-if="show && internalMessage"
    :class="internalStyle === 'danger' ? 'bg-red-700' : 'bg-indigo-600'"
  >
    <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex flex-1 w-0 items-center">
          <!-- Icon -->
          <span
            class="rounded-lg flex p-2"
            :class="internalStyle === 'danger' ? 'bg-red-900' : 'bg-indigo-800'"
          >
            <CheckCircleIcon
              v-if="internalStyle === 'success'"
              class="h-6 text-white w-6"
              aria-hidden="true"
            />

            <ExclamationIcon
              v-else-if="internalStyle === 'danger'"
              class="h-6 text-white w-6"
              aria-hidden="true"
            />

            <InformationCircleIcon v-else class="h-6 text-white w-6" aria-hidden="true" />
          </span>

          <!-- Message -->
          <p class="font-medium text-white ml-3">
            {{ internalMessage }}
          </p>
        </div>

        <!-- Action Button -->
        <!-- <div class="flex-shrink-0 order-3 mt-2 w-full sm:w-auto sm:order-2 sm:mt-0">
          <a
            href="#"
            class="bg-white border border-transparent rounded-md flex font-medium shadow-sm text-sm py-2 px-4 text-indigo-600 items-center justify-center hover:bg-indigo-50"
          >
            Learn more
          </a>
        </div> -->

        <!-- Dismiss Button -->
        <div class="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
          <button
            type="button"
            class="rounded-md flex -mr-1 p-2 focus:outline-none focus:ring-white hover:bg-indigo-500 focus:ring-2 sm:-mr-2"
            @click="show = false"
          >
            <span class="sr-only">Dismiss</span>
            <XIcon class="h-6 text-white w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePage } from '@inertiajs/inertia-vue3';
import { defineComponent, ref, computed, PropType } from 'vue';
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    CheckCircleIcon,
    ExclamationIcon,
    InformationCircleIcon,
    XIcon,
  },
  props: {
    style: {
      type: String as PropType<'info' | 'danger' | 'success'>,
      default: 'info',
    },
    message: String,
  },
  setup(props) {
    const show = ref(true);

    const internalStyle = computed(() => {
      return usePage().props.value.jetstream.flash?.bannerStyle || props.style;
    });

    const internalMessage = computed(() => {
      return usePage().props.value.jetstream.flash?.banner || props.message;
    });

    return { show, internalStyle, internalMessage };
  },
});
</script>
