const { Http } = require('../util/http');
const http = new Http();
import {BASE_URL} from '@/config/config'
function operatordetailSelect(data) {
    return http.post(`api/post/pc/operatordetail-select`, data);
}

function operatordetailUpdate(data) {
    return http.post(`api/post/pc/operatordetail-update`, data);
}

function operatordetailDelete(data) {
    return http.post(`api/post/pc/operatordetail-delete`, data);
}

export { operatordetailSelect,operatordetailUpdate,operatordetailDelete}