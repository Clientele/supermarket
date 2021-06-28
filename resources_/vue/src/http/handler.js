import router from '@/router'

function parseError(statusCode) {
  switch (statusCode) {
    case 400:
    {
      return "Server could not process the request";
    }break;

    case 401:
    {
      return "You have not logged in";
    }break;

    case 402:
    {
      return "Payment required";
    }break;

    case 403:
    {
      return "Resource is forbidden";
    }
      break;
    case 404:
    {
      return "URL/Resource Not found";
    }
      break;
    case 405:
    {
      return "Request method not allowed";
    }
      break;
    case 406:
    {
      return "Not Acceptable";
    }
      break;
    case 407:
    {
      return "Proxy authentication required";
    }
      break;

    case 408:
    {
      return "Request timeout";
    }
      break;
    case 413:
    {
      return "Payload Too Large";
    }
      break;

    case 415:
    {
      return "Unsupported Media Type";
    }
      break;

    case 413:
    {
      return "Payload Too Large";
    }break;
    case 422:
    {
      return "Could not process request";
    }break;

    case 429:
    {
      return "Too Many Requests";
    }
      break;

/// 5xx
    case 500:
    {
      return "Internal Server Error";
    }
      break;

    case 504:
    {
      return "Gateway Timeout";
    }
      break;

    case 504:
    {
      return "Network Authentication Required";
    }
      break;

    default:
      return "Error Code:"+statusCode
  }
}

export function handle(error) {

   if(error.response){
     console.log(JSON.stringify(error.response.data.message));

     if(error.response.status==401){
      console.log("redirecting....");
       router.push('/login').catch(() => {})
      return "Not logged in";
    }else{
     let message = error.response.data? error.response.data.message:   error.response.message;
     return message+" -"+parseError(error.response.status ) ;
    }

   }else{
    console.log(error);
  }

  return "An error occurred"

}
