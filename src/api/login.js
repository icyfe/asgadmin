const { Http } = require('../util/http');
const http = new Http();
import {BASE_URL} from '@/config/config'
function postLogin(data) {
    return http.post(`${BASE_URL}/api/post/pc/login`, data);
}
export { postLogin }