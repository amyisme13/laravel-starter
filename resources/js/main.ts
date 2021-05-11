import 'vite/dynamic-import-polyfill';
import 'virtual:windi.css';

import type {} from 'vite';
import { createApp, h } from 'vue';
import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';

const el = document.getElementById('app') as HTMLElement;
const pages = import.meta.glob('./Pages/**/*.vue');

createApp({
  render: () =>
    h(InertiaApp, {
      initialPage: JSON.parse(el.dataset.page as string),
      resolveComponent: (name) => {
        const importPage = pages[`./Pages/${name}.vue`];

        if (!importPage) {
          throw new Error(`Unknown page ${name}. Is it located under Pages with a .vue extension?`);
        }

        return importPage().then((module: any) => module.default);
      },
    }),
})
  .use(InertiaPlugin)
  .mount(el);

InertiaProgress.init({ color: '#4B5563' });
