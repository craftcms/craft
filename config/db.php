<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 *
 * @see craft\config\DbConfig
 */

use craft\helpers\App;

if(App::env('DB_DSN')){
    return [
        'dsn' => App::env('DB_DSN'),
        'user' => App::env('DB_USER'),
        'password' => App::env('DB_PASSWORD'),
        'schema' => App::env('DB_SCHEMA'),
        'tablePrefix' => App::env('DB_TABLE_PREFIX'),
    ];
}
  
return [
    'driver' => App::env('DB_DRIVER'),
    'server' => App::env('DB_SERVER'),
    'port' => App::env('DB_PORT'),
    'database' => App::env('DB_DATABASE'),
    'user' => App::env('DB_USER'),
    'password' => App::env('DB_PASSWORD'),
    'schema' => App::env('DB_SCHEMA'),
    'tablePrefix' => App::env('DB_TABLE_PREFIX'),
];
  