<?php

return [
    /**
     * Default Mailer
     *
     * Select a mailer configuration to use as the default, from the `mailers`
     * array, below.
     */

    'default' => env('MAIL_MAILER', 'log'),

    /**
     * Mailer Configurations
     * 
     * Most applications will only need to configure a single mailer for
     * production use. Additional mailers can be set up here for development,
     * or as “fallback” when Laravel encounters an issue with a transport.
     *
     * The specifics of each driver differ greatly. Supported drivers include:
     * - Generic transports: "smtp", "sendmail"
     * - Platform-specific: "mailgun", "ses", "ses-v2", "postmark", "resend"
     * - Utility: "log", "array", "failover", "roundrobin"
     */

    'mailers' => [
        // Send via SMTP, using credentials set in .env:
        'smtp' => [
            'transport' => 'smtp',
            'scheme' => env('MAIL_SCHEME'),
            'url' => env('MAIL_URL'),
            'host' => env('MAIL_HOST', '127.0.0.1'),
            'port' => env('MAIL_PORT', 2525),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'timeout' => null,
            'local_domain' => env('MAIL_EHLO_DOMAIN', parse_url((string) env('APP_URL', 'http://localhost'), PHP_URL_HOST)),
        ],
        // A debugging mailer; nothing is sent.
        'log' => [
            'transport' => 'log',
            'channel' => env('MAIL_LOG_CHANNEL'),
        ],
        // Selecting this mailer will attempt to send via the `smtp` config, or
        // log the full message if there is an error.
        'failover' => [
            'transport' => 'failover',
            'mailers' => [
                'smtp',
                'log',
            ],
            'retry_after' => 60,
        ],
    ],

    /**
     * Sender
     *
     * Email sent by Craft will always use the values you configure in the
     * control panel (Settings > Mail). Other Laravel packages that use its
     * mailer may read these settings, directly.
     */

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
        'name' => env('MAIL_FROM_NAME', env('APP_NAME', 'Laravel')),
    ],
];
