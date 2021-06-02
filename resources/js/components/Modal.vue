<template>
  <TransitionRoot as="template" :show="show">
    <Dialog
      class="inset-0 z-10 fixed overflow-y-auto"
      @close="close"
      :open="show"
      :initial-focus="initialFocus"
    >
      <div
        class="flex min-h-screen text-center px-4 pt-4 pb-20 items-end justify-center sm:(block p-0)"
      >
        <!-- Overlay Transition -->
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="bg-gray-500 bg-opacity-75 inset-0 transition-opacity fixed" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:(inline-block align-middle h-screen)" aria-hidden="true">
          &#8203;
        </span>

        <!-- Dialog Transition -->
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:(translate-y-0 scale-95)"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:(translate-y-0 scale-95)"
        >
          <div
            class="bg-white rounded-lg shadow-xl text-left transform transition-all inline-block align-bottom overflow-hidden sm:(align-middle max-w-lg w-full my-8)"
          >
            <!-- Modal Body -->
            <div class="bg-white px-4 pt-5 pb-4 sm:(p-6 pb-4)">
              <div class="sm:(flex items-start)">
                <div
                  v-if="$slots.icon"
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:(mx-0 h-10 w-10)"
                >
                  <slot name="icon"></slot>
                </div>

                <div class="mt-3 text-center sm:(mt-0 ml-4 text-left)">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    <slot name="title"></slot>
                  </DialogTitle>

                  <div class="mt-2">
                    <slot></slot>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="bg-gray-50 px-4 py-3 sm:(px-6 flex flex-row-reverse)">
              <slot name="footer"></slot>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  emit: ['close'],
  props: {
    show: {
      default: false,
    },
    closeable: {
      default: true,
    },
    initialFocus: Object as PropType<HTMLElement>,
  },
  setup(props, { emit }) {
    const close = () => {
      if (props.closeable) {
        emit('close');
      }
    };

    return { close };
  },
});
</script>
