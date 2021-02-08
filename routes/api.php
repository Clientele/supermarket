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


/// -----------------------------------
/// M A I N   S Y S T E M
///------------------------------------

///1. AUTH
Route::prefix('v1/auth')->group(function () {
    Route::post('login', 'Main\Auth\AuthController@login');
});


/// I N V E N T O R Y
Route::prefix('v1/products')->group(function () {

    Route::group(['middleware' => 'auth:api'], function () {

        /*** DEPOT STOCK  ***/
        Route::get('inventory/stock', 'Main\Products\InventoryController@getStock');
        Route::post('inventory/stock/receive', 'Main\Products\InventoryController@receiveStock');
        Route::get('inventory/stock/product', 'Main\Products\InventoryController@getVariantStocks');
        Route::get('inventory/stock/variant/breakdown', 'Main\Products\InventoryController@getVariantStocksBreakdown');

        /*** MOBILE VEHICLE STOCK  ***/
        Route::get('inventory/stock/mobile', 'Main\Products\MobileInventoryController@stockBySalesPeople');
        Route::get('inventory/stock/mobile/staff', 'Main\Products\MobileInventoryController@getStaffStock');
        Route::get('inventory/stock/mobile/available', 'Main\Products\MobileInventoryController@checkAvailableStock');
        Route::get('inventory/stock/mobile/breakdown', 'Main\Products\MobileInventoryController@getStockBreakdown');

        /*** STOCK REQUESTS  ***/
        Route::get('inventory/stock/init/request', 'Main\Products\StockRequestsController@getGroupedOrderedVariants');
        Route::post('inventory/stock/request', 'Main\Products\StockRequestsController@requestStock');
        Route::get('inventory/stock/requests', 'Main\Products\StockRequestsController@getStockRequests');
        Route::get('inventory/stock/request', 'Main\Products\StockRequestsController@getStockRequestDetails');
        Route::post('inventory/stock/request/history', 'Main\Products\StockRequestsController@getStockRequestHistory');
        Route::post('inventory/stock/request/history/details', 'Main\Products\StockRequestsController@getStockRequestHistoryDetails');

        #requests approval & dispatch
        Route::post('inventory/stock/request/available', 'Main\Products\StockRequestsController@getAvailableDepotProducts');
        Route::post('inventory/stock/request/approve', 'Main\Products\StockRequestsController@approveRequest');
        Route::post('inventory/stock/request/dispatch', 'Main\Products\StockRequestsController@dispatchRequest');

    });

});


/// SALES
Route::prefix('v1/sales')->group(function () {

    Route::group(['middleware' => 'auth:api'], function () {


        /*** CUSTOMERS  ***/
        Route::post('customer/add', 'Main\Sales\CustomersController@addCustomer');
        Route::post('customer/remove', 'Main\Sales\CustomersController@removeCustomer');
        Route::post('customer/verify', 'Main\Sales\CustomersController@verifyCustomer');

        /*** ORDERS     ***/
        Route::post('order/add', 'Main\Sales\OrdersController@addOrder');
        Route::post('order/remove', 'Main\Sales\OrdersController@removeOrder');
        Route::post('order/staff', 'Main\Sales\OrdersController@setStaff');
        Route::post('order/approve', 'Main\Sales\OrdersController@approveOrder');
        Route::post('order/cancel', 'Main\Sales\OrdersController@cancelOrder');
        Route::post('order/item/reject', 'Main\Sales\OrdersController@rejectOrderItem');

        Route::post('order/delivery/available', 'Main\Sales\OrdersController@getAvailableTruckedProducts');
        Route::post('order/delivery/deliver', 'Main\Sales\OrdersController@deliverProduct');

        /*** DELIVERIES ***/
        Route::post('delivery/add', 'Main\Sales\CustomersController@addDelivery');
        Route::post('delivery/remove', 'Main\Sales\CustomersController@removeDelivery');

    });

});


/// P R O D U C T S    C O N F I G S
Route::prefix('v1/config')->group(function () {

    Route::group(['middleware' => 'auth:api'], function () {

        /*** V E N D O R S  ***/
        Route::post('vendor/add', 'Main\Products\VendorsController@addVendor');
        Route::post('vendor/remove', 'Main\Products\VendorsController@removeVendor');
        Route::post('vendor/status/change', 'Main\Products\VendorsController@toggleVendorStatus');

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

        #product variants
        Route::post('product/variant/add', 'Main\Products\ProductsVariantsController@addProductVariant');
        Route::post('product/variant/update', 'Main\Products\ProductsVariantsController@updateProductVariant');
        Route::post('product/variant/remove', 'Main\Products\ProductsVariantsController@removeProductVariant');
        Route::post('product/variant/publish/toggle', 'Main\Products\ProductsVariantsController@toggleVariantStatus');
        Route::post('product/variant/image/update', 'Main\Products\ProductsVariantsController@updateVariantImage');
        Route::post('product/variant/image/remove', 'Main\Products\ProductsVariantsController@removeVariantImage');

        #product variant prices
        Route::post('product/variant/price/add', 'Main\Products\ProductsVariantsController@addVariantPrice');
        Route::post('product/variant/price/remove', 'Main\Products\ProductsVariantsController@removeVariantPrice');

    });
});

Route::prefix('v1/reports')->group(function () {

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('sales/stock', 'Main\Reports\SalesReportsController@salesPersonInsights');
    });

});

/// S Y S T E M   C O N F I G
Route::prefix('v1/config')->group(function () {

    Route::group(['middleware' => ['auth:api']], function () {

        /*** USERS & ROLES  ***/
        #roles
        Route::post('staff/role/add', 'Main\Config\PermissionsController@addRole');
        Route::post('staff/role/remove', 'Main\Config\PermissionsController@removeRole');
        Route::post('staff/role/update', 'Main\Config\PermissionsController@updateRole');

        #users
        Route::post('staff/user/add', 'Main\Config\StaffController@addStaff');
        Route::post('staff/user/update', 'Main\Config\StaffController@updateStaff');
        Route::post('staff/user/remove', 'Main\Config\StaffController@removeStaff');

        /*** ASSETS  ***/
        #depots
        Route::post('assets/depot/add', 'Main\Config\DepotsController@addDepot');
        Route::post('assets/depot/remove', 'Main\Config\DepotsController@removeDepot');

        #vehicles
        Route::post('assets/vehicle/add', 'Main\Config\VehiclesController@addVehicle');

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

});










///------------------------------------
/// V E N D O R S
///------------------------------------


/// -----------------------------------
/// C U S T O M E R S
///------------------------------------
Route::prefix('v1/customer')->group(function () {

    /*** AUTH  ***/
    Route::post('login', 'Customer\AuthController@login');
    Route::post('register', 'Customer\AuthController@register');

    #Passwords
    Route::post('password/otp/request', 'Customer\AuthController@requestOtp'); #send sms containing token
    Route::post('password/otp/verify', 'Customer\AuthController@verifyOtp');   #returns logged token

    /*** BROWSING PRODUCTS  ***/
    Route::get('products/feed', 'Customer\CustomerProductsController@getProductsFeed');
    Route::get('product/details', 'Customer\CustomerProductsController@getProductDetails');
    /*** BROWSING PRODUCTS  ***/

    Route::group(['middleware' => ['auth:api']], function () {
        Route::post('password/update', 'Customer\AuthController@updatePassword');
        Route::post('account/address', 'Customer\AccountController@updateAddress');

        Route::post('/cart/product/add', 'Customer\CustomerCartController@addProductToCart');
        Route::post('cart/delivery/address', 'Customer\CustomerCartController@addDeliveryAddress');
        Route::get('cart/products', 'Customer\CustomerCartController@getCartProducts');

        Route::post('order/place', 'Customer\CustomerOrdersController@submitOrder');
        Route::get('order/history', 'Customer\CustomerOrdersController@getOrderHistory');
        Route::get('order/details', 'Customer\CustomerOrdersController@getOrderDetails');

    });


});








/// RESOURCES
Route::prefix('v1/resources')->group(function () {

    Route::group(['middleware' => ['auth:api']], function () {

        /*** PRODUCTS  ***/
        #vendors
        Route::get('products/vendors', 'Main\Resources\ProductsResourcesController@getVendors');
        Route::get('products/vendors/all', 'Main\Resources\ProductsResourcesController@getAllVendors');

        #products
        Route::get('products/products', 'Main\Resources\ProductsResourcesController@getProducts');
        Route::get('products/categories', 'Main\Resources\ProductsResourcesController@getCategories');
        Route::get('products/categories/all', 'Main\Resources\ProductsResourcesController@getAllCategories');
        Route::get('product/details', 'Main\Resources\ProductsResourcesController@getProductDetails');

        #variants
        Route::get('product/variants', 'Main\Resources\ProductsResourcesController@getProductVariants');
        Route::get('product/variant/details', 'Main\Resources\ProductsResourcesController@getVariantDetails');

        /*** SALES  ***/
        #orders
        Route::get('sales/orders', 'Main\Resources\OrdersResourcesController@getOrders');
        Route::get('sales/order', 'Main\Resources\OrdersResourcesController@getOrderDetails');

        #customers
        Route::get('sales/customers', 'Main\Resources\CustomersResourcesController@getCustomers');
        Route::get('sales/customer/find', 'Main\Resources\CustomersResourcesController@findCustomer');
        Route::get('sales/customer/details', 'Main\Resources\CustomersResourcesController@getCustomerDetails');
        Route::get('sales/customer/orders', 'Main\Resources\CustomersResourcesController@getCustomerOrders');

        /*** ACCESS CONTROL  ***/
        #roles & permissions
        Route::get('staff/roles/full', 'Main\Resources\StaffResourcesController@getFullAvailableRoles');
        Route::get('staff/roles/all', 'Main\Resources\StaffResourcesController@getAvailableRoles');
        Route::get('staff/permissions/all', 'Main\Resources\StaffResourcesController@getAllAvailablePermissions');
        Route::post('staff/role/permissions', 'Main\Resources\StaffResourcesController@getPermissionsInRole');

        #users
        Route::post('staff/get', 'Main\Resources\StaffResourcesController@getStaffByRole');
        Route::post('staff/details', 'Main\Resources\StaffResourcesController@getStaffDetails');
        Route::get('staff/no_role', 'Main\Resources\StaffResourcesController@getStaffWithNoRole');

        /*** ASSETS  ***/
        #depots
        Route::get('assets/depots', 'Main\Resources\AssetsResourcesController@getDepots');

        #vehicles
        Route::get('assets/vehicles', 'Main\Resources\AssetsResourcesController@getVehicles');

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







