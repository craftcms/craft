<?php

/**
 * This file has been adapted from Laravel’s default, for brevity.
 *
 * The original one can be found here:
 * ../vendor/laravel/framework/config/filesystems.php
 * 
 * See the official documentation for disks:
 * https://laravel.com/framework/docs/13.x/filesystem
 */

return [
    /**
     * Each disk configuration is identified by a handle (the key). You will
     * reference these when creating asset volumes in Craft. Multiple asset
     * volumes can share a filesystem; you may also set a volume’s filesystem to
     * an environment variable (like `$USER_UPLOADS_FS`) to switch between disks
     * in different environments.
     * 
     * Different drivers (like `ftp`, `sftp`, or `s3`) will have their own
     * config properties. The `scoped` driver is special: it simplifies sharing
     * low-level configuration between multiple disks (like credentials for a
     * remote storage service), while keeping operations isolated to a specific
     * directory (the `prefix`).
     * 
     * If files in a disk need URLs, its configuration should meet one of the
     * following criteria:
     * - Its `root` should be within the `public/` directory;
     * - A corresponding entry in `links` is configured (and created on deploy);
     * - The `serve` option is set to `true` so Laravel can generate the
     *   appropriate routes *and* the disk’s `url` must reach the web server;
     * 
     * In general, using the PHP process to serve static files is inefficient,
     * and recommended only when some level of access control is necessary.
     */

    'disks' => [
        // On-disk files that should not be directly accessible from the web:
        'private' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'throw' => false,
            'report' => false,
        ],
        // On-disk storage for publicly-accessible files:
        'uploads' => [
            'driver' => 'local',
            'root' => public_path('uploads'),
            'url' => rtrim(env('APP_URL', 'http://localhost'), '/').'/uploads',
            'visibility' => 'public',
            'throw' => false,
            'report' => false,
        ],
    ],

    /**
     * If you need to store or manipulate files in custom application logic,
     * you can declare a “default” disk, which the app will use unless another
     * is specified:
     * 
     * ```php
     * // Allow the app to use the default disk:
     * Storage::put('temp/some-filename', $upload);
     * 
     * // Explicitly select a disk by name:
     * Storage::disk('cloud')->put('temp/some-filename', $upload);
     * ```
     * 
     * Please be aware that directly modifying the contents of a disk can cause
     * Craft to lose track of assets. Whenever possible, we recommend…
     * - …using Craft’s own APIs to manage assets.
     * - …restricting direct manipulation of files to disks that are not used
     *   for asset volumes
     */

    'default' => env('FILESYSTEM_DISK', 'private'),

    /**
     * To keep uploaded content confined to system storage directories, you can
     * add mappings, here. When running the `storage:link` Artisan command,
     * Laravel creates a symbolic link from the *key* to the *value*.
     * 
     * Shares do *not* need to correspond to a disk’s `root` or `url`; you may
     * use these however you like—including to expose other static files, build
     * artifacts, etc.
     */

    'links' => [
        // Expose the `storage/app/public/shares` to the public web root, `public/shares`:
        // public_path('shares') => storage_path('app/public/shares'),
    ],
];
