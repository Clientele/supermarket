<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('ping', 'Auth\AuthController@ping');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


///1. AUTH
Route::prefix('v1/auth')->group(function () {
    Route::post('login', 'Auth\AuthController@login');
});


/// PRODUCTS
Route::prefix('v1/products')->group(function () {

    /*** PRODUCTS CONFIG  ***/

    /*** VENDORS  ***/

    /*** INVENTORY  ***/

});


/// SALES
Route::prefix('v1/sales')->group(function () {

    /*** CUSTOMERS  ***/

    /*** ORDERS     ***/

    /*** DELIVERIES ***/

});


/// CONFIGURATIONS
Route::prefix('v1/config')->group(function () {

    Route::group(['middleware' => ['auth:api']], function () {

        /*** USERS & ROLES  ***/
        #roles
        Route::post('staff/role/add', 'Config\PermissionsController@addRole');
        Route::post('staff/role/remove', 'Config\PermissionsController@removeRole');
        Route::post('staff/role/update', 'Config\PermissionsController@updateRole');

        #users
        Route::post('staff/user/add', 'Config\StaffController@addStaff');
        Route::post('staff/user/update', 'Config\StaffController@updateStaff');
        Route::post('staff/user/remove', 'Config\StaffController@removeStaff');

        /*** DEPOTS         ***/

        /*** VEHICLES       ***/

    });

});


/// RESOURCES
Route::prefix('v1/resources')->group(function () {

    Route::group(['middleware' => ['auth:api']], function () {

        /*** USERS & ROLES  ***/
        #roles & permissions
        Route::get('staff/roles/full', 'Resources\StaffResourcesController@getFullAvailableRoles');
        Route::get('staff/roles/all', 'Resources\StaffResourcesController@getAvailableRoles');
        Route::get('staff/permissions/all', 'Resources\StaffResourcesController@getAllAvailablePermissions');
        Route::post('staff/role/permissions', 'Resources\StaffResourcesController@getPermissionsInRole');

        #users
        Route::post('staff/get', 'Resources\StaffResourcesController@getStaffByRole');
        Route::post('staff/details', 'Resources\StaffResourcesController@getStaffDetails');
        Route::get('staff/no_role', 'Resources\StaffResourcesController@getStaffWithNoRole');

        /*** DEPOTS         ***/

        /*** VEHICLES       ***/

    });



    /*** ADDRESSES      ***/
    Route::get('addresses/countries', 'Resources\AddressesResourcesController@getCountries');
    Route::get('addresses/regions', 'Resources\AddressesResourcesController@getRegions');
    Route::get('addresses/districts', 'Resources\AddressesResourcesController@getDistricts');
    Route::get('addresses/places', 'Resources\AddressesResourcesController@getPlaces');


});




