const { Http } = require('../util/http');
const http = new Http();
function operatoritemdetail(data) {
    return http.post(`api/post/pc/operatoritemdetail-select`, data);
}

function operatoritemdetaildelete(data) {
    return http.post(`api/post/pc/operatoritemdetail-delete`, data);
}

function operatoritemdetailinsert(data) {
    return http.post(`api/post/pc/operatoritemdetail-insert`, data);
}
export {operatoritemdetail,operatoritemdetaildelete,operatoritemdetailinsert}