<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-16 relative items-center justify-between">
        <div class="flex inset-y-0 left-0 absolute items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="rounded-md p-2 text-gray-400 inline-flex items-center justify-center hover:(text-white bg-gray-700) focus:(outline-none ring-inset ring-white ring-2)"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="h-6 w-6 block" aria-hidden="true" />
            <XIcon v-else class="h-6 w-6 block" aria-hidden="true" />
          </DisclosureButton>
        </div>

        <div class="flex flex-1 items-center justify-center sm:(items-stretch justify-start)">
          <div class="flex flex-shrink-0 items-center">
            <ApplicationMark class="h-8 w-auto block" />
          </div>

          <!-- Navigation Items -->
          <div class="hidden sm:(block ml-6)">
            <div class="flex space-x-4">
              <RouteLink
                v-for="item in navigation"
                :key="item.route"
                :route="item.route"
                class="rounded-md font-medium text-sm py-2 px-3"
                active-class="bg-gray-900 text-white"
                inactive-class="text-gray-300 hover:(bg-gray-700 text-white)"
              >
                {{ item.name }}
              </RouteLink>
            </div>
          </div>
        </div>

        <div
          class="flex pr-2 inset-y-0 right-0 absolute items-center sm:(static inset-auto ml-6 pr-0)"
        >
          <!-- Notification Button -->
          <!-- <button
            class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button> -->

          <!-- Profile dropdown -->
          <Menu v-if="$page.props.user" as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="rounded-full flex bg-gray-800 text-sm focus:(outline-none ring-white ring-2 ring-offset-2 ring-offset-gray-800)"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="rounded-full object-cover h-8 w-8"
                  :src="$page.props.user.profile_photo_url"
                  :alt="$page.props.user.name"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="bg-white rounded-md shadow-lg ring-black mt-2 py-1 origin-top-right right-0 ring-1 ring-opacity-5 w-48 absolute focus:outline-none"
              >
                <MenuItem disabled class="border-b">
                  <div class="py-2 px-4">
                    <p class="font-medium text-sm text-gray-700">
                      {{ $page.props.user.name }}
                    </p>
                    <p class="text-xs text-gray-400">
                      {{ $page.props.user.email }}
                    </p>
                  </div>
                </MenuItem>

                <MenuItem disabled>
                  <span class="text-xs px-4 pt-2 pb-1 text-gray-400 block">Manage Account</span>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <RouteLink
                    :active="active"
                    route="profile.show"
                    class="text-sm py-2 px-4 text-gray-700 block"
                    active-class="bg-gray-100"
                  >
                    Profile
                  </RouteLink>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <RouteLink
                    v-if="$page.props.jetstream.hasApiFeatures"
                    :active="active"
                    route="api-tokens.index"
                    class="text-sm py-2 px-4 text-gray-700 block"
                    active-class="bg-gray-100"
                  >
                    API Tokens
                  </RouteLink>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <RouteLink
                    :active="active"
                    route="logout"
                    class="text-sm text-left w-full py-2 px-4 text-gray-700 block"
                    active-class="bg-gray-100"
                    method="POST"
                  >
                    Log Out
                  </RouteLink>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Items -->
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <RouteLink
          v-for="item in navigation"
          :key="item.route"
          :route="item.route"
          class="rounded-md font-medium text-base py-2 px-3 block"
          active-class="bg-gray-900 text-white"
          inactive-class="text-gray-300 hover:(bg-gray-700 text-white)"
        >
          {{ item.name }}
        </RouteLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { MenuIcon, XIcon } from '@heroicons/vue/outline';

import ApplicationMark from '@/components/Logo/ApplicationMark.vue';
import RouteLink from '@/components/Elements/RouteLink.vue';

export default defineComponent({
  components: {
    ApplicationMark,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    RouteLink,
    XIcon,
  },
  setup() {
    const open = ref(false);
    const navigation = [{ name: 'Dashboard', route: 'dashboard' }];

    return {
      navigation,
      open,
    };
  },
});
</script>
