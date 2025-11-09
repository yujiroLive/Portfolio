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
    return response()->json(['status' => 'ok', 'timestamp' => now()], 200);
})->middleware([]);

Route::get('/{any}', function () {
    return view('welcome'); // Make sure 'welcome.blade.php' exists
})->where('any', '.*');