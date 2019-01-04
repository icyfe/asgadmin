const { Http } = require('../util/http');
const http = new Http();
import {BASE_URL} from '@/config/config'
function getIndex(data) {
    return http.post(`${BASE_URL}/api/`
        , data)
        .then(function (res) { 
        })
}
function posttest(){
    
}
export { getIndex }