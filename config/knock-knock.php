<?php

return [
    '*' => [
        'enabled' => false,
        'password' => getenv('KNOCK_KNOCK_PASSWORD', 'testtest1234'),
        'siteSettings' => [],
        'checkInvalidLogins' => false,
        'invalidLoginWindowDuration' => '3600',
        'maxInvalidLogins' => 10,
        'whitelistIps' => '',
        'blacklistIps' => '',
    ],
    'staging' => [
        'enabled' => true,
    ],
];