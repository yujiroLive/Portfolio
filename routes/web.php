<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




// Healthcheck route for Railway - must be before catch-all route
// This route should not use any middleware that could fail
Route::get('/health', function () {
    try {
        return response()->json([
            'status' => 'ok',
            'timestamp' => date('Y-m-d H:i:s'),
            'app' => config('app.name', 'Laravel'),
            'php' => PHP_VERSION
        ], 200)->header('Content-Type', 'application/json');
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500)->header('Content-Type', 'application/json');
    }
})->middleware([]);

// Root route
Route::get('/', function () {
    return view('welcome');
});

// Catch-all route for React app
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api|health).*$');