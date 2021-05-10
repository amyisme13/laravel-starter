import { defineConfig } from 'windicss/helpers';
import defaultTheme from 'windicss/defaultTheme';
import forms from 'windicss/plugin/forms';
import typography from 'windicss/plugin/typography';

export default defineConfig({
  darkMode: 'class',
  safelist: ['prose', 'prose-sm', 'm-auto'],
  plugins: [forms, typography],

  extract: {
    include: [
      './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
      './vendor/laravel/jetstream/**/*.blade.php',
      './storage/framework/views/*.php',
      './resources/views/**/*.blade.php',
      './resources/js/**/*.vue',
    ],
  },

  theme: {
    fontFamily: {
      sans: ['Nunito', ...defaultTheme.fontFamily.sans],
    },
  },
});
