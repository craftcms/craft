<?php

$options = getopt('', ['env-template:']);
$envFile = $options['env-template'] ?? '.env.example.dev';

if (file_exists('.env')) {
    echo ".env already exists, skipping\n";
} else {
    copy($envFile, '.env');
    echo "Copied {$envFile} to .env\n";
}
