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



/// SALES
Route::prefix('v1/sales')->group(function () {

    /*** CUSTOMERS  ***/

    /*** ORDERS     ***/

    /*** DELIVERIES ***/

});



/// P R O D U C T S    C O N F I G S
Route::prefix('v1/config')->group(function () {

    /*** V E N D O R S  ***/
    Route::post('vendor/add', 'Products\VendorsController@addVendor');
    Route::post('vendor/remove', 'Products\VendorsController@removeVendor');
    Route::post('vendor/status/change', 'Products\VendorsController@toggleVendorStatus');

    /***  P R O D U C T S   ***/
    #categories
    Route::post('category/add', 'Products\ProductsController@addProductCategory');
    Route::post('category/remove', 'Products\ProductsController@removeCategory');

    #products
    Route::post('product/add', 'Products\ProductsController@addProduct');
    Route::post('product/update', 'Products\ProductsController@updateProduct');
    Route::post('product/remove', 'Products\ProductsController@removeProduct');
    Route::post('product/publish/toggle', 'Products\ProductsController@toggleStatus');
    Route::post('product/assigned/category/remove', 'Products\ProductsController@removeAssignedCategory');

    #product variants
    Route::post('product/variant/add', 'Products\ProductsVariantsController@addProductVariant');
    Route::post('product/variant/update', 'Products\ProductsVariantsController@updateProductVariant');
    Route::post('product/variant/remove', 'Products\ProductsVariantsController@removeProductVariant');
    Route::post('product/variant/publish/toggle', 'Products\ProductsVariantsController@toggleVariantStatus');


    /*** INVENTORY  ***/

});


/// S Y S T E M   C O N F I G
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

        /*** ASSETS  ***/
        #depots
        Route::post('assets/depot/add', 'Config\DepotsController@addDepot');
        Route::post('assets/depot/remove', 'Config\DepotsController@removeDepot');

        #vehicles
        Route::post('assets/vehicle/add', 'Config\VehiclesController@addVehicle');

        /*** ADDRESSES  ***/
        #regions
        Route::post('addresses/region/add', 'Config\AddressesController@addRegion');
        Route::post('addresses/region/update', 'Config\AddressesController@updateRegion');
        Route::post('addresses/region/remove', 'Config\AddressesController@removeRegion');

        #districts
        Route::post('addresses/district/add', 'Config\AddressesController@addDistrict');
        Route::post('addresses/district/update', 'Config\AddressesController@updateDistrict');
        Route::post('addresses/district/remove', 'Config\AddressesController@removeDistrict');

        #places
        Route::post('addresses/place/add', 'Config\AddressesController@addPlace');
        Route::post('addresses/place/update', 'Config\AddressesController@updatePlace');
        Route::post('addresses/place/remove', 'Config\AddressesController@removePlace');

    });

});


/// RESOURCES
Route::prefix('v1/resources')->group(function () {

    Route::group(['middleware' => ['auth:api']], function () {

        /*** PRODUCTS  ***/
        #vendors
        Route::get('products/vendors', 'Resources\ProductsResourcesController@getVendors');
        Route::get('products/vendors/all', 'Resources\ProductsResourcesController@getAllVendors');

        #products
        Route::get('products/products', 'Resources\ProductsResourcesController@getProducts');
        Route::get('products/categories', 'Resources\ProductsResourcesController@getCategories');
        Route::get('products/categories/all', 'Resources\ProductsResourcesController@getAllCategories');
        Route::get('product/details', 'Resources\ProductsResourcesController@getProductDetails');

        #variants
        Route::get('product/variants', 'Resources\ProductsResourcesController@getProductVariants');

        /*** SALES  ***/
        #orders
        Route::get('sales/orders', 'Resources\ProductsResourcesController@getProducts');

        #customers
        Route::get('sales/customers', 'Resources\ProductsResourcesController@getProducts');


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

        /*** ASSETS  ***/
        #depots
        Route::get('assets/depots', 'Resources\AssetsResourcesController@getDepots');

        #vehicles
        Route::get('assets/vehicles', 'Resources\AssetsResourcesController@getVehicles');

    });



    /*** +++++++++++++++++++ ***/
    /*** ADDRESSES  ***/
    Route::get('addresses/countries', 'Resources\AddressesResourcesController@getCountries');
    Route::get('addresses/regions', 'Resources\AddressesResourcesController@getRegions');
    Route::get('addresses/districts', 'Resources\AddressesResourcesController@getDistricts');
    Route::get('addresses/places', 'Resources\AddressesResourcesController@getPlaces');
    Route::post('addresses/find', 'Resources\AddressesResourcesController@findAddress');


});




