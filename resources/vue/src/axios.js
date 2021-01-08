// axios
import axios from 'axios'

const baseURL = 'http://ajab.io/api/v1'
 //const baseURL = ''

let accessToken = localStorage.getItem('accessToken');
//console.log("token: "+accessToken);

export default axios.create({
  baseURL,
  headers: {'Authorization': 'Bearer '+ accessToken}

  // You can add your headers here
})
