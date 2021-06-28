<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::any('{all}', function () {
    return view('welcome');
})
->where(['all' => '.*']);

Route::get('/', function () {
    return view('welcome');
});
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/login', 'HomeController@index')->name('home');

Route::get('/staff', 'HomeController@staff');

Route::get('/vendor', 'HomeController@vendor');

Route::get('/boogie/boogie', 'HomeController@vendor');
Route::get('/boogie', 'HomeController@vendor');



