<?php

return [

    'paths' => [
        'sanctum/csrf-cookie',
        'api/*',


        'register',
        'login',
        'logout',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:5173'),
        env('APP_URL',      'http://main.local'),
    ],

    'allowed_headers' => ['*'],


    'exposed_headers' => [],

    'supports_credentials' => true,
];