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
Route::post('ping', 'Main\Auth\AuthController@ping');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


/// -----------------------------------
/// M A I N   S Y S T E M
///------------------------------------

///1. AUTH
Route::prefix('v1/auth')->group(function () {
    Route::post('login', 'Main\Auth\AuthController@login');
});


/// I N V E N T O R Y
Route::prefix('v1/inventory')->group(function () {

    Route::group(['middleware' => 'auth:api'], function () {

        /*** BRANCHES STOCK  ***/
        Route::post('add', 'Main\Products\InventoryController@addStockToInventory');
        Route::get('available', 'Main\Products\InventoryController@getStockAvailableStock');
        Route::post('available/branch/breakdown', 'Main\Products\InventoryController@getVariantStocksBreakdown');

    });

});


/// SALES
Route::prefix('v1/sales')->group(function () {

    Route::group(['middleware' => 'auth:api'], function () {

        /*** SALES ***/
        Route::post('add', 'Main\Sales\SalesController@addSale');

        Route::get('my/get', 'Main\Sales\SalesController@getSalesMade');

    });

});


/// OTHERS
Route::prefix('v1')->group(function () {

    Route::group(['middleware' => 'auth:api'], function () {

        /*** EXPENSES ***/
        Route::post('expense/add', 'Main\ExpensesController@addExpense');
        Route::get('expenses/get', 'Main\ExpensesController@getExpenses');
        Route::get('expenses/branch/get', 'Main\ExpensesController@getBranchExpenses');

    });

});


/// S Y S T E M   C O N F I G
Route::prefix('v1/config')->group(function () {

    /*** USERS, BRANCHES, ADDRESSES  ***/
    Route::group(['middleware' => ['auth:api']], function () {

        /*** USERS  ***/
        #users
        Route::get('staff/users/get', 'Main\Config\StaffController@getUsers');
        Route::post('staff/user/add', 'Main\Config\StaffController@addUser');
        Route::post('staff/user/update', 'Main\Config\StaffController@updateUser');
        Route::post('staff/user/remove', 'Main\Config\StaffController@removeUser');

        /*** BRANCHES  ***/
        #branches
        Route::post('branch/add', 'Main\Config\BranchesController@addBranch');
        Route::post('branch/remove', 'Main\Config\BranchesController@removeBranch');


        /*** ADDRESSES  ***/
        #zones
        Route::post('addresses/zone/add', 'Main\Config\AddressesController@addSalesZone');
        Route::post('addresses/zone/remove', 'Main\Config\AddressesController@removeSalesZone');
        Route::post('addresses/zone/update', 'Main\Config\AddressesController@updateZone');
        Route::post('addresses/zone/district/remove', 'Main\Config\AddressesController@removeDistrictFromZone');

        #regions
        Route::post('addresses/region/add', 'Main\Config\AddressesController@addRegion');
        Route::post('addresses/region/update', 'Main\Config\AddressesController@updateRegion');
        Route::post('addresses/region/remove', 'Main\Config\AddressesController@removeRegion');

        #districts
        Route::post('addresses/district/add', 'Main\Config\AddressesController@addDistrict');
        Route::post('addresses/district/update', 'Main\Config\AddressesController@updateDistrict');
        Route::post('addresses/district/remove', 'Main\Config\AddressesController@removeDistrict');

        #places
        Route::post('addresses/place/add', 'Main\Config\AddressesController@addPlace');
        Route::post('addresses/place/update', 'Main\Config\AddressesController@updatePlace');
        Route::post('addresses/place/remove', 'Main\Config\AddressesController@removePlace');

    });

    /** PRODUCTS CONFIG */
    Route::group(['middleware' => 'auth:api'], function () {

        /***  P R O D U C T S   ***/
        #categories
        Route::post('category/add', 'Main\Products\ProductsController@addProductCategory');
        Route::post('category/remove', 'Main\Products\ProductsController@removeCategory');

        #products
        Route::post('product/add', 'Main\Products\ProductsController@addProduct');
        Route::post('product/update', 'Main\Products\ProductsController@updateProduct');
        Route::post('product/remove', 'Main\Products\ProductsController@removeProduct');
        Route::post('product/publish/toggle', 'Main\Products\ProductsController@toggleStatus');
        Route::post('product/assigned/category/remove', 'Main\Products\ProductsController@removeAssignedCategory');
        Route::post('product/image/update', 'Main\Products\ProductsController@updateProductImage');


    });

});


/// R E P O R T S
Route::prefix('v1/reports')->group(function () {

    Route::group(['middleware' => 'auth:api'], function () {
        #Stock
        Route::get('stock/available', 'Main\Reports\SalesReportsController@getAvailableStock');

        #Sales
        Route::get('stock/available', 'Main\Reports\SalesReportsController@getAvailableStock');
        Route::get('sales/get', 'Main\Reports\SalesReportsController@getBranchSales');

    });

});


/// RESOURCES
Route::prefix('v1/resources')->group(function () {

    Route::group(['middleware' => ['auth:api']], function () {

        /*** BRANCHES  ***/
        Route::get('branches/get', 'Main\Config\BranchesController@getBranches');

        #categories
        Route::get('products/categories', 'Main\Resources\ProductsResourcesController@getCategories');

        #products
        Route::get('products/get', 'Main\Resources\ProductsResourcesController@getProducts');
        Route::get('products/categories/all', 'Main\Resources\ProductsResourcesController@getAllCategories');
        Route::get('product/details', 'Main\Resources\ProductsResourcesController@getProductDetails');

    });

    /*** +++++++++++++++++++ ***/
    /*** ADDRESSES  ***/
    Route::get('addresses/countries', 'Main\Resources\AddressesResourcesController@getCountries');
    Route::get('addresses/regions', 'Main\Resources\AddressesResourcesController@getRegions');
    Route::get('addresses/zones', 'Main\Resources\AddressesResourcesController@getSalesZone');
    Route::get('addresses/zone/districts', 'Main\Resources\AddressesResourcesController@getZoneDistrict');

    Route::get('addresses/districts', 'Main\Resources\AddressesResourcesController@getDistricts');
    Route::get('addresses/places', 'Main\Resources\AddressesResourcesController@getPlaces');
    Route::post('addresses/find', 'Main\Resources\AddressesResourcesController@findAddress');

});




/// CUSTOMERS
Route::prefix('v1/customers')->group(function () {

    Route::group(['middleware' => 'auth:api'], function () {
        /*** CUSTOMERS  ***/
        Route::post('customer/add', 'Main\Sales\CustomersController@addCustomer');
        Route::post('customer/remove', 'Main\Sales\CustomersController@removeCustomer');
        Route::post('customer/verify', 'Main\Sales\CustomersController@verifyCustomer');

    });

});





