<?php
return [
    '*' => [
        'enabled' => false
    ],
    'dev' => [],
    'staging' => [],
    'production' => [
        'enabled' => true,
        'useQueue' => true,
        'keepLocal' => false,
        'prune' => true,
        'pruneHourlyCount' => 6,
        'pruneDailyCount' => 14,
        'pruneWeeklyCount' => 4,
        'pruneMonthlyCount' => 6,
        'pruneYearlyCount' => 3
    ],
];
