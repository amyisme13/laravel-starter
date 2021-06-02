<template>
  <inertia-link
    :aria-current="current ? 'page' : undefined"
    :class="current ? activeClass : inactiveClass"
    :href="href"
    :as="asButton ? 'button' : 'a'"
    :type="asButton ? 'button' : undefined"
    :method="method"
  >
    <slot></slot>
  </inertia-link>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    route: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: 'GET',
    },
    active: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    activeClass: String,
    inactiveClass: String,
  },
  setup(props) {
    const { route } = window;

    const href = route(props.route);
    const asButton = props.method.toLowerCase() !== 'get';

    const current = computed(() => {
      if (props.active === undefined) {
        return route().current(props.route);
      }

      return props.active;
    });

    return { href, current, asButton };
  },
});
</script>
