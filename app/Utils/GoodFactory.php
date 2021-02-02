<?php

namespace App\Utils;

class GoodFactory{


    #Staff Statuses
    public static function generateOrderNumber($districtId, $customerId, $orderId ){
        return "OD".$districtId.$customerId.$orderId;
    }


}


