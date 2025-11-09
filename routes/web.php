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
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => date('Y-m-d H:i:s'),
        'app' => config('app.name', 'Laravel')
    ], 200);
});

// Root route
Route::get('/', function () {
    return view('welcome');
});

// Catch-all route for React app
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api|health).*$');