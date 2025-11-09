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




// Healthcheck route for Railway - must be before catch-all route and not require any middleware
Route::get('/health', function () {
    try {
        return response()->json(['status' => 'ok', 'timestamp' => date('Y-m-d H:i:s')], 200);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
});

Route::get('/{any}', function () {
    return view('welcome'); // Make sure 'welcome.blade.php' exists
})->where('any', '.*');