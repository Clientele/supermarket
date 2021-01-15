<?php

namespace App\Http\Controllers\Resources;

use App\Http\Controllers\GoodBaseController;
use App\Models\Depot;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Staff;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ProductsResourcesController extends GoodBaseController
{

    public function __construct(){
        // $this->middleware('auth');
       // sleep(1);
    }

    /** Vendors **/
    public function getVendors(Request $request){

        $regId = $request->input('region_id');
        if(is_numeric($regId)){
            $depots = Vendor::where(['region_id'=>$regId])->with(['region','district','place'])->paginate(500);
        }else{
            $depots = Vendor::with(['region','district','place'])->paginate(500);
        }

        $responseData['vendors'] = $depots;
        return $this->returnResponse('Vendors ', $responseData);
    }

    public function getAllVendors(Request $request){

        $regId = $request->input('region_id');
        if(is_numeric($regId)){
            $depots = Vendor::where(['region_id'=>$regId])->with(['region','district','place'])->get();
        }else{
            $depots = Vendor::with(['region','district','place'])->get();
        }

        $responseData['vendors'] = $depots;
        return $this->returnResponse('Vendors ', $responseData);
    }

    /** Products **/
    public function getProducts(Request $request){

        $regId = $request->input('region_id');
        if(is_numeric($regId)){
            $products = Product::paginate(500);
        }else{
            $products = Product::paginate(500);
        }

        $responseData['products'] = $products;
        return $this->returnResponse('Products ', $responseData);
    }

    /** Categories **/
    public function getCategories(Request $request){

        $parentId = $request->input('parent_id');
        if(is_numeric($parentId)){
            $categories = ProductCategory::where([
                'parent_category_id' => $parentId
            ])->get();
        }else{
            $categories = ProductCategory::where([
                'parent_category_id' => null
            ])->get();
        }


        $responseData['categories'] = $categories;
        return $this->returnResponse('Products Categories ', $responseData);
    }


}





