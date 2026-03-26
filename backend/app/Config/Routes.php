<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', ['namespace' => 'App\Controllers'], static function ($routes) {
    $routes->post('auth/register', 'Auth::register');
    $routes->post('auth/login', 'Auth::login');

    $routes->get('users', 'Api::users');
    $routes->get('teachers', 'Api::teachers');
});
