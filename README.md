# Laravel Starter

My personal Laravel 8.x starter kit to help me start a project faster. It doesn't have much currently.

## What this starter have?

- Laravel Jetstream with Inertia.js - the starting point for this project
- Laravel Telescope - local only development companion
- Laravel Sail - dockerize laravel
- Vue 3 - frontend framework
- Vite - fast build tools for frontend
- Typescript
- Prettier - code formatter
- ESLint

## Setup

Follow the steps mentioned below to install and run the project.

1. Clone or download the repository
2. Go to the project directory and run `composer install`
3. Create `.env` file by copying the `.env.example`. You may use the command to do that `cp .env.example .env`
4. Generate key by running `php artisan key:generate`
5. Update the database configuration in `.env`
6. Migrate the database by running `php artisan migrate`
7. Link storage directory `php artisan storage:link`
8. Run `yarn install` to install js packages
9. Run `yarn dev` or `yarn build` to generate the frontend assets

## License

[MIT license](https://opensource.org/licenses/MIT).
