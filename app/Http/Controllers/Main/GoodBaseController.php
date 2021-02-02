<?php

namespace App\Http\Controllers\Main;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GoodBaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function returnResponse($message,$data)
    {
    	$response = [
             'success' => true,
             'message' => $message,
             'payload'    => $data,   ];
        return response()->json($response, 200);
    }

    /**
     * return error response.
     * @return \Illuminate\Http\Response
     */
    public function returnError($message, $errorsArray = [], $code = 200)
    {
    	$response = [
            'success' => false,
            'message' => $message,
            'payload' => $errorsArray,
        ];

        return response()->json($response, $code);
    }


    public function getLoggedUserCenter(){
        $centerOwner = CenterOwner::where('user_id',Auth::id())->first();
        return $centerOwner->collectionDeliveryCenter;
    }


    ///----------------
    /// D r i v e r
    public function getLoggedDriverInfo(){
        return  Driver::where('user_id',Auth::id())
        ->with('vehicle')
        ->first();
     }



}
