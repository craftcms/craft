<?php

/**
 * This file contains low-level Laravel framework configuration.
 * 
 * Craft *may* overwrite some of these settings as it boots. You can find out
 * what the application has resolved for a given config value using the console:
 * 
 * ```bash
 * php artisan config:show app.name
 * ```
 */

return [
    /**
     * App Name
     *
     * This value is used when the framework needs to identify your project in a
     * notification or UI. Craft’s *System Name* supersedes this as soon as a
     * value is set during installation.
     * 
     * Other Laravel packages may use this value, directly.
     */

    'name' => env('APP_NAME', 'Laravel'),

    /**
     * Environment
     *
     * On its own, the current “environment” has no effect; it is typically used
     * as a signal to custom code. `app.debug` is often a stronger indicator,
     * and acts as the equivalent to Craft’s legacy `devMode`.
     */

    'env' => env('APP_ENV', 'production'),

    /**
     * Debug Mode
     * 
     * When `debug` is on, the application will report detailed messages
     * and stack traces for any errors that occur when serving a request.
     * If disabled, a simple generic error page is shown.
     * 
     * This replaces Craft’s legacy `devMode` setting.
     */

    'debug' => (bool) env('APP_DEBUG', false),

    /**
     * URL
     *
     * Once Craft is installed, it knows how to generate valid URLs in most
     * circumstances, but this ensures Laravel (and other packages outside the
     * Craft ecosystem) is on the same page. When you start a new project, DDEV
     * automatically sets the `APP_URL` environment variable inside its
     * containers; we recommend keeping `app.url` synchronized with your default
     * site’s *Base URL* setting.
     */

    'url' => env('APP_URL', 'http://localhost'),

    /**
     * Timezone
     * 
     * This setting is used only as a fallback. In a typical installation, Craft
     * first checks the `timezone` setting in general config
     * (`config/craft/general.php`), then the system timezone stored in project
     * config (`system.timeZone`).
     */

    'timezone' => 'UTC',

    /**
     * Locale
     * 
     * Craft automatically sets the locale for most requests, but needs this
     * setting before installation and when running console commands.
     * 
     * The `fallback_locale` is only used for internal Laravel packages when no
     * suitable locales are available. For example, if the app needed to format
     * a date for a user who selected an unsupported locale, Laravel will use
     * your selected “fallback.”
     */

    'locale' => env('APP_LOCALE', 'en'),
    'fallback_locale' => env('APP_FALLBACK_LOCALE', 'en'),
    'faker_locale' => env('APP_FAKER_LOCALE', 'en_US'),

    /**
     * Encryption Key
     *
     * This key is utilized by Laravel (and therefore Craft’s) encryption
     * services and should be set to a random, 32 character string to ensure
     * that all encrypted values are secure.
     * 
     * The starter project should have done this after installing packages. If
     * you need to regenerate it, move the old key to `previous_keys`, then run
     * `artisan key:generate`.
     * 
     * Changing the `cipher` affects all previous keys. It is hard-coded here so
     * that Laravel’s default configuration does not destabilize your app.
     */

    'key' => env('APP_KEY'),
    'previous_keys' => [
        ...array_filter(
            explode(',', (string) env('APP_PREVIOUS_KEYS', ''))
        ),
    ],
    'cipher' => 'AES-256-CBC',

    /**
     * Maintenance Mode Driver
     * 
     * Your app is put into “maintenance mode” during migrations and while
     * project config changes are applied. These settings determine how Laravel
     * records that state.
     * 
     * Supported drivers:
     * - `file`: Default, suitable for a single server.
     * - `cache`: Necessary when using multiple servers (behind a load balancer)
     * - `array`: Only used for testing
     * 
     * When using the centralized `cache` driver, you should also choose a
     * `store`. If none is declared, Laravel uses the default cache driver,
     * which is typically the database.
     */

    'maintenance' => [
        'driver' => env('APP_MAINTENANCE_DRIVER', 'file'),
        // 'store' => env('APP_MAINTENANCE_STORE', 'database'),
    ],
];
