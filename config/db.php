<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 *
 * @see craft\config\DbConfig
 */

// This grabs the dynamic env var for database URL because it may be managed automatically
// by the hosting provider (e.g. The env contains "JAWSDB_URL=mysql://...").
// So, we set DB_URL_ENV_KEY="JAWSDB_URL"
// in the environment and that will read/parse the JAWSDB_URL
if (getenv('DB_URL_ENV_KEY')) {
  $databaseConfig = parse_url(getenv(getenv('DB_URL_ENV_KEY')));
} else {
  $databaseConfig = [
    'driver' => getenv('DB_DRIVER') ?? 'mysql',
    'host' => getenv('DB_SERVER'),
    'user' => getenv('DB_USER'),
    'pass' => getenv('DB_PASSWORD'),
    'path' => getenv('DB_DATABASE'),
    'port' => getenv('DB_PORT') ?? 3306
  ];
}

$databaseConfig['tablePrefix'] = getenv('DB_TABLE_PREFIX');
$databaseConfig['schema'] = getenv('DB_SCHEMA');

return [
  'driver' => $databaseConfig['driver'],

  // The database server name or IP address.
  // Usually this is 'localhost' or '127.0.0.1'.
  'server'      => $databaseConfig['host'],

  // The database username to connect with.
  'user'        => $databaseConfig['user'],

  'port'        => $databaseConfig['port'],

  // The database password to connect with.
  'password'    => $databaseConfig['pass'],

  // The name of the database to select.
  'database'    => trim($databaseConfig['path'], '/'),

  'schema'      => $databaseConfig['schema'];

  // The prefix to use when naming tables.
  // This can be no more than 5 characters.
  'tablePrefix' => getenv('APP_DB_TABLE_PREFIX'),
];
